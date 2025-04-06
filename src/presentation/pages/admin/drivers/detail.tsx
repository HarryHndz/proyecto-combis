import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
} from "@mui/material"
import { Person, Badge, CalendarMonth, Email, Info } from "@mui/icons-material"
import { IUserResData } from "@/domain/entities/IUserRes"
import { useParams } from "react-router-dom";
import { AdminUseCases } from "@/domain/useCases/adminUseCases";
import { AdminRepository } from "@/data/repository/adminRepository";
import { useEffect, useState } from "react";

export default function DetailsDriver() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<IUserResData>()
  const adminRepository = new AdminUseCases(new AdminRepository)
  useEffect(() => {
    console.log('id', userId)
    const fetchData = async () => {
      try {
        const response = await adminRepository.getDataUser(Number(userId))
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }
    , [userId])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const getFullName = (data: IUserResData) => {
    return `${data.personas.nombre} ${data.personas.apellido_pat} ${data.personas.apellido_mat}`
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: "primary.main" }}>{userData.usuario.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="h5" component="h1">
                  {userData.usuario}
                </Typography>
                <Chip
                  label={userData.activo === 1 ? "Activo" : "Inactivo"}
                  color={userData.activo === 1 ? "success" : "error"}
                  size="small"
                />
              </Box>
              <Divider />
            </Box>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {/* User Information */}
              <Box flex={1}>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Info fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                  Información de Usuario
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    backgroundColor: "background.paper",
                    "& .MuiTableCell-root": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          ID Usuario
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.id_usuario}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          Usuario
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.usuario}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          <Email fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                          Correo
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.correo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          Estado
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>
                          {userData.activo === 1 ? "Activo" : "Inactivo"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Tipo Usuario Information */}
              <Box flex={1}>
                <Typography variant="h6" component="h2" gutterBottom>
                  <Badge fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                  Tipo de Usuario
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    backgroundColor: "background.paper",
                    "& .MuiTableCell-root": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          ID Tipo
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>
                          {userData.tipo_usuarios.id_tipo_usuario}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          Nombre
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>
                          {userData.tipo_usuarios.nombre}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ backgroundColor: "background.paper" }}>
                          Descripción
                        </TableCell>
                        <TableCell sx={{ backgroundColor: "background.paper" }}>
                          {userData.tipo_usuarios.descripcion}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>

            {/* Persona Information */}
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                <Person fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                Información Personal
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiTableCell-root": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>ID Persona</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>Nombre Completo</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>Sexo</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        <CalendarMonth fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                        Fecha Nacimiento
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>CURP</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>RFC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.personas.id_persona}</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        {getFullName(userData)}
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        {userData.personas.sexo === 1 ? "Masculino" : "Femenino"}
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>
                        {formatDate(userData.personas.fecha_nac)}
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.personas.curp}</TableCell>
                      <TableCell sx={{ backgroundColor: "background.paper" }}>{userData.personas.rfc}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

