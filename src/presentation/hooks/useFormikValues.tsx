import { FormikValues, useFormik } from "formik";
import * as Yup from 'yup'

interface UseFormikFormProps<T> {
  initialValues: T
  validationSchema: Yup.ObjectSchema<any>
  onSubmit: (values: T) => void
}

export const useFormikForm=
  <T extends FormikValues>(
    {initialValues,validationSchema,onSubmit}:UseFormikFormProps<T>
  )  => {
    const{
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      touched,
      setFieldValue
    } = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit:(values)=>onSubmit(values),
  });

  return {values,errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,setFieldValue}

};
