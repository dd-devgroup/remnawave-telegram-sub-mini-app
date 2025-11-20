import { InputBase, PasswordInput, Select, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'

export default {
    InputBase: InputBase.extend({
        defaultProps: {
            radius: 'lg'
        },
        styles: {
            input: {
                backgroundColor: '#FFFBF4',
                borderColor: '#D8CFBF',
                color: '#6A5A4A',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                '&:focus-within': {
                    borderColor: 'var(--mantine-color-sunset-5)',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.05)'
                }
            }
        }
    }),
    PasswordInput: PasswordInput.extend({
        defaultProps: {
            radius: 'lg'
        }
    }),
    TextInput: TextInput.extend({
        defaultProps: {
            radius: 'lg'
        }
    }),
    Select: Select.extend({
        defaultProps: {
            radius: 'lg'
        }
    }),
    DateTimePicker: DateTimePicker.extend({
        defaultProps: {
            radius: 'lg'
        }
    })
}
