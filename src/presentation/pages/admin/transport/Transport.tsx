import { useEffect, useState } from 'react';
import DataGridVehiculos from '@/presentation/components/datagridCombis';
import AddButton from '@/presentation/components/botonAgregar';
import VehicleFormModal from '@/presentation/components/ModalForm';
import { Box, Typography } from '@mui/material';
import { LocalStoreRepository } from '@/data/repository/localRepository';
import { LocalStoreUseCase } from '@/domain/useCases/localStoreUseCase';
import { IUser } from '@/domain/entities/IAuth';

export default function Transport() {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository());
    const userFromStorage = localRepository.get('user');

    if (userFromStorage && userFromStorage.id) {
      setUser(userFromStorage);
    } else {
      console.warn('No se encontró un usuario válido en localStorage.');
    }
  }, []);

  const isDueno = user?.idTypeUser === 2;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Combis Registradas
      </Typography>

      {isDueno && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <AddButton onClick={() => setOpenModal(true)} />
        </Box>
      )}

      <DataGridVehiculos />

      <VehicleFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => setOpenModal(false)}
        idDueno={user?.id}
      />
    </Box>
  );
}
