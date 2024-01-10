import * as Yup from 'yup';
const workerValidate = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^0[2-9]\d{7,8}$/, 'Phone must be a ligel')
      .required('Phone is required'),
    status: Yup.string().required('Status is required'),
    password:Yup.string().min(6).max(1024).required("Must Be at least 6 and max 1024 bit")
  });
export default workerValidate