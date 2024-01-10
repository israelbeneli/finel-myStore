
import React, { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import { toast } from 'react-toastify';
import prodactService from '../services/prodactservice';
import { BsSearch } from 'react-icons/bs';

import ProdactTableInSearch from '../common/ProdactTableSearch';
const ProdactSearch = () => {

  const [result,setReasult]=useState([]);


  const handleSearchByBarcode = async(barcode, actions)=>{
    try{
      const prodacts = await prodactService.getProdactByBarcode(barcode)
      const data =await prodacts.data;
      setReasult(data)
      actions.setSubmitting(false);
      actions.resetForm()
    }
    catch{
      toast.error("not exist")
    }
  }
  const handleSearchByName = async(string,actions)=>{
    try{
      const prodacts = await prodactService.getAllProdacts(string)
      const data =await prodacts.data;
      const result = []
      for (let i=0;i<data.length;i++){
        if ((data[i].prodactDetails.name).includes(string)){
          result.push(data[i])
        }
      }
      setReasult(result)
      actions.setSubmitting(false);
      actions.resetForm()
    }
    catch{
      toast.error("not exist")
    }
  }
  const handleSearchByModel = async(string,actions)=>{
    try{
      const prodacts = await prodactService.getAllProdacts(string)
      const data =await prodacts.data;
      const result = []
      for (let i=0;i<data.length;i++){
        if ((data[i].prodactDetails.model).includes(string)){
          result.push(data[i])
        }
      }
      setReasult(result)
      actions.setSubmitting(false);
      actions.resetForm()
    }
    catch{
      toast.error("not exist")
    }
  }
  const handleSearchByProvider = async(string,actions)=>{
    try{
      const prodacts = await prodactService.getAllProdacts(string)
      const data =await prodacts.data;
      const result = []
      for (let i=0;i<data.length;i++){
        if ((data[i].provider.providerName).includes(string)){
          result.push(data[i])
        }
      }
      setReasult(result)
      actions.setSubmitting(false);
      actions.resetForm()
    }
    catch{
      toast.error("not exist")
    }
  }
  const initialValues = {
    barcode:"",
    name:"",
    model:"",
    provider:"",
  };

  return (
    <div className='container mt-5 w-100'>
    <Formik
      initialValues={initialValues}
    >
        {(formikProps) => (
      <Form>
      <div className="row mb-3"> 
        <h2>חיפוש לפי:</h2>
            <div className="col-md-3">
              <label htmlFor="barcode" className="form-label">  מק"ט:</label>
                <div className="input-group" dir="ltr">
                  <label className="input-group-text" htmlFor="barcode">
                    <BsSearch type="button" onClick={() => handleSearchByBarcode(formikProps.values.barcode, formikProps)}/>
                  </label>
                  <Field
                    type="search"
                    id="barcode"
                    name="barcode"
                    className="form-control"
                    onChange={(e) => {
                      setReasult([]);
                      formikProps.handleChange(e);
                    }}
                />

              </div>
        </div> 
        <div className="col-md-3">
              <label htmlFor="name" className="form-label">  שם:</label>
                <div className="input-group" dir="ltr">
                  <label className="input-group-text" htmlFor="name">
                    <BsSearch type="button" onClick={() => handleSearchByName(formikProps.values.name, formikProps)}/>
                  </label>                  
                  <Field
                    type="search"
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={(e) => {
                      setReasult([]);
                      formikProps.handleChange(e);
                    }}
                    autoComplete="given-name"
                />

              </div>
        </div>
        <div className="col-md-3">
              <label htmlFor="model" className="form-label">  דגם:</label>
                <div className="input-group" dir="ltr">
                  <label className="input-group-text" htmlFor="model">
                    <BsSearch type="button" onClick={() => handleSearchByModel(formikProps.values.model, formikProps)}/>
                  </label>
                  <Field
                    type="search"
                    id="model"
                    name="model"
                    className="form-control"
                    onChange={(e) => {
                      setReasult([]);
                      formikProps.handleChange(e);
                    }}
                />
 
              </div>
        </div>
        <div className="col-md-3">
              <label htmlFor="provider" className="form-label">  ספק:</label>
                <div className="input-group" dir="ltr">
                  <label className="input-group-text" htmlFor="provider">
                    <BsSearch type="button" onClick={() => handleSearchByProvider(formikProps.values.provider, formikProps)}/>
                  </label>
                  <Field
                    type="search"
                    id="provider"
                    name="provider"
                    className="form-control"
                    onChange={(e) => {
                      setReasult([]);
                      formikProps.handleChange(e);
                    }}
                />
               
              </div>
        </div>
      </div>  
      </Form>
        )} 
    </Formik>
     {result.length>0 && <ProdactTableInSearch prodacts={result}/>}
    </div>
  );
};

export default ProdactSearch;
