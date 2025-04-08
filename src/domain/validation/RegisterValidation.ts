import * as yup from "yup";


const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  paternalSurName: yup.string().required("El apellido paterno es requerido"),
  maternalSurName: yup.string().required("El apellido materno es requerido"),
  gender: yup.string().oneOf(["0", "1"], "Seleccione un sexo válido").required("El sexo es requerido"),
  userType: yup.string().oneOf(["2", "3", "4"], "Seleccione un tipo de usuario válido").required("El tipo de usuario es requerido"),
  curp: yup.string().when("userType", {
    is: (userType: string) => userType === '2' || userType === '3',
    then: (schema) => schema.required("La curp es requerido"),
  }),
  rfc: yup.string().when("userType", {
    is: (tipoUsuario: string) => tipoUsuario === '2' || tipoUsuario === '3',
    then: (schema) => schema.required("El RFC es requerido"),
  }),
  date: yup.date().required("La fecha de nacimiento es requerida").max(
    new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    "Fecha inválida"
  ),
  email: yup.string().email("Correo inválido").required("El correo es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir").required("Confirme su contraseña"),
});

export default validationSchema;
