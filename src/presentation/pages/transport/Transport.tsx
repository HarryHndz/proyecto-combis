import DataGridVehiculos from '@/presentation/components/datagridCombis';
import AddButton from '@/presentation/components/botonAgregar';
import { Box, Typography } from '@mui/material';

export default function Transport() {

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Combis Registradas
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <AddButton />
      </Box>

      <DataGridVehiculos />
    </Box>
  );
}
