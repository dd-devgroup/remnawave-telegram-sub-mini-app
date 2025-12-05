import { IAppConfig, ILocalizedText, TEnabledLocales, TPlatform } from '@/types/appList'
import { IPlatformGuideProps } from '@/types/platforGuide'
import { Accordion, Box, Button, Group, Text, ThemeIcon, Timeline, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import noDataAnimate from '@public/assets/anamations/error-connect.json'
import {
    IconCheck,
    IconCloudDownload,
    IconDownload,
    IconInfoCircle,
    IconStar
} from '@tabler/icons-react'
import Lottie from 'lottie-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export interface IBaseGuideProps extends IPlatformGuideProps {
    firstStepTitle: string
    platform: TPlatform
    renderFirstStepButton: (app: IAppConfig) => React.ReactNode
    currentLang: TEnabledLocales
    isCryptoLinkEnabled: boolean | undefined
}

const appIcons: Record<string, string> = {
    'prizrak-box': `<svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none"><g transform="scale(0.03795966785) translate(0, 26.5)"><mask id="prizrak-box-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="843" height="790"><rect width="843" height="790" fill="black"/><path d="M224.342 243.573C313.665 175.169 293.695 10.186 433.003 0.532249C612.115 -11.8799 575.328 195.882 674.834 301.445C718.106 347.351 785.799 285.135 839.471 378.656C824.796 367.987 787.125 356.297 753.835 394.893C743.221 363.051 720.063 390.471 712.826 402.13C695.234 430.474 689.066 474.016 704.987 496.209C689.307 528.172 654.057 521.538 645.886 514.301C624.779 495.606 623.572 405.146 618.145 374.389C617.542 424.243 605.239 527.93 560.853 543.851C505.371 563.753 478.233 553.5 469.79 583.051C463.035 606.691 480.645 621.446 490.294 625.869C482.856 642.353 458.09 673.994 418.529 668.687C369.077 662.053 343.749 628.281 334.099 621.647C324.45 615.013 302.74 611.395 282.839 618.029C266.129 623.599 237.384 642.755 240.021 668.687C241.983 687.985 270.777 689.794 247.258 700.046C213.341 714.83 191.775 687.382 194.188 674.114C182.729 677.13 146.545 672.908 160.416 635.518C167.222 617.17 180.317 602.952 173.08 587.272C163.309 566.101 137.105 575.411 120.613 558.928C227.959 547.47 253.288 458.261 253.288 458.261C253.288 458.261 232.387 489 211.387 499.5C234.906 475.377 237.005 387.657 191.775 390.069C183.332 393.687 180.317 399.718 178.508 414.192C135.69 410.573 152.054 363.534 133.278 341.823C113.979 319.51 39.8019 289.959 22.916 333.426C33.7713 256.791 146.407 303.257 224.342 243.573Z" fill="white"/><ellipse cx="385.386" cy="163" rx="41.5" ry="74" transform="rotate(7.04122 385.386 163)" fill="black"/><ellipse cx="41.5" cy="74" rx="41.5" ry="74" transform="matrix(-0.992458 0.122583 0.122583 0.992458 531.261 84.4707)" fill="black"/><ellipse cx="442.387" cy="301" rx="30.5" ry="54" fill="black"/></mask><path fill="currentColor" mask="url(#prizrak-box-mask)" d="M224.343 243.573C313.665 175.169 293.695 10.186 433.003 0.532249C612.116 -11.8799 575.329 195.882 674.835 301.445C718.107 347.351 785.8 285.135 839.472 378.656C852.359 401.111 823.645 415.856 814.746 440.169C809.012 455.836 817.402 478.294 800.875 480.575C788.451 482.289 786.834 461.38 774.34 462.483C757.554 463.965 760.056 484.991 755.042 501.079C749.948 517.424 760.662 531.956 749.011 544.5C739.077 555.196 727.137 550.937 713.43 555.958C695.398 562.564 687.326 576.991 668.2 575.257C621.764 586.112 645.888 515.507 621.764 532.439C604.196 538.984 606.4 557.616 600.053 575.257C591.467 599.121 596.639 615.129 588.595 639.182C582.246 658.167 582.231 672.764 566.885 685.618C547.734 701.658 526.433 684.617 503.562 694.664C482.816 703.778 478.712 721.691 457.729 730.245C435.595 739.269 420.225 731.427 396.819 736.276C368.475 742.147 375.109 789.903 292.488 789.903C202.028 789.903 226.321 728.035 180.318 715.169C142.308 704.538 96.0968 726.905 61.513 707.886C21.7105 678.939 42.493 646.976 33.7718 635.518C30.0998 630.693 25.3289 626.472 0 622.853C13.8706 607.174 42.7016 604.579 58.4977 614.41C77.6564 626.334 62.9004 650.499 79.6051 665.671C106.088 689.725 140.674 675.972 167.05 651.801C188.592 632.06 200.585 611.627 186.348 586.112C174.987 565.75 137.106 575.411 120.614 558.928C227.96 547.47 253.289 458.261 253.289 458.261C253.289 458.261 212.851 517.223 186.348 501.079C168.268 490.066 182.425 464.974 167.05 450.421C140.616 425.4 97.7193 486.021 74.1774 458.261C54.0235 434.497 92.8672 406.853 79.6051 378.656C67.551 353.028 22.9166 359.915 22.9166 333.426C33.7718 256.791 146.408 303.256 224.343 243.573Z"/></g></svg>`,
    v2raytun: `<svg width="24" height="24" viewBox="0 0 48 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="m7.878.57.052.341c.038.202.089.698.127 1.132.038.418.128 1.302.192 1.937.063.636.216 2.061.33 3.177.103 1.1.255 2.542.319 3.178.064.635.205 2.061.32 3.177.114 1.1.254 2.495.318 3.1.063.588.178 1.673.242 2.402.076.728.191 1.798.255 2.402.076.589.14 1.178.14 1.286 0 .542.445 0 .79-.977.203-.604.548-1.503.739-2.014.803-2.092 1.402-3.673 1.402-3.735.002-.035.268-.731.586-1.566.573-1.518.65-1.704 1.236-3.3.179-.466.523-1.38.765-2.015.242-.636.574-1.52.726-1.938.6-1.596 1.058-2.82 1.402-3.72l.714-1.906.369-.96h3.926c2.163 0 3.908.046 3.886.123-.012.062-.739 1.83-1.58 3.907-.854 2.092-3.594 8.818-6.104 14.955a3112.03 3112.03 0 0 1-4.843 11.856l-.306.697-4.779.047c-4.459.031-4.779.016-4.843-.232-.038-.155-.139-.776-.216-1.364-.254-2.03-.357-2.79-.561-4.34-.115-.852-.267-1.937-.318-2.402-.128-.96-.459-3.394-.637-4.572-.179-1.24-.65-4.804-.88-6.664a139.425 139.425 0 0 0-.522-3.72C1.06 8.428.92 7.36.806 6.46a75.91 75.91 0 0 0-.318-2.402C.424 3.624.309 2.788.22 2.198.144 1.594.054.988.016.834-.034.586.207.57 3.916.57h3.962ZM37.254.26c1.81-.263 5.008.063 6.117.62 2.6 1.287 3.95 2.96 4.472 5.58.344 1.72.153 3.688-.535 5.548-.166.45-.306.853-.306.9 0 .046-.306.62-.663 1.27-1.287 2.262-3.288 4.448-7.71 8.462-1.49 1.363-2.713 2.526-2.713 2.588.005.078 2.27.14 5.033.14 3.937 0 5.034.046 5.034.186 0 .217-.306 2.573-.522 3.999a47.238 47.238 0 0 0-.192 1.58c-.05.403-.153.806-.242.9-.106.108-3.407.139-9.953.123l-9.8-.047.038-.542c.038-.635.345-3.084.562-4.464l.152-.992 1.415-1.27c.765-.698 2.421-2.17 3.683-3.285 7.353-6.479 7.162-6.293 8.245-7.595 1.096-1.302 1.554-2.402 1.618-3.874.038-.884 0-1.225-.216-1.736-.663-1.581-2.448-2.186-4.155-1.41-1.16.526-1.873 1.596-2.408 3.58-.064.263-.332.279-3.263.279-3.568 0-3.428.046-3.186-1.1C28.83 4.522 32.462.911 37.254.26Z"/> </svg>`,
    happ: `<svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor"><path d="M13.4,19.6l-7.9,7.9L5,30.4h6.6L13.4,19.6z" /><path d="M13.2,13.5L14.6,5l-7.9,7.9L4.2,27.4l7.9-7.9l0.2-1.2h1l4.9-4.9H13.2z" /><path d="M25.4,19.6L27.8,5l-7.9,7.9l-0.1,0.7h-0.6l-4.9,4.9h4.7l-1.5,9L25.4,19.6z" /><path d="M18.7,27.5l-0.5,2.9h6.6l1.8-10.8L18.7,27.5z" /><path d="M13.6,4.9l0.6-3.3H7.5L5.6,12.8L13.6,4.9z" /><path d="M18.8,12.8l7.9-7.9l0.6-3.3h-6.6L18.8,12.8z" /></svg>`,
    flowvy: `<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H12V12H4V4Z" fill="currentColor"/><path d="M12 4H20V12H12V4Z" fill="currentColor"/><path d="M4 12H12V20H4V12Z" fill="currentColor"/><path d="M4 20H12V28H4V20Z" fill="currentColor"/><path d="M20 4H28V12H20V4Z" fill="currentColor"/><path d="M12 12H20V20H12V12Z" fill="currentColor"/><path d="M20 20H28V28H20V20Z" fill="currentColor"/></svg>`,
    flclashx: `<svg width="24" height="24" viewBox="0 0 32 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M27.8574 0.0380332C28.0611 0.00990742 28.4103 -0.00412593 28.6285 0.016968C31.2255 0.227929 32.906 2.61884 32.1348 5.00973C32.0548 5.24181 31.6838 5.95202 31.3055 6.58488C30.9272 7.21777 29.7706 9.14455 28.7376 10.8674C27.7046 12.5902 26.0606 15.3398 25.0785 16.9853C24.1037 18.6307 23.2745 20.0019 23.2453 20.0442C23.2162 20.0794 22.5542 21.1904 21.7758 22.5054C19.979 25.5362 15.5124 33.0324 10.893 40.7535C9.96186 42.3217 8.81245 44.2484 8.34687 45.0431C7.19022 47.005 6.66645 47.5042 5.34977 47.884C4.826 48.0387 3.77117 48.0387 3.24012 47.884C1.13776 47.2792 -0.0625635 45.2751 0.446659 43.2147C0.570327 42.6873 0.68675 42.4764 2.36717 39.6987C3.05825 38.5595 4.1349 36.7523 4.76779 35.6834C5.40068 34.6075 6.32456 33.0605 6.82651 32.2377C7.32117 31.408 8.12135 30.0649 8.60875 29.2562C9.08887 28.4405 9.89637 27.0832 10.4056 26.2324C10.9148 25.3815 12.2243 23.1804 13.3155 21.3451C14.4067 19.5097 15.5197 17.6392 15.7888 17.1962C16.058 16.7532 16.7127 15.6562 17.2438 14.7702C17.7748 13.8771 18.5022 12.6605 18.8587 12.0628C20.8228 8.77886 22.8379 5.41055 23.4853 4.32761C25.0858 1.62731 25.1876 1.47961 25.6459 1.06472C26.2715 0.509198 27.0208 0.157576 27.8574 0.0380332Z"/> <path d="M21.303 25.8597C21.4703 25.6909 21.7686 25.6558 21.9504 25.7894C22.0742 25.888 22.8091 27.1048 27.2973 34.6708C28.243 36.253 29.6688 38.6439 30.469 39.98C31.2764 41.3161 32.0112 42.5959 32.1131 42.828C32.244 43.1374 32.2949 43.4257 32.324 43.9179C32.3822 45.1556 32.0257 46.0557 31.1382 46.9065C30.338 47.68 29.5378 47.9965 28.4103 47.9965C27.2972 47.9965 26.3588 47.6308 25.6168 46.9136C25.2458 46.5549 24.9548 46.1119 23.7545 44.0937C22.4451 41.8786 18.4804 35.2545 17.542 33.7215C17.3165 33.3558 17.1346 32.9761 17.1346 32.8847C17.1346 32.7933 17.6802 31.8087 18.3422 30.7047C19.0115 29.6007 19.9135 28.0889 20.3573 27.3575C20.801 26.6192 21.2229 25.9511 21.303 25.8597Z" /> <path d="M3.62566 0.0380332C3.83662 0.00287426 4.21488 -0.011181 4.47677 0.00991195C6.06263 0.129456 7.06658 0.790469 7.99772 2.33048C8.92887 3.87753 11.1913 7.66077 11.6277 8.40617C11.8678 8.81402 12.5298 9.91807 13.0972 10.8674C15.2068 14.3623 15.6069 15.0444 15.6069 15.1499C15.6068 15.2133 15.2723 15.818 14.8722 16.493C14.4649 17.1681 13.5482 18.7222 12.8281 19.9387C12.1079 21.1552 11.4531 22.2101 11.3731 22.2733C11.1767 22.4421 10.9367 22.428 10.7548 22.2382C10.6748 22.1538 10.0419 21.1341 9.35079 19.9738C6.4264 15.0444 1.67608 7.09819 1.27598 6.47234C0.570344 5.36129 0.330241 4.68621 0.330241 3.80721C0.330248 1.98592 1.74882 0.361506 3.62566 0.0380332Z"/> </svg>`,
    v2rayng: `<svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor"><path d="M0 1.86298V3.72596H1.87780H3.75560L3.80567 17.3630L3.88078 31L18.4024 15.6987C26.3893 7.30288 32.9741 0.322916 32.9992 0.198717C33.0492 0.0993585 30.8460 -4.76837e-07 28.1169 -4.76837e-07H23.1595L16.2742 6.38381L9.38899 12.7428L9.26380 6.43349L9.13862 0.124198L4.58183 0.049679L0 -4.76837e-07V1.86298Z"/></svg>`,
    'clash-verge': `<svg width="24" height="24" viewBox="0 0 22 22" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.007 22C6.01025 22 0.413848 19.6085 0.0141045 14.2017C-0.0891418 12.8053 0.393020 11.8257 0.853709 10.8897C0.907577 10.7802 0.961152 10.6714 1.01346 10.5625C0.347223 7.78979 -0.385635 1.82844 2.01282 0.164802C3.51185 -0.874970 7.00960 3.28412 8.00897 4.84377C9.00832 4.32389 10.5074 4.32389 11.0070 4.32389C12.0064 4.32389 12.5061 4.32389 14.0051 4.84377C15.1710 3.11082 18.0026 -0.251107 20.0013 0.164802C22.0654 0.594314 21.4010 6.70141 21.1077 9.39799C21.0459 9.96537 21.0006 10.3818 21.0006 10.5625C21.0864 10.7409 21.1721 10.9040 21.2553 11.0623C21.6571 11.8266 22.0000 12.4790 22.0000 14.2017C22.0000 16.2813 19.0019 22.0000 11.0070 22.0000ZM8.86995 16.1663C8.39444 16.9904 6.84049 16.9834 5.39910 16.1507C3.95771 15.3180 3.17471 13.9749 3.65022 13.1507C4.12573 12.3266 5.67969 12.3336 7.12107 13.1663C8.56246 13.9990 9.34546 15.3421 8.86995 16.1663ZM18.0871 13.1507C18.5626 13.9749 17.7796 15.3180 16.3382 16.1507C14.8968 16.9834 13.3429 16.9904 12.8674 16.1663C12.3919 15.3421 13.1749 13.9990 14.6163 13.1663C16.0576 12.3336 17.6116 12.3266 18.0871 13.1507ZM11.0070 19.1585C10.0077 19.1585 8.14148 17.6696 9.50800 17.6585H12.5061C14.0051 17.6585 12.0064 19.1585 11.0070 19.1585Z"/></svg>`,
    'koala-clash': `<svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="none"><mask id="koala-clash-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" fill="white"/><path d="M9.554 9.854A9.26 9.26 0 0 0 8.6 9.8C5.507 9.8 3 11.293 3 15.026c0 2.154.838 3.808 2.138 4.824c.473-3.797 2.005-7.416 4.416-9.996zM27.4 9.8c-.317 0-.637.021-.955.054c2.412 2.58 3.943 6.199 4.416 9.997C32.162 18.834 33 17.181 33 15.026c0-3.733-2.507-5.226-5.6-5.226z" fill="black"/><path d="M21.728 24.807C21.728 28.152 20 29 18 29s-3.727-.848-3.727-4.193c0-3.345 1.727-6.057 3.727-6.057s3.728 2.712 3.728 6.057z" fill="black"/><circle cx="12.5" cy="19.875" r="1.5" fill="black"/><circle cx="23.5" cy="19.875" r="1.5" fill="black"/></mask><path fill="currentColor" mask="url(#koala-clash-mask)" d="M36 13.533C36 8.867 32.866 7 29 7c-1.621 0-3.285.354-4.676 1.027C22.523 6.798 20.405 6.062 18 6.062s-4.523.736-6.324 1.965C10.285 7.354 8.621 7 7 7c-3.866 0-7 1.867-7 6.533c0 3.844 2.128 6.417 5.038 7.206a20.141 20.141 0 0 0-.068 1.611c0 5.729 4.52 7.675 8.581 8.326C14.649 31.487 16.232 32 18 32s3.351-.513 4.449-1.323c4.062-.651 8.581-2.597 8.581-8.326c0-.538-.025-1.075-.068-1.611c2.91-.79 5.038-3.363 5.038-7.207z" /></svg>`
}

