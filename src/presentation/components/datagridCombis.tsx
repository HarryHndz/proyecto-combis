import { Box, Chip, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
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
    setLoadingDelete(true);
    try {
      await deleteVehicle(idVehiculo);
      await fetchVehicles();
      setOpenDialog(false);
      console.log(`Vehículo ${idVehiculo} eliminado`);
    } catch (error) {
      setOpenDialog(false);
      console.error("Error al eliminar el vehículo:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); console.log(`Ver detalles de ${idVehiculo}`); }}>Ver detalles</MenuItem>
        <MenuItem onClick={() => { 
          handleClose(); 
          console.log(`Actualizar ${idVehiculo}`);
          navigate('/transport/update');
        }}>
          Actualizar
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

const columns: GridColDef[] = [
  { field: 'idVehiculo', headerName: 'Id vehículo', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'numero', headerName: 'Número', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'matricula', headerName: 'Matrícula', flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'activo',
    headerName: 'Activo',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Active' : 'Inactive'}
        color={params.value ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <ActionsMenu idVehiculo={params.row.idVehiculo} />,
  },
];

export default function DataGridVehiculos() {
  const { vehicles, loading, error } = useVehiclesData();  

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
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
