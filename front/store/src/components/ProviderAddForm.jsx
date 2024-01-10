// AddWorkerForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import providerService from '../services/providerservice';
import { toast } from 'react-toastify';
const AddProviderForm = () => {
  const initialValues = {
    providerName: '',
    agentName: '',
    agentPhone: ''
  };

  const validationSchema = Yup.object({
    providerName: Yup.string().min(2).max(255).required('Name is required'),
    agentPhone: Yup.string()
      .matches(/^0[2-9]\d{7,8}$/, 'Phone must be a ligel')
      .required('Phone is required'),
    agentName: Yup.string().min(2).max(255).required('agent name is required')
  });

  const onSubmit =async (values, { resetForm }) => {
    const newProvider = await providerService.createProvider(values)
    toast.success(`the provider number is ${newProvider.data.providerNum}`);
    
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
      <h5>הוספת ספק חדש</h5>
        <div className="col-md-4">
          <label htmlFor="providerName" className="form-label">שם הספק:</label>
          <Field
            type="text"
            id="providerName"
            name="providerName"
            className="form-control"
          />
          <ErrorMessage name="providerName" component="div" className="text-danger" />
        </div>

        <div className="col-md-4">
          <label htmlFor="agentName" className="form-label">שם הסוכן:</label>
          <Field
            type="text"
            id="agentName"
            name="agentName"
            className="form-control"
          />
          <ErrorMessage name="agentName" component="div" className="text-danger" />
        </div>
        <div className="col-md-4">
          <label htmlFor="agentPhone" className="form-label">טלפון סוכן::</label>
          <Field
            type="text"
            id="agentPhone"
            name="agentPhone"
            className="form-control"
          />
          <ErrorMessage name="agentPhone" component="div" className="text-danger" />
        </div>
        <div className="col-md m-3">
          <button type="submit" className="btn btn-primary">
          הוסף ספק
        </button>
        </div>
      </div>
      
        
      </Form>
    </Formik>
    </div>
  );
};

export default AddProviderForm;
