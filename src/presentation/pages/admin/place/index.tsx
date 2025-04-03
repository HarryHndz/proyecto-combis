import * as React from 'react';
import {
  Table,Box,TableBody,TableCell,TableContainer,TableHead,
  TablePagination,TableRow,TableSortLabel,Toolbar,Typography,
  Paper,Button,Menu,MenuList,MenuItem,IconButton
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Data {
  id: number
  name: string
  latitude:number
  longitude:number
}

function createData(
  id: number,
  name: string,
  latitude:number,
  longitude:number,
): Data {
  return {
    id,
    name,
    latitude,
    longitude,
  };
}

const rows = [
  createData(1, "Ciudad de México", 19.4326, -99.1332),
  createData(2, "Buenos Aires", -34.6037, -58.3816),
  createData(3, "Madrid", 40.4168, -3.7038),
  createData(4, "París", 48.8566, 2.3522),
  createData(5, "Tokio", 35.6895, 139.6917),
  createData(6, "Londres", 51.5074, -0.1278),
  createData(7, "Berlín", 52.5200, 13.4050),
  createData(8, "Roma", 41.9028, 12.4964),
  createData(9, "Sídney", -33.8688, 151.2093),
  createData(10, "Toronto", 43.6511, -79.3832),
  createData(11, "Nueva York", 40.7128, -74.0060),
  createData(12, "Los Ángeles", 34.0522, -118.2437),
  createData(13, "Chicago", 41.8781, -87.6298),
  createData(14, "Miami", 25.7617, -80.1918),
  createData(15, "Barcelona", 41.3879, 2.1699),
  createData(16, "Ámsterdam", 52.3676, 4.9041),
  createData(17, "Moscú", 55.7558, 37.6173),
  createData(18, "Beijing", 39.9042, 116.4074),
  createData(19, "Seúl", 37.5665, 126.9780),
  createData(20, "Lisboa", 38.7169, -9.1399)
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'latitude',
    numeric: true,
    disablePadding: false,
    label: 'Latitud',
  },
  {
    id: 'longitude',
    numeric: true,
    disablePadding: false,
    label: 'Longitud',
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          padding='normal'
        >
          Acciones
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  handelNavigate:()=>void
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { handelNavigate } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Paradas Registradas
      </Typography>
      <Button 
        variant='outlined'
        onClick={handelNavigate}
        >
        Agregar
      </Button>
      
    </Toolbar>
  );
}
export default function Places() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          handelNavigate={()=>navigate('add')}
          />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.longitude}</TableCell>
                    <TableCell align="right">{row.latitude}</TableCell>
                    <TableCell align="right">
                      <IconButton size='small' onClick={handleClick}>
                        <TuneIcon />
                      </IconButton>
                      
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <Paper sx={{ width: 320, maxWidth: '100%' }}>
                          <MenuList>
                            <MenuItem>
                              <ListItemIcon>
                              <EditIcon fontSize='small' />
                              </ListItemIcon>
                              <ListItemText>Actualizar</ListItemText>
                            </MenuItem>
                            <MenuItem>
                              <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Eliminar</ListItemText>
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
