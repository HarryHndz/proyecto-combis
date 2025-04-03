import * as yup from "yup";


const placeValidation = yup.object({
  name: yup.string().required("El nombre es requerido"),
  places:yup.array().required()
});

export default placeValidation;
