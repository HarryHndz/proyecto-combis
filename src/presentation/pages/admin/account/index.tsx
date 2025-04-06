"use client"
import { useEffect, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Edit as EditIcon,
  Key as KeyIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"

import { AdminUseCases } from "@/domain/useCases/adminUseCases"
import { AdminRepository } from "@/data/repository/adminRepository"
import { IUserResData } from "@/domain/entities/IUserRes"
import { LocalStoreRepository } from "@/data/repository/localRepository"
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase"
import { IUser } from "@/domain/entities/IAuth"

export default function UserProfile() {
  const [userData, setUserData] = useState<IUserResData>()
  const adminRepository = new AdminUseCases(new AdminRepository)
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository())

  useEffect(() => {
    const fetchData = async () => {
      const userLocal = localRepository.get('user')
      console.log('id', userLocal?.id)
      const user = await adminRepository.getDataUser(userLocal?.id as unknown as number)
      setUserData(user.data)
    }

    fetchData()
  }, [])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  const [editFormData, setEditFormData] = useState({ ...userData })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle edit profile form changes
  const handleEditFormChange = (e: any) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle password form changes
  const handlePasswordChange = (e: any) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  // Save profile changes
  const saveProfileChanges = () => {
    setUserData(editFormData)
    setEditProfileOpen(false)
  }

  // Save password changes
  const savePasswordChanges = () => {
    // Here you would implement the actual password change logic
    console.log("Password changed", passwordData)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setChangePasswordOpen(false)
  }

  // Handle logout
  const handleLogout = () => {
    console.log("User logged out")
    // Here you would implement the actual logout logic
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil de Usuario
        </Typography>

        <Grid container spacing={4}>
          {/* User info section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                <Avatar src="../../../../public/perfil.png" alt={userData?.usuario} sx={{ width: 120, height: 120, mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  {userData?.usuario}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditProfileOpen(true)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* User details section */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    Información Personal
                  </Typography>
                  <IconButton color="primary" onClick={() => setEditProfileOpen(true)}>
                    <EditIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Nombre
                    </Typography>
                    <Typography variant="body1">{userData?.personas.nombre}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Correo Electrónico
                    </Typography>
                    <Typography variant="body1">{userData?.correo}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      RFC
                    </Typography>
                    <Typography variant="body1">{userData?.personas.rfc}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      CURP
                    </Typography>
                    <Typography variant="body1">{userData?.personas.curp}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Actions section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Opciones de Cuenta
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<KeyIcon />}
                      onClick={() => setChangePasswordOpen(true)}
                      fullWidth={isMobile}
                    >
                      Cambiar Contraseña
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      fullWidth={isMobile}
                    >
                      Cerrar Sesión
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onClose={() => setEditProfileOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField label="Nombre" name="name" value={editFormData.usuario} onChange={handleEditFormChange} fullWidth />
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={editFormData.correo}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={editFormData.personas?.curp}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Dirección"
              name="address"
              value={editFormData.personas?.rfc}
              onChange={handleEditFormChange}
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<CancelIcon />}
            onClick={() => {
              setEditFormData({ ...userData })
              setEditProfileOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={saveProfileChanges}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Contraseña Actual"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="Nueva Contraseña"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="Confirmar Nueva Contraseña"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              fullWidth
              error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ""}
              helperText={
                passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ""
                  ? "Las contraseñas no coinciden"
                  : ""
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<CancelIcon />}
            onClick={() => {
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
              setChangePasswordOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={savePasswordChanges}
            disabled={
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              passwordData.newPassword !== passwordData.confirmPassword
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

