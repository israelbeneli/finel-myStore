// AddWorkerForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import workerService from '../services/workerservice';
import { toast } from 'react-toastify';
import workerValidate from './utils/validation/workerValidate';
const AddWorkerForm = () => {
  const initialValues = {
    name: '',
    phone: '',
    status: '',
    password:''
  };

  const validationSchema = workerValidate;

  const onSubmit =async (values, { resetForm }) => {
    const newWorker = await workerService.createWorker(values)
    toast.success(`the worker number is ${newWorker.data.workerNum}`);
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
      <h5>הוספת עובד חדש</h5>
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">שם העובד:</label>
          <Field
            type="text"
            id="name"
            name="name"
            className="form-control"
          />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>

        <div className="col-md-4">
          <label htmlFor="phone" className="form-label">טלפון:</label>
          <Field
            type="text"
            id="phone"
            name="phone"
            className="form-control"
          />
          <ErrorMessage name="phone" component="div" className="text-danger" />
        </div>
        <div className="col-md-4">
          <label htmlFor="password" className="form-label">סיסמא:</label>
          <Field
            type="password"
            id="password"
            name="password"
            className="form-control"
          />
          <ErrorMessage name="password" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            תפקיד:
          </label>
          <Field as="select" id="status" name="status" className="form-select">
            <option value="" label="בחר תפקיד מהרשימה" />
            <option value="Salesman" label="Salesman" />
            <option value="PersonnelManager" label="PersonnelManager" />
            <option value="PurchasingManager" label="PurchasingManager" />
            <option value="Admin" label="Admin" />
          </Field>
          <ErrorMessage name="status" component="div" className="text-danger" />
        </div>


      </div>
        <button type="submit" className="btn btn-primary">
          Add Worker
        </button>
        
      </Form>
    </Formik>
    </div>
  );
};

export default AddWorkerForm;
