import classes from '@/app/app.module.css'
import { Box, Button, Stack } from '@mantine/core'
import errorConnect from '@public/assets/anamations/error-connect.json'
import Lottie from 'lottie-react'
import { useTranslations } from 'next-intl'

export function ErrorConnection() {
    const t = useTranslations()

    function refreshPage() {
        window.location.reload()
    }

    return (
        <Stack gap="xl">
            <Box className={classes.animateBox} w={200}>
                <Lottie animationData={errorConnect} loop={true} />
            </Box>
            <Button onClick={refreshPage} color="sunset.5">
                {t('main.page.component.refresh')}
            </Button>
        </Stack>
    )
}
