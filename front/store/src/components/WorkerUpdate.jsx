import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import workerService from '../services/workerservice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth.context';
import workerValidate from './utils/validation/workerValidate';
const WorkerUpdateForm = ()=>{
  const [workerDetails , setWorkerDetails]= useState(null);
  const {worker}=useAuth()
  const validateSchema = workerValidate
  
  const handleSearch = async (values, actions) => {
    // Simulate fetching employee data based on employee number
    try {
      const response = await workerService.getWorkerWithNum(values.workerNum);
      const data = response.data;
      setWorkerDetails(data);
      actions.setValues(data);
    } catch (error) {
      toast.error('Error fetching employee data:', error);
    }
  };
  const  handleFormSubmit = async(values, actions) => {
    await workerService.workerChangeDetails(values.workerNum,{name:values.name,phone:values.phone,status:values.status})
    actions.setSubmitting(false);
    toast.success('העדכון הושלם בהצלחה',{
      position: 'top-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  };
  const handleDelete = async(values, { setSubmitting, resetForm })=>{
    await workerService.workerDelete(String(values));
    toast.warn(`the worker ${values} is delete`)
    setWorkerDetails(null)
    resetForm();
    setSubmitting(false);
  }
  return (
    <div className='container mt-5 w-75'>
    <Formik
      initialValues={{
        workerNum: '',
        name: '',
        phone: '',
        status: '',
      }}
      validationSchema={validateSchema}
      onSubmit={handleFormSubmit}
    >
      {(formikProps) => (
        <Form>
          <div className="row mb-3">
          <div className="col-md1 p-1">
            <label htmlFor="workerNum" className="form-label" >מספר עובד:</label>
            <Field
              type="text"
              id="workerNum"
              name="workerNum"
              className="form-control"
              onChange={(e) => {
                // Reset employee data on employee number change
                setWorkerDetails(null);
                formikProps.handleChange(e);
              }}
            />
            <ErrorMessage name="workerNum" component="div" className="text-danger" />
            <button
              type="button" className="btn btn-primary m-2"
              onClick={() => handleSearch(formikProps.values, formikProps)}
            >
              חפש
            </button>
            
          </div>

          {workerDetails && (<>
              <div className="col-md-6">
                <label className="form-label" htmlFor="name">שם העובד:</label>
                <Field className="form-control" type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="col-md-6 ">
                <label className="form-label" htmlFor="phone">טלפון:</label>
                <Field className="form-control" type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>
              <div className="col-md1 m-1">
              <label className="form-label" htmlFor="status">תפקיד:</label>
              <Field as="select" id="status" name="status" className="form-select">
                <option value="" label="Select a status" />
                <option value="Salesman" label="Salesman" />
                <option value="PersonnelManager" label="PersonnelManager" />
                <option value="PurchasingManager" label="PurchasingManager" />
                {(worker.status==="Admin")&&<option value="Admin" label="Admin" />}
              </Field>
              <ErrorMessage name="status" component="div" className="text-danger" />
              </div>
              </>
          )}
        {workerDetails &&
        <div className="col m-1">
          <button className="btn btn-primary m-1 w-25 " type="submit" disabled={formikProps.isSubmitting}>
            שמור שינויים
          </button>
          <button
              type="button" className="btn btn-danger m-2"
              onClick={() => handleDelete(formikProps.values.workerNum, formikProps)}
            >
              מחק
            </button>
        </div>
        }
          </div>
        </Form>
        
      )}
    </Formik>
    </div>
  );
};

export default WorkerUpdateForm;




