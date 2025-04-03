import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
  Box,
  TableSortLabel,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminUseCases } from "@/domain/useCases/adminUseCases";
import { AdminRepository } from "@/data/repository/adminRepository";
import { IDrivePerson } from "@/domain/entities/IDriver";

export default function Drivers() {
  const [data, setData] = useState<IDrivePerson[]>([])
  const adminRepository = new AdminUseCases(new AdminRepository)

  useEffect(() => {
    const fetchData = async () => {
      const chofe = await adminRepository.getChoferes()
      setData(chofe.data)
      console.log(chofe);
      
    }

    fetchData()
  }, [])

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IDrivePerson>("id_usuario");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPerson, setSelectedPerson] = useState<IDrivePerson | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = (property: keyof IDrivePerson) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    person: IDrivePerson
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedPerson(person);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedPerson(null);
  };

  const handleModify = () => {
    if (selectedPerson) navigate(`modify/${selectedPerson.id_usuario}`);
    handleCloseMenu();
  };

  const handleViewDetails = () => {
    if (selectedPerson) navigate(`details/${selectedPerson.id_usuario}`);
    handleCloseMenu();
  };

  const handleNew = () => {
    navigate("new");
    handleCloseMenu();
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
    setMenuAnchor(null);
  };

  const handleConfirmDelete = () => {
    console.log(`Eliminando usuario con ID: ${selectedPerson?.id_usuario}`);
    setOpenDeleteDialog(false);
  };

  return (
    <Box margin={"auto"} height={"100%"} width={"80%"} mt={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Choferes registrados
          </Typography>
          <AccountCircleIcon />
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleNew}>
          Agregar
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "id",
                "nombre",
                "apellido_pa",
                "apellido_ma",
                "fecha_nacimiento",
                "correo",
              ].map((column) => (
                <TableCell key={column} align="center">
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleRequestSort(column as keyof IDrivePerson)}
                  >
                    {column.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((person) => (
                <TableRow key={person.id_conductor}>
                  <TableCell align="center">{person.id_conductor}</TableCell>
                  <TableCell align="center">{person.usuarios.personas.nombre}</TableCell>
                  <TableCell align="center">{person.usuarios.personas.apellido_pat}</TableCell>
                  <TableCell align="center">{person.usuarios.personas.apellido_mat}</TableCell>
                  <TableCell align="center">
                    {person.usuarios.personas.fecha_nac}
                  </TableCell>
                  <TableCell align="center">{person.usuarios.correo}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(event) => handleOpenMenu(event, person)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleModify}>Modificar</MenuItem>
        <MenuItem onClick={handleViewDetails}>Ver detalles</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este usuario?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
