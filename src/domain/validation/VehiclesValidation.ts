import * as Yup from "yup";

const validationSchema = Yup.object({
  numero: Yup.string().required("El número es obligatorio"),
  matricula: Yup.string().required("La matrícula es obligatoria"),
  image: Yup.mixed().required("La imagen es obligatoria"),
});

export default validationSchema;
