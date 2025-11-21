import { ActionIcon, Button } from '@mantine/core'

export default {
    ActionIcon: ActionIcon.extend({
        defaultProps: {
            radius: 'xl',
            variant: 'light',
            color: 'sunset',
            size: 'lg'
        }
    }),
    Button: Button.extend({
        defaultProps: {
            radius: 'xs',
            variant: 'filled',
            color: 'sunset',
            size: 'md',
            fw: 600
        },
        styles: {
            root: {
                border: '1px solid #EAD5B2',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.06)',
                paddingInline: '1.4rem',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08)'
                }
            }
        }
    })
}
