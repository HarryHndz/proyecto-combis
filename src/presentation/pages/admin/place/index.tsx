import {useEffect, useState} from 'react';
import {
  Table,Box,TableBody,TableCell,TableContainer,
  TableRow,Toolbar,Typography,
  Paper,Button,
  IconButton,
  Menu,
  MenuList,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router';
import TuneIcon from '@mui/icons-material/Tune';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PlaceUseCases } from '@/domain/useCases/placeUseCases';
import { IPlaceRoute } from '@/domain/entities/IPlaceRoute';

type TStatus = 'idle' | 'loading' | 'error' | 'completed'


// function EnhancedTableHead() {  
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//           >
//             <TableSortLabel
              
//             >
//               {headCell.label}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//         <TableCell
//           padding='normal'
//         >
//           Acciones
//         </TableCell>
//       </TableRow>
//     </TableHead>
//   );
// }

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
  const [status,setStatus] = useState<TStatus>('idle')
  const [data,setData] = useState<IPlaceRoute[]>([])
  const [anchorEl, setAnchorEl] =useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    const getPlaces = async()=>{
      try {
        setStatus('loading')
        const repository = new PlaceUseCases()
        const responsePlace = await repository.getPlace()
        const responseRoute = await repository.getRoutes()

        const response:IPlaceRoute[] = responseRoute.map((item)=>({
          id: item.id,
          name: item.name,
          places: responsePlace
            .filter((place) => place.id === item.id).map((i)=>({
              id_place:i.places.id_place,
              name:i.places.name,
              longitude:i.places.longitude,
              latitude:i.places.latitude,
              order:i.order
            }))
        }))
        setData(response)
        setStatus('completed')
      } catch (error) {
        console.log("error",error)
        setStatus('error')
      }
    }
    getPlaces()
  },[])

  if (status === 'loading')return <h1>cargando...</h1>
  if (status === 'error') return <h1>Error al cargar los datos</h1>

  return (
    <Box sx={{ width: '100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'20px' }}>
      <Paper sx={{ width: '90%', mb: 2 }}>
        <EnhancedTableToolbar 
          handelNavigate={()=>navigate('add')}
          />
        {
          data.length === 0 ? (
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'300px'}}>
              <Typography variant='h3'>No se ha registrado ninguna ruta</Typography>
            </Box>
          ) : (
            <>
            {
              data.map((item)=>(
                <Box key={item.id}>
                  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:'10px'}}>
                    <Typography>{item.name}</Typography>
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
                      <Paper sx={{ width: 320, maxWidth: '100%',height:'auto' }}>
                        <MenuList sx={{width: '100%',height:'100%',padding:'0px',margin:'0px'}}>
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
                  </Box>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={'medium'}
                    >
                      <TableBody>
                        {item.places.map((row) => {
                          return (
                            <TableRow
                              tabIndex={-1}
                              key={row.id_place}
                            >
                              <TableCell align="right">{row.id_place}</TableCell>
                              <TableCell align="right">{row.name}</TableCell>
                              <TableCell align="right">{row.longitude}</TableCell>
                              <TableCell align="right">{row.latitude}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))
            }
            </>
          )
        }
      </Paper>
    </Box>
  );
}

// const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const navigate = useNavigate()
  

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

{/* <TableCell align="right">
                                
                              </TableCell> */}



                  //             <TablePagination
                  //   rowsPerPageOptions={[5, 10, 25]}
                  //   component="div"
                  //   count={data.length}
                  //   rowsPerPage={rowsPerPage}
                  //   page={page}
                  //   onPageChange={handleChangePage}
                  //   onRowsPerPageChange={handleChangeRowsPerPage}
                  // />



                   // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage]=useState(5);
  // const [anchorEl, setAnchorEl] =useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);