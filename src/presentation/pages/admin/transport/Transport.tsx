import { useState } from 'react';
import DataGridVehiculos from '@/presentation/components/datagridCombis';
import AddButton from '@/presentation/components/botonAgregar';
import VehicleFormModal from '@/presentation/components/ModalForm';
import { Box, Typography } from '@mui/material';

export default function Transport() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Combis Registradas
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <AddButton onClick={() => setOpenModal(true)} />
      </Box>

      <DataGridVehiculos />

      <VehicleFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          setOpenModal(false);
        }}
      />
    </Box>
  );
}
