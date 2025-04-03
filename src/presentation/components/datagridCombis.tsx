import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionsMenu = ({ idVehiculo }: { idVehiculo: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate(); 

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={() => { handleClose(); console.log(`Dar de baja ${idVehiculo}`); }}>Dar de baja</MenuItem>
      </Menu>
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

const rows = [
  { id: 1, idVehiculo: 'V001', numero: '12345', matricula: 'ABC-123', activo: true },
  { id: 2, idVehiculo: 'V002', numero: '67890', matricula: 'XYZ-789', activo: true },
  { id: 3, idVehiculo: 'V003', numero: '54321', matricula: 'LMN-456', activo: false },
  { id: 4, idVehiculo: 'V004', numero: '98765', matricula: 'QRS-111', activo: true },
  { id: 5, idVehiculo: 'V005', numero: '13579', matricula: 'TUV-222', activo: false },
  { id: 6, idVehiculo: 'V006', numero: '24680', matricula: 'WXY-333', activo: true },
  { id: 7, idVehiculo: 'V007', numero: '11223', matricula: 'ZZZ-444', activo: false },
];

export default function DataGridVehiculos() {
  return (
    <Box sx={{ height: 500, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '90%', maxWidth: 1100 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
