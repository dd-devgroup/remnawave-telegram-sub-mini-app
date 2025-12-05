import classes from '@/app/app.module.css'
import { Link } from '@/components/Link/Link'
import { Box, Button, Stack } from '@mantine/core'
import noSubAnimate from '@public/assets/anamations/no-sub.json'
import Lottie from 'lottie-react'
import { useTranslations } from 'next-intl'

export function SubscribeCta({ buyLink }: { buyLink: string | undefined }) {
    const t = useTranslations()

    return (
        <Stack gap="xl">
            <Box className={classes.animateBox} w={200}>
                <Lottie animationData={noSubAnimate} loop={true} />
            </Box>
            {buyLink ? (
                <Button component={Link} href={buyLink} target="_blank" color="sunset.5">
                    {t('main.page.component.buy')}
                </Button>
            ) : (
                <Button disabled color="sunset.5">
                    {t('main.page.component.buy')}
                </Button>
            )}
        </Stack>
    )
}
