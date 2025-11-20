import { Card } from '@mantine/core'

import classes from './card.module.css'

export default {
    Card: Card.extend({
        classNames: classes,
        defaultProps: {
            radius: 'xl',
            withBorder: true,
            shadow: 'md',
            padding: 'lg'
        }
    })
}
