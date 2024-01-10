// LoginForm.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useAuth} from "../context/auth.context"
import {useNavigate } from "react-router-dom";
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  workerNum: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  workerNum: '',
  password: '',
};

const LoginForm = () => {
  const {login} =useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try{  
      login(values);
      navigate("/");
    }catch({ response }){
      if (response && response.status === 400) {
        console.log(response.data);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className='container mt-5 w-25 '>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="workerNum" className="form-label">
              Worker Number
            </label>
            <Field
              type="text"
              id="workerNum"
              name="workerNum"
              className={`form-control ${
                ErrorMessage('workerNum') ? 'is-invalid' : ''
              }`}
            />
            <ErrorMessage name="workerNum" component="div" className="invalid-feedback" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className={`form-control ${
                ErrorMessage('password') ? 'is-invalid' : ''
              }`}
            />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
