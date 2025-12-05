import { Center, Stack, Text } from '@mantine/core'
import catLoading from '@public/assets/anamations/loading.json'
import Lottie from 'lottie-react'
export function Loading({
    height = '100vh',
    text = undefined,
    value = 100
}: {
    height?: string
    text?: string
    value?: number
}) {
    return (
        <Center h={height}>
            <Stack align="center" gap="xs" w="40%">
                {text && <Text size="lg">{text}</Text>}

                <Lottie animationData={catLoading} loop={true} />
            </Stack>
        </Center>
    )
}
