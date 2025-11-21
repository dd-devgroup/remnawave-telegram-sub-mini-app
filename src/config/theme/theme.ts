import { createTheme } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily: '"Inter", "SF Pro Rounded", sans-serif',
    fontFamilyMonospace: '"Noto Sans Mono", monospace',
    breakpoints: {
        xs: '23em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'auto',
    white: '#FFFFFF',
    black: '#2F261F',
    colors: {
        sand: [
            '#FFFBF4',
            '#FFF6E7',
            '#FDEFD7',
            '#F7E4C4',
            '#EAD5B2',
            '#D8C3A1',
            '#C1AC8B',
            '#9D8B6F',
            '#7B6C56',
            '#5A4F40'
        ],
        sunset: [
            '#FFF3E4',
            '#FFE2C4',
            '#FFD29E',
            '#FFC174',
            '#FFB65A',
            '#F7A548',
            '#EE9538',
            '#E1852B',
            '#D17523',
            '#B55E16'
        ],
        coral: [
            '#FFEBDD',
            '#FFD6BA',
            '#FFC49C',
            '#F9AF77',
            '#F28A3C',
            '#DD7631',
            '#C6622A',
            '#A54C21',
            '#843B1B',
            '#632C14'
        ],
        teal: [
            '#E4F9FB',
            '#C7EEF3',
            '#A2DFE6',
            '#7ED2DA',
            '#58C5CF',
            '#41B7C4',
            '#35AAB8',
            '#2C96A4',
            '#237B87',
            '#1B626B'
        ],
        sky: [
            '#EFF9FF',
            '#DBF2FF',
            '#C6E7FB',
            '#B1DBF5',
            '#99CEEE',
            '#8ED4F2',
            '#7CC3E1',
            '#6CAECC',
            '#5E99B5',
            '#4E8199'
        ],
        meadow: [
            '#E7FBF3',
            '#C3F5E0',
            '#9EEECB',
            '#77E2B3',
            '#4FD89D',
            '#34C38F',
            '#2BAA7C',
            '#249169',
            '#1D7758',
            '#165F47'
        ],
        warning: [
            '#FFF4E6',
            '#FFE3C7',
            '#FFD2A8',
            '#FFC187',
            '#FFB16B',
            '#FF9E5E',
            '#F08948',
            '#D87038',
            '#B9572D',
            '#8F4022'
        ],
        muted: [
            '#F5F2ED',
            '#E9E4DC',
            '#DDD7CD',
            '#D1C9BC',
            '#C4BCAD',
            '#B5B1AA',
            '#9C958F',
            '#7D776F',
            '#5F5953',
            '#413D38'
        ],
        dark: [
            '#f3ede6',
            '#d4c9bd',
            '#b7a594',
            '#99836c',
            '#7d644d',
            '#634d3c',
            '#4a392d',
            '#35261f',
            '#221712',
            '#110908'
        ]
    },
    primaryShade: { light: 5, dark: 5 },
    primaryColor: 'sunset',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontWeight: '600',
        sizes: {
            h1: { fontSize: '32px', lineHeight: '1.2', fontWeight: '600' },
            h2: { fontSize: '22px', lineHeight: '1.3', fontWeight: '600' },
            h3: { fontSize: '20px', lineHeight: '1.35', fontWeight: '600' },
            h4: { fontSize: '18px', lineHeight: '1.4', fontWeight: '600' },
            h5: { fontSize: '16px', lineHeight: '1.4', fontWeight: '600' },
            h6: { fontSize: '15px', lineHeight: '1.45', fontWeight: '600' }
        }
    },
    defaultRadius: 'xl',
    radius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px'
    },
    shadows: {
        xs: '0 4px 12px rgba(0, 0, 0, 0.04)',
        sm: '0 10px 24px rgba(0, 0, 0, 0.05)',
        md: '0 18px 40px rgba(0, 0, 0, 0.06)',
        lg: '0 22px 50px rgba(0, 0, 0, 0.08)',
        xl: '0 30px 70px rgba(0, 0, 0, 0.1)'
    }
})
