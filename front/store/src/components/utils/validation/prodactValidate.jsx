import * as Yup from 'yup';

const prodactValidationSchema = Yup.object({
  barcode:Yup.string().min(2).max(255).required(),
  prodactDetails:Yup.object({
    name:Yup.string().min(3).max(255).required(),
    model:Yup.string().min(3).max(255).required(),
    description:Yup.string().min(2).required()
  }),
  family: Yup.string().required(),   
  price:Yup.number().min(0).default(0).required(),
  maxDiscount:Yup.number().min(0).max(100).default(0),
  unitsInStock: Yup.number().min(0).max(1024).default(0),
  providerNum:Yup.number().required(),
  provider:Yup.object({
    providerId:Yup.string(),
    providerName:Yup.string()
  }),  
  image:Yup.object({
      url:Yup.string().min(11).max(1024).default("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"),
      alt:Yup.string().min(2).max(255),
  }), 
})

  export default prodactValidationSchema;