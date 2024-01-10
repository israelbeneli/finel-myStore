import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import providerValidateSchema from './utils/validation/providerValidate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import providerService from '../services/providerservice';
const ProviderUpdateForm = ()=>{
  const [providerDetails , setProviderDetails]= useState(null);
  const handleSearch = async (values, actions) => {
    try {
      const response = await providerService.getProviderWithNum(values.providerNum);
      const data = response.data;
      setProviderDetails(data);
      actions.setValues(data);
    } catch (error) {
      toast.error('Error fetching employee data:', error);
    }
  };
  const handleFormSubmit = async(values, actions) => {
    await providerService.providerChangeDetails(values.providerNum,{agentName:values.agentName,agentPhone:values.agentPhone})
    actions.setSubmitting(false);
    toast.success('העדכון הושלם בהצלחה',{
      position: 'top-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    actions.resetForm()
    setProviderDetails(null)
  };
  return (
    <div className='container mt-5 w-75'>
    <Formik
      initialValues={{
        providerNum:'',
        agentName: '',
        agentPhone: ''
      }}
      validationSchema={providerValidateSchema}
      onSubmit={handleFormSubmit}
    >
      {(formikProps) => (
        <Form>
          <div className="row mb-3">
          <div className="col-md1 p-1">
            <label htmlFor="providerNum">מספר ספק:</label>
            <Field
              type="text"
              id="providerNum"
              name="providerNum"
              onChange={(e) => {
                // Reset employee data on employee number change
                setProviderDetails(null);
                formikProps.handleChange(e);
              }}
            />
             <ErrorMessage name="providerNum" component="div" className="text-danger" />
            <button
              type="button" className="btn btn-primary m-2"
              onClick={() => handleSearch(formikProps.values, formikProps)}
            >
              חפש
            </button> 
          </div>   
          {providerDetails && (<>
              <div className="col-md-6">
                <label htmlFor="agentName">שם הסוכן:</label>
                <Field type="text" id="agentName" name="agentName" />
                <ErrorMessage name="agentName" component="div" className="text-danger" />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="agentPhone">טלפון:</label>
                <Field type="text" id="agentPhone" name="agentPhone" />
                <ErrorMessage name="agentPhone" component="div" className="text-danger" />
              </div>
              </>
          )}
        {providerDetails &&
        <div className="col m-1">
          <button className="btn btn-primary m-1 w-25" type="submit" onClick={()=>handleFormSubmit(formikProps.values,formikProps)} disabled={formikProps.isSubmitting}>
            שמור שינויים
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

export default ProviderUpdateForm;




