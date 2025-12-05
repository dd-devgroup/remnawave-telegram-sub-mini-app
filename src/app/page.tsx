'use client'

import { fetchAppEnv } from '@/api/fetchAppEnv'
import { fetchUserByTelegramId } from '@/api/fetchUserByTgId'
import { ErrorConnection } from '@/components/ErrorConnection/ErrorConnection'
import { InstallationGuideWidget } from '@/components/InstallationGuideWidget/InstallationGuideWidget'
import { Loading } from '@/components/Loading/Loading'
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher'
import { SubscriptionLinkWidget } from '@/components/SubQR/SubQR'
import { SubscribeCta } from '@/components/SubscribeCTA/SubscribeCTA'
import { SubscriptionInfoWidget } from '@/components/SubscriptionInfoWidget/SubscriptionInfoWidget'
import { Center, Container, Group, Stack, Title } from '@mantine/core'
import { initDataRaw as _initDataRaw, initData, useSignal } from '@telegram-apps/sdk-react'
import { consola } from 'consola/browser'
import { useTranslations } from 'next-intl'
import { ofetch } from 'ofetch'
import { useEffect, useState } from 'react'

import { ISubscriptionPageAppConfig, TEnabledLocales } from '@/types/appList'

import { isOldFormat } from '@/utils/migrateConfig'
import { GetSubscriptionInfoByShortUuidCommand } from '@remnawave/backend-contract'
import classes from './app.module.css'

export default function Home() {
    const t = useTranslations()
    const initDataRaw = useSignal(_initDataRaw)

    const initDataState = useSignal(initData.state)
    const telegramId = initDataState?.user?.id
    const [subscription, setSubscription] = useState<
        GetSubscriptionInfoByShortUuidCommand.Response['response'] | null
    >(null)
    const [subscriptionLoaded, setSubscriptionLoaded] = useState(false)
    const [appsConfig, setAppsConfig] = useState<ISubscriptionPageAppConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [publicEnv, setPublicEnv] = useState<{
        cryptoLink: boolean
        buyLink: string
        redirectLink: string
    } | null>(null)

    const [errorConnect, setErrorConnect] = useState<string | null>(null)

    let additionalLocales: TEnabledLocales[] = ['en', 'ru', 'fa', 'zh']

    if (appsConfig && appsConfig.config.additionalLocales !== undefined) {
        additionalLocales = [
            'en',
            ...appsConfig.config.additionalLocales.filter((locale) =>
                ['fa', 'ru', 'zh'].includes(locale)
            )
        ]
    }

    const activeSubscription =
        subscription?.user?.userStatus && subscription?.user?.userStatus === 'ACTIVE'

    useEffect(() => {
        setIsLoading(true)

        const fetchConfig = async () => {
            try {
                const cofingEnv = await fetchAppEnv()
                if (cofingEnv) setPublicEnv(cofingEnv)
            } catch (error) {
                consola.error('Failed to fetch app config:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConfig()
    }, [])

    useEffect(() => {
        if (telegramId && initDataRaw) {
            const fetchSubscription = async () => {
                setIsLoading(true)
                try {
                    const user = await fetchUserByTelegramId(initDataRaw as string)
                    if (user) {
                        setSubscription(user)
                    }
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'Unknown error occurred'
                    if (errorMessage !== 'Users not found') {
                        setErrorConnect('ERR_FATCH_USER')
                    }
                    consola.error('Failed to fetch subscription:', error)
                } finally {
                    setSubscriptionLoaded(true)
                    setIsLoading(false)
                }
            }

            fetchSubscription()
        }
    }, [telegramId, initDataRaw])

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const tempConfig = await ofetch<ISubscriptionPageAppConfig>(
                    `/assets/app-config.json?v=${Date.now()}`,
                    {
                        parseResponse: JSON.parse
                    }
                )

                let newConfig: ISubscriptionPageAppConfig | null = null

                if (isOldFormat(tempConfig)) {
                    consola.warn('Old config format detected, migrating to new format...')
                    newConfig = {
                        config: {
                            additionalLocales: ['ru', 'fa', 'zh']
                        },
                        platforms: {
                            ios: tempConfig.ios,
                            android: tempConfig.android,
                            windows: tempConfig.pc,
                            macos: tempConfig.pc,
                            linux: [],
                            androidTV: [],
                            appleTV: []
                        }
                    }
                } else {
                    newConfig = tempConfig
                }

                setAppsConfig(newConfig)
            } catch (error) {
                setErrorConnect('ERR_PARSE_APPCONFIG')
                consola.error('Failed to fetch app config:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConfig()
    }, [])

    if (errorConnect)
        return (
            <Container className={classes.main} size="xl">
                <Center>
                    <Stack gap="xl">
                        <Title style={{ textAlign: 'center' }} order={4}>
                            {errorConnect === 'ERR_FATCH_USER'
                                ? t('main.page.component.error-connect')
                                : errorConnect === 'ERR_PARSE_APPCONFIG'
                                ? t('main.page.component.error-parse-appconfig')
                                : JSON.stringify(errorConnect)}
                        </Title>
                        <ErrorConnection />
                    </Stack>
                </Center>
            </Container>
        )

    if (isLoading || !appsConfig) return <Loading />

    if (subscriptionLoaded && !subscription)
        return (
            <Container className={classes.main} my="lg" size="xl">
                <Center>
                    <Stack gap="xl">
                        <Title style={{ textAlign: 'center' }} order={4}>
                            {t('main.page.component.no-sub')}
                        </Title>
                        <SubscribeCta buyLink={publicEnv?.buyLink} />
                    </Stack>
                </Center>
            </Container>
        )

    if (subscriptionLoaded && subscription)
        return (
            <Container my="lg" size="xl">
                <Stack gap="xl">
                    <Group justify="space-between">
                        <Group gap="xs">
                            <Title order={4}>
                                {appsConfig.config.branding?.name ||
                                    t('main.page.component.podpiska')}
                            </Title>
                        </Group>
                        <Group gap="xs">
                            {!publicEnv?.cryptoLink && (
                                <SubscriptionLinkWidget
                                    subscription={subscription.subscriptionUrl}
                                    supportUrl={appsConfig.config.branding?.supportUrl}
                                />
                            )}
                        </Group>
                    </Group>
                    <Stack gap="xl">
                        <SubscriptionInfoWidget user={subscription} />
                        {activeSubscription ? (
                            <InstallationGuideWidget
                                user={subscription}
                                appsConfig={appsConfig.platforms}
                                isCryptoLinkEnabled={publicEnv?.cryptoLink}
                                redirectLink={publicEnv?.redirectLink}
                                enabledLocales={additionalLocales}
                            />
                        ) : (
                            <SubscribeCta buyLink={publicEnv?.buyLink} />
                        )}
                    </Stack>
                </Stack>
                <LocaleSwitcher />
            </Container>
        )

    return null
}
