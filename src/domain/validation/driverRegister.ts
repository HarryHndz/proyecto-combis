import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  username: yup.string().required("El nombre de usuario es requerido"),
  paternalSurName: yup.string().required("El apellido paterno es requerido"),
  maternalSurName: yup.string().required("El apellido materno es requerido"),
  gender: yup.string().oneOf(["0", "1"], "Seleccione un sexo válido").required("El sexo es requerido"),
  curp: yup.string().required("La curp es requerido"),
  rfc: yup.string().required("El RFC es requerido"),
  date: yup.date().required("La fecha de nacimiento es requerida"),
  email: yup.string().email("Correo inválido").required("El correo es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir").required("Confirme su contraseña"),
});

export default validationSchema;
