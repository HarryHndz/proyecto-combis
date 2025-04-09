import {
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehiclesData } from '@/presentation/hooks/useVehiclesData';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ActionsMenu = ({ idVehiculo }: { idVehiculo: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();
  const { deleteVehicle, fetchVehicles } = useVehiclesData();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (loadingDelete) return; // Previene doble clic o doble ejecución
  
    setLoadingDelete(true);
    try {
      await deleteVehicle(idVehiculo);
      await fetchVehicles();
      console.log(`Vehículo ${idVehiculo} eliminado`);
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    } finally {
      setOpenDialog(false); // mover aquí por si hay error también
      setLoadingDelete(false);
    }
  };
  

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => {
          handleClose();
          console.log(`Ver detalles de ${idVehiculo}`);
          navigate(`/admin/transport/details/${idVehiculo}`);
        }}>
          Ver detalles
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          setOpenDialog(true);
        }}>
          Dar de baja
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Estás seguro de eliminar este vehículo?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Esta acción es irreversible. ¿Estás seguro de que deseas eliminar este vehículo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" disabled={loadingDelete}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={loadingDelete}>
            {loadingDelete ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DataGridVehiculos() {
  const { vehicles, loading, error, updateVehicle } = useVehiclesData();

  const handleRowUpdate = async (newRow: any, oldRow: any) => {
    try {
      if (
        newRow.numero !== oldRow.numero ||
        newRow.matricula !== oldRow.matricula
      ) {
        const updatedVehicle = {
          ...newRow,
          id_vehiculos: newRow.id_vehiculos,
        };

        console.log("🧾 Datos a enviar al backend:", updatedVehicle);
        await updateVehicle(newRow.id_vehiculos, updatedVehicle);
        console.log("🚀 Vehículo actualizado desde el grid.");
      }

      return newRow;
    } catch (error) {
      console.error("❌ Error actualizando desde el grid:", error);
      return oldRow;
    }
  };

  const columns: GridColDef[] = [
    { field: 'id_vehiculos', headerName: 'Id vehículo', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'numero', headerName: 'Número', flex: 1, headerAlign: 'center', align: 'center', editable: true },
    { field: 'matricula', headerName: 'Matrícula', flex: 1, headerAlign: 'center', align: 'center', editable: true },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <ActionsMenu idVehiculo={params.row.id_vehiculos.toString()} />,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '90%', maxWidth: 1100 }}>
        <DataGrid
          rows={vehicles}
          columns={columns}
          getRowId={(row) => row.id_vehiculos}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={handleRowUpdate}
          experimentalFeatures={{}}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
