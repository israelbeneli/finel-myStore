// AddWorkerForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import customerService from '../services/customerservice'
import customerValidationSchema from './utils/validation/customerValidate';
import { toast } from 'react-toastify';
const AddCustomerForm = () => {
  const initialValues = {
    israeliId:"",
    name: {first:"",
          last:""},
    phone: '',
    email: '',
    address:{city:"",
            street:"",
            houseNumber:""},
  };

  const validationSchema = customerValidationSchema;

  const onSubmit =async (values, { resetForm }) => {
   
    const newCustomer = await customerService.createCustomer(values);
    toast.success(`the customer ${newCustomer.data.name.first} ${newCustomer.data.name.last} is add`);
    
    resetForm();
  };

  return (
    <div className='container mt-5 w-50'>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
      <div className="row mb-3">
      <h5>פרטים אישיים</h5>
        <div className="col-md-6">
          
          <label htmlFor="israeliId" className="form-label">תעודת זהות:</label>
          <Field
            type="text"
            id="israeliId"
            name="israeliId"
            className="form-control"
          />
          <ErrorMessage name="israeliId" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">מספר טלפון:</label>
          <Field
            type="text"
            id="phone"
            name="phone"
            className="form-control"
          />
          <ErrorMessage name="phone" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="name.first" className="form-label">שם פרטי:</label>
          <Field
            type="text"
            id="name.first"
            name="name.first"
            className="form-control"
          />
          <ErrorMessage name="name.first" component="div" className="text-danger" />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="name.last" className="form-label">שם משפחה:</label>
          <Field
            type="text"
            id="name.last"
            name="name.last"
            className="form-control"
          />
          <ErrorMessage name="name.last" component="div" className="text-danger" />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">אימייל:</label>
          <Field
            type="email"
            id="email"
            name="email"
            className="form-control"
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>
        <h5>כתובת</h5>

      <div className="col-md-4">
          <label htmlFor="address.city" className="form-label">עיר:</label>

          <Field
            type="text"
            id="address.city"
            name="address.city"
            className="form-control"
          />
          <ErrorMessage name="address.city" component="div" className="text-danger" />
        </div> 
        <div className="col-md-4">
          <label htmlFor="address.street" className="form-label">רחוב:</label>
          <Field
            type="text"
            id="address.street"
            name="address.street"
            className="form-control"
          />
          <ErrorMessage name="address.street" component="div" className="text-danger" />
        </div>        
         
        <div className="col-md-4">
          <label htmlFor="address.houseNumber" className="form-label">מספר בית:</label>
          <Field
            type="number"
            id="address.houseNumber"
            name="address.houseNumber"
            className="form-control"
          />
          <ErrorMessage name="address.houseNumber" component="div" className="text-danger" />
        </div>
</div>

        <button type="submit" className="btn btn-primary">
          Add Customer
        </button>
      </Form>
    </Formik>
    </div>
  );
};

export default AddCustomerForm;
