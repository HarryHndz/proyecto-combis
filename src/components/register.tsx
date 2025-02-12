import { TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { FormFieldProps } from "../data/interfaces/registerInterface";
import { FormCheckboxProps } from "../data/interfaces/registerInterface";

export const FormField: React.FC<FormFieldProps> = ({
  field,
  formik,
  type = "text",
  selectOptions = [],
  ...props
}) => {
  const { label, name } = field;

  return (
    <TextField
      fullWidth
      label={label}
      margin="normal"
      type={type}
      {...formik.getFieldProps(name)}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={
        formik.touched[name] && typeof formik.errors[name] === "string"
          ? formik.errors[name]
          : undefined
      }
      select={selectOptions.length > 0}
      {...props}
    >
      {selectOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  formik,
  label,
  ...props
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...formik.getFieldProps(field.name)}
          checked={formik.values[field.name]}
          {...props}
        />
      }
      label={label}
    />
  );
};
