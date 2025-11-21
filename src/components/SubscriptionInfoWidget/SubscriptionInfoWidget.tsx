import { InfoBlock } from '@/components/InfoBlock/InfoBlock'
import { Accordion, Group, rgba, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import {
    IconAlertCircle,
    IconArrowsUpDown,
    IconCalendar,
    IconCheck,
    IconUser,
    IconX
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useLocale, useTranslations } from 'next-intl'

import { calculateDaysLeft, getExpirationTextUtil } from '@/utils/utils'
import { GetSubscriptionInfoByShortUuidCommand } from '@remnawave/backend-contract'
import { SubscriptionLinkWidget } from '../SubQR/SubQR'

dayjs.extend(relativeTime)

export const SubscriptionInfoWidget = ({
    user,
    subscriptionUrl,
    supportUrl,
    isCryptoLinkEnabled
}: {
    user: GetSubscriptionInfoByShortUuidCommand.Response['response']
    subscriptionUrl: string
    supportUrl?: string
    isCryptoLinkEnabled: boolean
}) => {
    const t = useTranslations()
    const lang = useLocale()

    if (!user) return null

    const daysLeft = calculateDaysLeft(user.user.expiresAt)

    const formatDate = (dateStr: Date | string) => {
        return dayjs(dateStr).format('DD.MM.YYYY')
    }

    const getStatusAndIcon = () => {
        if (user.user.userStatus === 'ACTIVE' && daysLeft > 0) {
            return {
                color: 'teal',
                icon: <IconCheck size={20} />,
                status: t('subscription-info.widget.active')
            }
        }

        if (
            (user.user.userStatus === 'ACTIVE' && daysLeft === 0) ||
            (daysLeft >= 0 && daysLeft <= 3)
        ) {
            return {
                color: 'orange',
                icon: <IconAlertCircle size={20} />,
                status: t('subscription-info.widget.active')
            }
        }

        return {
            color: 'red',
            icon: <IconX size={20} />,
            status: t('subscription-info.widget.inactive')
        }
    }

    return (
        <Accordion
            styles={(theme) => ({
                item: { boxShadow: `0 4px 12px ${rgba(theme.colors.gray[5], 0.1)}` }
            })}
            variant="separated"
        >
            <Accordion.Item value="subscription-info">
                <Accordion.Control
                    icon={
                        <ThemeIcon color={getStatusAndIcon().color} size="lg" variant="light">
                            {getStatusAndIcon().icon}
                        </ThemeIcon>
                    }
                >
                    <Group justify="space-between" align="center" w="100%" pr="xs">
                        <Stack gap={3} style={{ flex: 1 }}>
                            <Text fw={500} size="md" truncate>
                                {user.user.username}
                            </Text>
                            <Text c={daysLeft === 0 ? 'red' : 'dimmed'} size="xs">
                                {getExpirationTextUtil(user.user.expiresAt, t, lang)}
                            </Text>
                        </Stack>

                        {!isCryptoLinkEnabled && (
                            <SubscriptionLinkWidget
                                subscription={subscriptionUrl}
                                supportUrl={supportUrl}
                            />
                        )}
                    </Group>
                </Accordion.Control>

                <Accordion.Panel>
                    <SimpleGrid cols={{ base: 1, sm: 2, xs: 2 }} spacing="xs" verticalSpacing="sm">
                        <InfoBlock
                            color="blue"
                            icon={<IconUser size={20} />}
                            title={t('subscription-info.widget.name')}
                            value={user.user.username}
                        />

                        <InfoBlock
                            color={user.user.userStatus === 'ACTIVE' ? 'green' : 'red'}
                            icon={
                                user.user.userStatus === 'ACTIVE' ? (
                                    <IconCheck size={20} />
                                ) : (
                                    <IconX size={20} />
                                )
                            }
                            title={t('subscription-info.widget.status')}
                            value={
                                user.user.userStatus === 'ACTIVE'
                                    ? t('subscription-info.widget.active')
                                    : t('subscription-info.widget.inactive')
                            }
                        />

                        <InfoBlock
                            color="red"
                            icon={<IconCalendar size={20} />}
                            title={t('subscription-info.widget.expires')}
                            value={(() => {
                                if (!user.user.expiresAt) return '—'
                                const fiftyYears = new Date()
                                fiftyYears.setFullYear(fiftyYears.getFullYear() + 50)
                                const expireDate = new Date(user.user.expiresAt)

                                return expireDate > fiftyYears
                                    ? '∞'
                                    : formatDate(user.user.expiresAt)
                            })()}
                        />

                        <InfoBlock
                            color="yellow"
                            icon={<IconArrowsUpDown size={20} />}
                            title={t('subscription-info.widget.bandwidth')}
                            value={`${user.user.trafficUsed} / ${
                                user.user.trafficLimit === '0' ? '∞' : user.user.trafficLimit
                            }`}
                        />
                    </SimpleGrid>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}
