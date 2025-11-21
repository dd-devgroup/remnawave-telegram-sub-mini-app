import { ActionIcon, Button, Group, Image, Modal, Stack, Text } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import {
    IconBrandDiscord,
    IconBrandTelegram,
    IconBrandVk,
    IconLink,
    IconMessageChatbot
} from '@tabler/icons-react'
import { renderSVG } from 'uqr'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export const SubscriptionLinkWidget = ({
    subscription,
    supportUrl
}: {
    subscription: string
    supportUrl?: string
}) => {
    const t = useTranslations()
    const clipboard = useClipboard({ timeout: 10000 })
    const subscriptionQrCode = renderSVG(subscription, {
        whiteColor: 'white',
        blackColor: 'dark'
    })

    const [open, setOpen] = useState(false)

    if (!subscription) return null

    const handleCopy = () => {
        notifications.show({
            title: t('subscription-link.widget.link-copied'),
            message: t('subscription-link.widget.link-copied-to-clipboard'),
            color: 'teal'
        })
        clipboard.copy(subscription)
    }

    const renderSupportLink = (supportUrl: string) => {
        const iconConfig = {
            't.me': { icon: IconBrandTelegram, color: '#0088cc' },
            'discord.com': { icon: IconBrandDiscord, color: '#5865F2' },
            'vk.com': { icon: IconBrandVk, color: '#0077FF' }
        }

        const matchedPlatform = Object.entries(iconConfig).find(([domain]) =>
            supportUrl.includes(domain)
        )

        const { icon: Icon, color } = matchedPlatform
            ? matchedPlatform[1]
            : { icon: IconMessageChatbot, color: 'teal' }

        return (
            <ActionIcon
                c={color}
                component="a"
                href={supportUrl}
                rel="noopener noreferrer"
                size="xl"
                target="_blank"
                variant="default"
            >
                <Icon />
            </ActionIcon>
        )
    }

    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={t('subscription-link.widget.get-link')}
                closeOnClickOutside={false}
                overlayProps={{
                    onMouseDown: (e) => e.stopPropagation(),
                    onClick: (e) => {
                        e.stopPropagation()
                        setOpen(false)
                    }
                }}
            >
                {subscriptionQrCode && (
                    <Stack align="center">
                        <Image
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                subscriptionQrCode
                            )}`}
                        />
                        <Text fw={600} size="lg" ta="center">
                            {t('subscription-link.widget.scan-qr-code')}
                        </Text>
                        <Text c="dimmed" size="sm" ta="center">
                            {t('subscription-link.widget.line-1')}
                        </Text>

                        <Button fullWidth onClick={handleCopy} variant="filled">
                            {t('subscription-link.widget.copy-link')}
                        </Button>
                    </Stack>
                )}
            </Modal>
            <Group
                gap="xs"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <ActionIcon
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(true)
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    size="xl"
                    variant="default"
                >
                    <IconLink />
                </ActionIcon>
                {supportUrl && renderSupportLink(supportUrl)}
            </Group>
        </>
    )
}
