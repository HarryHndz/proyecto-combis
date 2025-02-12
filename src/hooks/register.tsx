import { useFormik } from "formik";
import { useState } from "react";
import initialValues from "../data/initialValues/registerValues";
import validationSchema from "../data/validations/RegisterValidation";
import { RegisterFormValues } from "../data/interfaces/registerInterface";


export const useRegisterForm = () => {
  const [tipoUsuario, setTipoUsuario] = useState<string>("");

  const formik = useFormik<RegisterFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado", values);
    },
  });

  return { formik, tipoUsuario, setTipoUsuario };
};
