import * as Yup from 'yup';
const providerValidateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^0[2-9]\d{7,8}$/, 'Phone must be a ligel')
      .required('Phone is required'),
    status: Yup.string().required('Status is required'),
});
export default providerValidateSchema;