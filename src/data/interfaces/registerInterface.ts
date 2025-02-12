export interface FormFieldProps {
  field: {
    label: string;
    name: string;
  };
  formik: any;
  type?: string;
  selectOptions?: { value: string; label: string }[];
  [key: string]: unknown;
}

export interface FormCheckboxProps {
  field: {
    name: string;
  };
  formik: any;
  label: string;
  [key: string]: unknown;
}

export interface RegisterFormValues {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  fechaNacimiento: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
  tipoUsuario: string;
  curp?: string;
  rfc?: string;
  terminos: boolean;
}