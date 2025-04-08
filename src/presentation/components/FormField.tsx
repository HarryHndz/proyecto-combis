import { TextField, IconButton, InputAdornment } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PropsFormField = TextFieldProps & {
  label: string;
  errorMessage?: string;
  touched?: boolean;
};

export const FormField = ({
  label,
  errorMessage,
  touched,
  type,
  ...props
}: PropsFormField) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  return (
    <TextField
      fullWidth
      label={label}
      margin="normal"
      type={isPassword ? (showPassword ? "text" : "password") : type}
      error={Boolean(errorMessage && touched)}
      helperText={errorMessage && touched ? errorMessage : ""}
      InputProps={
        isPassword
          ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }
          : undefined
      }
      {...props}
    />
  );
};
