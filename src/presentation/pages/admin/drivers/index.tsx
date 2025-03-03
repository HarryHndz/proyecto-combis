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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Persona {
  id: number;
  nombre: string;
  apellido_pa: string;
  apellido_ma: string;
  fecha_nacimiento: string;
  correo: string;
}

function createData(
  id: number,
  nombre: string,
  apellido_pa: string,
  apellido_ma: string,
  fecha_nacimiento: string,
  correo: string
): Persona {
  return { id, nombre, apellido_pa, apellido_ma, fecha_nacimiento, correo };
}

const data: Persona[] = [
  createData(
    1,
    "Juan",
    "García",
    "López",
    "1990-05-15",
    "juan.garcia@example.com"
  ),
  createData(
    2,
    "María",
    "Martínez",
    "Gómez",
    "1985-08-22",
    "maria.martinez@example.com"
  ),
  createData(
    3,
    "Carlos",
    "Rodríguez",
    "Hernández",
    "1992-03-10",
    "carlos.rodriguez@example.com"
  ),
  createData(4, "Ana", "López", "Pérez", "1988-11-30", "ana.lopez@example.com"),
  createData(
    5,
    "Luis",
    "Gómez",
    "Gutiérrez",
    "1995-07-25",
    "luis.gomez@example.com"
  ),
  createData(
    6,
    "Laura",
    "Pérez",
    "Sánchez",
    "1991-09-12",
    "laura.perez@example.com"
  ),
  createData(
    7,
    "Pedro",
    "Hernández",
    "Ramírez",
    "1987-04-18",
    "pedro.hernandez@example.com"
  ),
  createData(
    8,
    "Sofía",
    "Sánchez",
    "Torres",
    "1993-12-05",
    "sofia.sanchez@example.com"
  ),
  createData(
    9,
    "Jorge",
    "Ramírez",
    "Flores",
    "1989-06-20",
    "jorge.ramirez@example.com"
  ),
  createData(
    10,
    "Diana",
    "Torres",
    "Vargas",
    "1994-02-14",
    "diana.torres@example.com"
  ),
  createData(
    11,
    "Fernando",
    "Flores",
    "Díaz",
    "1996-10-08",
    "fernando.flores@example.com"
  ),
  createData(
    12,
    "Gabriela",
    "Vargas",
    "Morales",
    "1986-01-25",
    "gabriela.vargas@example.com"
  ),
  createData(
    13,
    "Ricardo",
    "Díaz",
    "Ortega",
    "1997-07-30",
    "ricardo.diaz@example.com"
  ),
  createData(
    14,
    "Patricia",
    "Morales",
    "Cruz",
    "1998-03-22",
    "patricia.morales@example.com"
  ),
  createData(
    15,
    "Oscar",
    "Ortega",
    "Reyes",
    "1984-09-17",
    "oscar.ortega@example.com"
  ),
  createData(
    16,
    "Lucía",
    "Cruz",
    "Jiménez",
    "1999-05-11",
    "lucia.cruz@example.com"
  ),
  createData(
    17,
    "Manuel",
    "Reyes",
    "Mendoza",
    "1983-12-03",
    "manuel.reyes@example.com"
  ),
  createData(
    18,
    "Adriana",
    "Jiménez",
    "Aguilar",
    "1990-08-19",
    "adriana.jimenez@example.com"
  ),
  createData(
    19,
    "Roberto",
    "Mendoza",
    "Castillo",
    "1982-04-27",
    "roberto.mendoza@example.com"
  ),
  createData(
    20,
    "Isabel",
    "Aguilar",
    "Ruiz",
    "1991-11-14",
    "isabel.aguilar@example.com"
  ),
  createData(
    21,
    "Francisco",
    "Castillo",
    "Alvarado",
    "1981-06-09",
    "francisco.castillo@example.com"
  ),
  createData(
    22,
    "Carmen",
    "Ruiz",
    "Ramos",
    "1992-02-28",
    "carmen.ruiz@example.com"
  ),
  createData(
    23,
    "Antonio",
    "Alvarado",
    "Medina",
    "1980-10-15",
    "antonio.alvarado@example.com"
  ),
  createData(
    24,
    "Alejandra",
    "Ramos",
    "Guerrero",
    "1993-07-23",
    "alejandra.ramos@example.com"
  ),
  createData(
    25,
    "Miguel",
    "Medina",
    "Rojas",
    "1989-03-18",
    "miguel.medina@example.com"
  ),
  createData(
    26,
    "Teresa",
    "Guerrero",
    "Silva",
    "1994-09-05",
    "teresa.guerrero@example.com"
  ),
  createData(
    27,
    "José",
    "Rojas",
    "Vega",
    "1987-05-29",
    "jose.rojas@example.com"
  ),
  createData(
    28,
    "Elena",
    "Silva",
    "Campos",
    "1995-01-12",
    "elena.silva@example.com"
  ),
  createData(
    29,
    "Raúl",
    "Vega",
    "Ortiz",
    "1988-08-07",
    "raul.vega@example.com"
  ),
  createData(
    30,
    "Claudia",
    "Campos",
    "Soto",
    "1996-04-01",
    "claudia.campos@example.com"
  ),
];

export default function Drivers() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Persona>("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPerson, setSelectedPerson] = useState<Persona | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = (property: keyof Persona) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    person: Persona
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedPerson(person);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedPerson(null);
  };

  const handleModify = () => {
    if (selectedPerson) navigate(`modify/${selectedPerson.id}`);
    handleCloseMenu();
  };

  const handleViewDetails = () => {
    if (selectedPerson) navigate(`details/${selectedPerson.id}`);
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
    console.log(`Eliminando usuario con ID: ${selectedPerson?.id}`);
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
                    onClick={() => handleRequestSort(column as keyof Persona)}
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
                <TableRow key={person.id}>
                  <TableCell align="center">{person.id}</TableCell>
                  <TableCell align="center">{person.nombre}</TableCell>
                  <TableCell align="center">{person.apellido_pa}</TableCell>
                  <TableCell align="center">{person.apellido_ma}</TableCell>
                  <TableCell align="center">
                    {person.fecha_nacimiento}
                  </TableCell>
                  <TableCell align="center">{person.correo}</TableCell>
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
