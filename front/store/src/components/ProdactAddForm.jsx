// AddWorkerForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import prodactValidationSchema from './utils/prodactValidate';
import prodactService from '../services/prodactservice';
import providerService from '../services/providerservice';

import { BsSearch } from 'react-icons/bs';
import prodactValidationSchema from './utils/validation/prodactValidate';
import { toast } from 'react-toastify';
const ProdactAddForm = () => {
  const [providerName,setProviderName]=useState("")

  const handleSearch = async(values, actions)=>{
    try{
      let provider = await providerService.getProviderWithNum(values.providerNum)
      provider = provider.data;
      if(provider){
        setProviderName(provider.providerName)
      }
    }catch(e){
      actions.setValues({...values,provider:"provider not exist"})
      setProviderName("");
    }
  }


  const initialValues = {
    barcode:"",
    prodactDetails:{
      name:"",
      model:"",
      description:""
    },
    providerNum:"",
    provider:{
      providerId:"",
      providerName:"",
    },
    family:"",
    price:"",
    maxDiscount:"",
    unitsInStock:"",
    image:{
      url:"",
      alt:"",
    }
  };

  const validationSchema = prodactValidationSchema

  const onSubmit =async (values, { resetForm }) => {
    const prodactToAdd = {...values };
    delete prodactToAdd.providerNum;
    const provider = await providerService.getProviderWithNum(values.providerNum)
  
    if(provider){
      prodactToAdd.provider.providerId = provider.data._id;
      prodactToAdd.unitsInStock = 0;
      prodactToAdd.provider.providerName=provider.data.providerName;
      values.provider = provider.name;
      const newProdact = await prodactService.createProdact(prodactToAdd)
      toast.success(`the prodact ${newProdact.data.barcode} is add`);
      setProviderName("");
      resetForm();
    }
    else{
      toast.error("מספר ספק לא נמצא במערכת")
    }
    
  };
  
  return (
    <div className='container mt-5 w-50'>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        {(formikProps) => (
      <Form>

      <div className="row mb-3">
      <h5>הוספת מוצר חדש</h5>
        <div className="col-md-6">
          <label htmlFor="barcode" className="form-label">מק"ט:</label>
          <Field
            type="text"
            id="barcode"
            name="barcode"
            className="form-control"
          />
          <ErrorMessage name="barcode" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label htmlFor="prodactDetails.name" className="form-label">שם המוצר:</label>
          <Field
            type="text"
            id="prodactDetails.name"
            name="prodactDetails.name"
            className="form-control"
          />
          <ErrorMessage name="prodactDetails.name" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="prodactDetails.model" className="form-label"> דגם:</label>
          <Field
            type="text"
            id="prodactDetails.model"
            name="prodactDetails.model"
            className="form-control"
          />
          <ErrorMessage name="prodactDetails.model" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="prodactDetails.description" className="form-label"> תאור:</label>
          <Field
            type="text"
            id="prodactDetails.description"
            name="prodactDetails.description"
            className="form-control"
          />
          <ErrorMessage name="prodactDetails.description" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label"> משפחה:</label>
          <Field as="select" id="family" name="family" className="form-select">
            <option value="" label="בחר משפחה מהרשימה" />
            <option value="לבנים" label="לבנים" />
            <option value="קטנים" label="קטנים" />
            <option value="טכנולוגיה" label="טכנולוגיה" />
            <option value="אחר" label="אחר" />
          </Field>
          <ErrorMessage name="family" component="div" className="text-danger" />
        </div>
        <div className="col-md-4" dir="ltr">
            <label htmlFor="provider.providerNum" className="form-label"> מספר ספק:</label>
            <div className="input-group">
              <label className="input-group-text" htmlFor="search-icon">
                <BsSearch type="button" onClick={() => handleSearch(formikProps.values, formikProps)}/>
              </label>  
              <Field
                type="search"
                id="providerNum"
                name="providerNum"
                className="form-control"
                onChange={(e) => {
                  setProviderName("")
                  // setProviderDetails(null);
                  formikProps.handleChange(e);
                }}
            />

            <ErrorMessage name="providerNum" component="div" className="text-danger" />
          </div>
          <h6 id='providerName1'
            >שם הספק: {providerName}</h6>
        </div>

        <div className="col-md-4">
          <label htmlFor="price" className="form-label"> מחיר:</label>
          <Field
            type="number"
            id="price"
            name="price"
            className="form-control"
          />
          <ErrorMessage name="price" component="div" className="text-danger" />
        </div>
        <div className="col-md-4">
          <label htmlFor="maxDiscount" className="form-label"> הנחה מקסימלית:</label>
          <Field
            type="number"
            id="maxDiscount"
            name="maxDiscount"
            className="form-control"
          />
          <ErrorMessage name="maxDiscount" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="image.url" className="form-label">קישור לתמונה:</label>
          <Field
            type="url"
            id="image.url"
            name="image.url"
            className="form-control"
          />
          <ErrorMessage name="image.url" component="div" className="text-danger" />
        </div>
        <div className="col-md-6">
          <label htmlFor="image.alt" className="form-label">תיאור לתמונה:</label>
          <Field
            type="text"
            id="image.alt"
            name="image.alt"
            className="form-control"
          />
          <ErrorMessage name="image.alt" component="div" className="text-danger" />
        </div>
        <div className="col-md m-3">
          <button type="submit" className="btn btn-primary">
          הוסף מוצר
        </button>
        </div>
      </div>
      
        
      </Form>
        )}
    </Formik>
    </div>
  );
};

export default ProdactAddForm;