export const BaseInstallationGuideWidget = (props: IBaseGuideProps) => {
    const t = useTranslations()
    const {
        openDeepLink,
        getAppsForPlatform,
        firstStepTitle,
        renderFirstStepButton,
        isCryptoLinkEnabled,
        platform,
        currentLang
    } = props

    const platformApps = getAppsForPlatform(platform)
    const otherApps = platformApps.filter((app) => !app.isFeatured)
    const [activeTabId, setActiveTabId] = useState<string>('')

    useEffect(() => {
        if (platformApps?.length > 0) {
            setActiveTabId(platformApps[0].id)
        }
    }, [platform, platformApps])

    const handleTabChange = (appId: string) => {
        setActiveTabId(appId)
    }

    const selectedApp =
        (activeTabId && platformApps.find((app) => app.id === activeTabId)) ||
        (platformApps.length > 0 ? platformApps[0] : null)

    const formattedTitle = selectedApp
        ? firstStepTitle.replace(/{appName}/g, selectedApp.name)
        : firstStepTitle

    const getAppDescription = (
        app: IAppConfig | null,
        step: 'addSubscriptionStep' | 'connectAndUseStep' | 'installationStep'
    ) => {
        if (!app) return ''

        const stepData = app[step]
        if (!stepData) return ''

        return stepData.description[currentLang] || ''
    }

    const getButtonText = (button: { buttonText: ILocalizedText }) => {
        return button.buttonText[currentLang] || ''
    }

    const getStepTitle = (stepData: { title?: ILocalizedText }, defaultTitle: string) => {
        if (!stepData || !stepData.title) return defaultTitle

        return stepData.title[currentLang] || defaultTitle
    }

    const isSmallScreen = useMediaQuery('(max-width: 48em)')

    return (
        <Box>
            {platformApps?.length > 0 && (
                <Group
                    gap="xs"
                    mb="lg"
                    style={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
                        alignItems: isSmallScreen ? 'stretch' : 'center'
                    }}
                >
                    {platformApps
                        .filter((app) => app.isFeatured)
                        .map((app: IAppConfig) => {
                            const isActive = app.id === activeTabId
                            return (
                                <Button
                                    key={app.id}
                                    color="dark"
                                    leftSection={
                                        appIcons[app.id] ? (
                                            <Box
                                                component="span"
                                                dangerouslySetInnerHTML={{
                                                    __html: appIcons[app.id]
                                                }}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            />
                                        ) : (
                                            <ThemeIcon variant="transparent" c="gold">
                                                {' '}
                                                <IconStar size={rem(24)} />
                                            </ThemeIcon>
                                        )
                                    }
                                    onClick={() => handleTabChange(app.id)}
                                    style={{
                                        padding: '8px 12px',
                                        height: 'auto',
                                        lineHeight: 1.5,
                                        minWidth: 0,
                                        flex: '1 0 auto',
                                        width: isSmallScreen ? '100%' : 'auto'
                                    }}
                                    variant={isActive ? 'light' : 'outline'}
                                >
                                    {app.name}
                                </Button>
                            )
                        })}
                    {otherApps.length > 0 && (
                        <Accordion
                            variant="separated"
                            multiple={false}
                            style={{
                                flex: '1 0 auto',
                                width: isSmallScreen ? '100%' : 'auto'
                            }}
                            styles={{
                                item: {
                                    border: '1px solid #e9ecef',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                                    overflow: 'hidden'
                                }
                            }}
                        >
                            <Accordion.Item value="other-apps">
                                <Accordion.Control>
                                    {t('installation-guide.widget.other-apps')}
                                </Accordion.Control>

                                <Accordion.Panel>
                                    <Group
                                        gap="xs"
                                        mt="xs"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {otherApps.map((app: IAppConfig) => {
                                            const isActive = app.id === activeTabId
                                            return (
                                                <Button
                                                    key={app.id}
                                                    leftSection={
                                                        appIcons[app.id] ? (
                                                            <Box
                                                                component="span"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: appIcons[app.id]
                                                                }}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}
                                                            />
                                                        ) : (
                                                            <IconStar size={rem(24)} />
                                                        )
                                                    }
                                                    onClick={() => handleTabChange(app.id)}
                                                    variant={isActive ? 'light' : 'outline'}
                                                    color="dark"
                                                    style={{
                                                        padding: '8px 12px',
                                                        height: 'auto',
                                                        lineHeight: 1.5,
                                                        minWidth: 0,
                                                        flex: '1 0 auto',
                                                        width: isSmallScreen ? '100%' : 'auto'
                                                    }}
                                                >
                                                    {app.name}
                                                </Button>
                                            )
                                        })}
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    )}
                </Group>
            )}

            {platformApps?.length > 0 ? (
                <Timeline active={1} bulletSize={32} color="sunset" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="sunset.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={formattedTitle}
                    >
                        <Text c="dimmed" mb={16} size="sm" style={{ whiteSpace: 'pre-line' }}>
                            {selectedApp ? getAppDescription(selectedApp, 'installationStep') : ''}
                        </Text>
                        {selectedApp && renderFirstStepButton(selectedApp)}
                    </Timeline.Item>

                    {selectedApp && selectedApp.additionalBeforeAddSubscriptionStep && (
                        <Timeline.Item
                            bullet={
                                <ThemeIcon color="sunset.5" radius="xl" size={26}>
                                    <IconInfoCircle size={20} />
                                </ThemeIcon>
                            }
                            title={getStepTitle(
                                selectedApp.additionalBeforeAddSubscriptionStep,
                                'Additional step title is not set'
                            )}
                        >
                            <Text c="dimmed" mb={16} size="sm" style={{ whiteSpace: 'pre-line' }}>
                                {selectedApp.additionalBeforeAddSubscriptionStep.description[
                                    currentLang
                                ] || selectedApp.additionalBeforeAddSubscriptionStep.description.en}
                            </Text>
                            <Group>
                                {selectedApp.additionalBeforeAddSubscriptionStep.buttons.map(
                                    (button, index) => (
                                        <Button
                                            component="a"
                                            href={button.buttonLink}
                                            key={index}
                                            target="_blank"
                                            color="sunset"
                                        >
                                            {getButtonText(button)}
                                        </Button>
                                    )
                                )}
                            </Group>
                        </Timeline.Item>
                    )}

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="sunset.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm" style={{ whiteSpace: 'pre-line' }}>
                            {selectedApp
                                ? getAppDescription(selectedApp, 'addSubscriptionStep')
                                : 'Add subscription description is not set'}
                        </Text>
                        {selectedApp && (
                            <Button
                                onClick={() =>
                                    openDeepLink(
                                        selectedApp.urlScheme,
                                        selectedApp.isNeedBase64Encoding
                                    )
                                }
                                variant="filled"
                            >
                                {t('installation-guide.widget.add-subscription-button')}
                            </Button>
                        )}
                    </Timeline.Item>

                    {selectedApp && selectedApp.additionalAfterAddSubscriptionStep && (
                        <Timeline.Item
                            bullet={
                                <ThemeIcon color="sunset.5" radius="xl" size={26}>
                                    <IconStar size={16} />
                                </ThemeIcon>
                            }
                            title={getStepTitle(
                                selectedApp.additionalAfterAddSubscriptionStep,
                                'Additional step title is not set'
                            )}
                        >
                            <Text c="dimmed" mb={16} size="sm" style={{ whiteSpace: 'pre-line' }}>
                                {selectedApp.additionalAfterAddSubscriptionStep.description[
                                    currentLang
                                ] || selectedApp.additionalAfterAddSubscriptionStep.description.en}
                            </Text>
                            <Group>
                                {selectedApp.additionalAfterAddSubscriptionStep.buttons.map(
                                    (button, index) => (
                                        <Button
                                            component="a"
                                            href={button.buttonLink}
                                            key={index}
                                            target="_blank"
                                            variant="light"
                                        >
                                            {getButtonText(button)}
                                        </Button>
                                    )
                                )}
                            </Group>
                        </Timeline.Item>
                    )}

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="sunset.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm" style={{ whiteSpace: 'pre-line' }}>
                            {selectedApp
                                ? getAppDescription(selectedApp, 'connectAndUseStep')
                                : 'Connect and use description is not set'}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            ) : (
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '40px'
                    }}
                >
                    <div>
                        <Text ta="center" fw="700" className="mb-3">
                            {t(
                                isCryptoLinkEnabled
                                    ? 'installation-guide.widget.no-data-for-cryptolink'
                                    : 'installation-guide.widget.no-data-for-app'
                            )}{' '}
                        </Text>
                        <Lottie animationData={noDataAnimate} loop={true} />
                    </div>
                </Box>
            )}
        </Box>
    )
}
