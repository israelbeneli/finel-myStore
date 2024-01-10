// AddWorkerForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import prodactValidationSchema from './utils/prodactValidate';
import prodactService from '../services/prodactservice';
import { toast } from 'react-toastify';


import prodactValidationSchema from './utils/validation/prodactValidate';
const ProdactChangeDetails = () => {
  const [prodact,setProdact]=useState(null)

  const handleSearch = async(values, actions)=>{
    try {
      const response = await prodactService.getProdactByBarcode(values.barcode);
      const data = response.data;
      setProdact(data);
      actions.setValues(data);
    } catch (error) {
      toast.error('Error fetching prodact data:', error);
    }

  }
  const handleFormSubmit = async(values, actions) => {
    const prodactUpdate = {
      prodactDetails:{
            name:values.prodactDetails.name,
            model:values.prodactDetails.model,
            description:values.prodactDetails.description
        },
        price:values.price,
        maxDiscount:values.maxDiscount,
        image:{
          url:values.image.url,
          alt:values.image.alt
        }
    }
    await prodactService.chengeProdactDetails(values.barcode,prodactUpdate)
    setProdact(null)
    actions.setSubmitting(false);
  };
  const handleDelete = async(values, { setSubmitting, resetForm })=>{
    await prodactService.delProdactByBarcode(String(values));
    toast.warn(`the prodact with barcode ${values} is delete`)
    setProdact(null)
    resetForm();
    setSubmitting(false);
  }



  const validationSchema = prodactValidationSchema

  return (
    <div className='container mt-5 w-50'>
    <Formik
      initialValues={{
        barcode:"",
        prodactDetails:{
          name:"",
          model:"",
          description:""
        },
        price:"",
        maxDiscount:"",
        image:{
          url:"",
          alt:"",
        }}
      }
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
        {(formikProps) => (
      <Form>
        <>
        {!prodact &&<>
          <div className="row mb-3">
                    <label htmlFor="barcode" className="form-label"> מק"ט:</label>
                <Field
                type="text"
                id="barcode"
                name="barcode"
                className="form-control"
                onChange={(e) => {
                    // Reset employee data on employee number change
                    setProdact(null);
                    formikProps.handleChange(e);
                }}
                />
                <button className="btn btn-primary m-2" type="button" onClick={() => handleSearch(formikProps.values, formikProps)}>
                חפש!
                </button>         
            </div>
        </>}
        {prodact && 
        <>
            <div className="row mb-3">
                <div className="col-md-4"> מק"ט : {prodact.barcode}
                </div>
                
                <h5>פרטים אישיים</h5>

                <div className="col-md-6">
                <label htmlFor="prodactDetails.name" className="form-label"> שם המוצר:</label>
                <Field
                    type="text"
                    id="prodactDetails.name"
                    name="prodactDetails.name"
                    className="form-control"
                />
                <ErrorMessage name="prodactDetails.name" component="div" className="text-danger" />
                </div> 
                <div className="col-md-6">
                <label htmlFor="prodactDetails.model" className="form-label">דגם: </label>
                <Field
                    type="text"
                    id="prodactDetails.model"
                    name="prodactDetails.model"
                    className="form-control"
                />
                <ErrorMessage name="prodactDetails.model" component="div" className="text-danger" />
                </div> 
                <div className="col-md-12">
                <label htmlFor="prodactDetails.description" className="form-label">תאור: </label>
                <Field
                    type="text"
                    id="prodactDetails.description"
                    name="prodactDetails.description"
                    className="form-control"
                />
                <ErrorMessage name="prodactDetails.description" component="div" className="text-danger" />
                </div> 
                <div className="col-md-6">
                <label htmlFor="price" className="form-label">מחיר: </label>
                <Field
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                />
                <ErrorMessage name="price" component="div" className="text-danger" />
                </div> 
                <div className="col-md-6">
                <label htmlFor="maxDiscount" className="form-label">הנחה מקסימלית: </label>
                <Field
                    type="text"
                    id="maxDiscount"
                    name="maxDiscount"
                    className="form-control"
                />
                <ErrorMessage name="maxDiscount" component="div" className="text-danger" />
                </div> 
                <div className="col-md-6">
                <label htmlFor="image.url" className="form-label">קישור לתמונה: </label>
                <Field
                    type="text"
                    id="image.url"
                    name="image.url"
                    className="form-control"
                />
                <ErrorMessage name="image.url" component="div" className="text-danger" />
                </div> 
                <div className="col-md-6">
                <label htmlFor="image.alt" className="form-label">תאור תמונה: </label>
                <Field
                    type="text"
                    id="image.alt"
                    name="image.alt"
                    className="form-control"
                />
                <ErrorMessage name="image.alt" component="div" className="text-danger" />
                </div> 
                <div className="col m-1">
                    <button className="btn btn-primary m-2" type='submit'
                    onClick={()=>handleFormSubmit(formikProps.values,formikProps)}
                    disabled={formikProps.isSubmitting}>
                        שמור שינויים
                    </button>
                    <button
                        type="button" className="btn btn-danger m-2"
                        onClick={() => handleDelete(formikProps.values.barcode, formikProps)}
                        >
                        מחק
                    </button>
                </div>

            </div> 
        </>}  
        </>
      
      </Form>
        )}
    </Formik>
    </div>
  );
};

export default ProdactChangeDetails;
