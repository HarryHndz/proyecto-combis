import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IValues } from '@/domain/entities/IValues';


interface PropsInputSelect{
  value:string
  data:IValues[]
  label:string
  handleChange:(event:SelectChangeEvent)=>void
}

export const InputSelect=({value,handleChange,label,data}:PropsInputSelect)=> {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {data.map((item)=>(
            <MenuItem 
              value={item.value} 
              key={item.value}
            >
                {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
