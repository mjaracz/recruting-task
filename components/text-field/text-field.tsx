import { FC } from 'react';
import { TextFieldProps, default as MaterialTextField } from '@mui/material/TextField';
import styles from './text-field.module.css';

export const TextField: FC<TextFieldProps> = (props) => {
  return <MaterialTextField {...props} className={styles.TextField} />
}