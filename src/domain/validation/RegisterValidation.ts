import * as yup from "yup";


const validationSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  apellidoPaterno: yup.string().required("El apellido paterno es requerido"),
  apellidoMaterno: yup.string().required("El apellido materno es requerido"),
  sexo: yup.string().oneOf(["hombre", "mujer"], "Seleccione un sexo válido").required("El sexo es requerido"),
  tipoUsuario: yup.string().oneOf(["usuario", "chofer", "dueño"], "Seleccione un tipo de usuario válido").required("El tipo de usuario es requerido"),
  curp: yup.string().when("tipoUsuario", {
    is: (tipoUsuario: string) => tipoUsuario === "chofer" || tipoUsuario === "dueño",
    then: (schema) => schema.required("El CRUP es requerido"),
  }),
  rfc: yup.string().when("tipoUsuario", {
    is: (tipoUsuario: string) => tipoUsuario === "chofer" || tipoUsuario === "dueño",
    then: (schema) => schema.required("El RFC es requerido"),
  }),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es requerida"),
  correo: yup.string().email("Correo inválido").required("El correo es requerido"),
  contraseña: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
  confirmarContraseña: yup.string().oneOf([yup.ref("contraseña"), undefined], "Las contraseñas deben coincidir").required("Confirme su contraseña"),
  terminos: yup.boolean().oneOf([true], "Debe aceptar los términos y condiciones"),
});

export default validationSchema;
