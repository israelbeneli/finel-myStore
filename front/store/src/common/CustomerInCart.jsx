import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import customerService from '../services/customerservice';
import customerValidationSchema from '../components/utils/validation/customerValidate';
import { BsSearch } from 'react-icons/bs';
import { useShoppingBasket } from '../context/ShoppingBasketContext';
import { toast } from 'react-toastify';
const CustomerInCart = ({customer,setCustomer})=>{
    const [customerDetails , setCustomerDetails]= useState(null);
    const {basket}=useShoppingBasket();
    const handleSearch = async (values, actions) => {
      try {
        const response = await customerService.getCustomerWithId(values.israeliId);
        const data = response.data;
        setCustomerDetails(data);
        actions.setValues(data);
        basket.customer=data;
        setCustomer(data);
      } catch (error) {
        toast.error('Error fetching customer data:', error);
      }
    };
    const handleFormSubmit = async(values, actions) => {
      const customerUpdate = {
        israeliId:values.israeliId,  
        name:{
              first:values.name.first,
              last:values.name.last
          },

          phone:values.phone,
          email:values.email,
          address:{
              city:values.address.city,
              street:values.address.street,
              houseNumber:values.address.houseNumber
          }
      }
      await customerService.customerChangeDetails(values.israeliId,customerUpdate)
      setCustomerDetails(null);
      setCustomer(customerUpdate);
      basket.customer=customerUpdate;
      actions.setSubmitting(false);
    };
    return(<>
    <div className='container w-75'>
    <Formik
      initialValues={{
        israeliId:"",
        name: {first:"",
              last:""},
        phone: '',
        email: '',
        address:{city:"",
                street:"",
                houseNumber:""},
      }}
      validationSchema={customerValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {(formikProps) => (
        <Form>     
            <div>
            {!basket.customer && <>{!customerDetails && <>
            <div className="row mb-2 w-25">
                <label htmlFor="israeliId" className="form-label" id="israeliId">תעודת זהות</label>
                <div className="input-group" dir="ltr">
                    <label className="input-group-text" htmlFor="israeliIdBut">
                        <BsSearch type="button" id="israeliIdBut" onClick={() => handleSearch(formikProps.values, formikProps)}/>
                    </label>
                    
                    <Field
                        type="text"
                        id="israeliId"
                        name="israeliId"
                        className="form-control"
                        onChange={(e) => {
                            // Reset employee data on employee number change
                            setCustomerDetails(null);
                            formikProps.handleChange(e);
                            setCustomer(null)
                        }}
            />      </div>
            </div>
            </>}
        {customerDetails && ( 
        <>
            
            <div className="row mb-3">
                <div className="col-md-4">תעודת זהות : {customerDetails.israeliId}</div>
                <h5>פרטים אישיים</h5>
                <div className="col-md-3">
                <label htmlFor="phone" className="form-label">מספר טלפון:</label>
                <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                />
                <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>
                <div className="col-md-3">
                <label htmlFor="name.first" className="form-label">שם פרטי:</label>
                <Field
                    type="text"
                    id="name.first"
                    name="name.first"
                    className="form-control"
                />
                <ErrorMessage name="name.first" component="div" className="text-danger" />
                </div>    
                <div className="col-md-3">
                <label htmlFor="name.last" className="form-label">שם משפחה:</label>
                <Field
                    type="text"
                    id="name.last"
                    name="name.last"
                    className="form-control"
                />
                <ErrorMessage name="name.last" component="div" className="text-danger" />
                </div>  
                <div className="col-md-3">
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
            
                <div className="col m-1">
                    <button className="btn btn-primary m-2" type="submit" disabled={formikProps.isSubmitting}>
                        שמור שינויים
                    </button>
                </div>
            </div>
        </>
        )}</>}
        </div>
        </Form>
        )}
    </Formik>
    </div> 
    </>)    
}
export default CustomerInCart