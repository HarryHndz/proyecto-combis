import { useFormik } from "formik";
import * as Yup from "yup";
import { IRegisterVehicle } from "@/domain/entities/IVehicles"; 

interface UseFormikFormProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T) => void;
}

export const useVehicleFormikForm = (
  { initialValues, validationSchema, onSubmit }: UseFormikFormProps<IRegisterVehicle>
) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  } = useFormik<IRegisterVehicle>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  };
};
