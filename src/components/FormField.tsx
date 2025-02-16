import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";

type PropsFormField = TextFieldProps &{
  label:string,
  errorMessage?:string,
  touched?:boolean
}

export const FormField =({label,errorMessage,touched,...props}:PropsFormField) => {
  return (
    <TextField
      fullWidth
      label={label}
      margin="normal"
      {...props}
      error={Boolean(errorMessage && touched)}
      helperText={errorMessage && touched ? errorMessage: ''}
    >
    </TextField>
  );
};


