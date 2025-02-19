import * as Yup from 'yup';
const validationSchema = Yup.object(
  {
    username:Yup.string().required('El usuario es requuerido'),
    password:Yup.string().required('La contraseña es requerida')
  }
)

export default validationSchema