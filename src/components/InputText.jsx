import { TextField } from '@mui/material';
import { useField } from 'formik';

export const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...props}
      {...field}
      error={meta.touched && meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};
