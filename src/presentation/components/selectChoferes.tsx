import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    CircularProgress,
    SelectChangeEvent
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { AdminUseCases } from '@/domain/useCases/adminUseCases';
  import { AdminRepository } from '@/data/repository/adminRepository';
  import { IDrivePerson } from '@/domain/entities/IDriver';
  
  interface EditDriverComponentProps {
    selectedDriver: string;
    onDriverChange: (newDriverId: string) => void;
  }
  
  export default function EditDriverComponent({ selectedDriver, onDriverChange }: EditDriverComponentProps) {
    const [drivers, setDrivers] = useState<IDrivePerson[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleDriverChange = (event: SelectChangeEvent<string>) => {
      onDriverChange(event.target.value);
    };
  
    useEffect(() => {
      const fetchDrivers = async () => {
        setLoading(true);
        const useCases = new AdminUseCases(new AdminRepository());
        try {
          const response = await useCases.getChoferes();
          setDrivers(response.data); // Accedemos al arreglo en `data`
        } catch (error) {
          console.error('Error al obtener choferes:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDrivers();
    }, []);
  
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-driver-label">Chofer</InputLabel>
          <Select
            labelId="select-driver-label"
            id="select-driver"
            value={selectedDriver}
            onChange={handleDriverChange}
            label="Chofer"
          >
            {drivers.map((driver) => {
              const persona = driver.usuarios.personas;
              const fullName = `${persona.nombre} ${persona.apellido_pat} ${persona.apellido_mat}`;
              return (
                <MenuItem key={driver.usuarios.id_usuario} value={String(driver.usuarios.id_usuario)}>
                  {fullName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
  