import { Checkbox, FormControlLabel } from "@mui/material";

interface PropsChecbox{
  checked:boolean
  label:string
  handleChange:()=>void
}


export const FormCheckbox =({checked,label,handleChange}:PropsChecbox) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
        />
      }
      label={label}
    />
  );
};