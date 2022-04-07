import AuthService from "../../../services/AuthService";
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import './../../../Styles/Styles.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { toast } from "react-toastify";
import DefaultLayout from "../../../layout/DefaultLayout";


const Login = (props) => {
  const [message,setMessage]=useState("");
  const initialValues = {
    userName:'',
    password:''
  }
  const validationSchema=()=> {
    return Yup.object().shape({
      userName: Yup.string().required("Please enter username!!!"),
      password: Yup.string().required("Please enter password!!!"),
    });
  }
  const saveUser=(userName, password)=>{
    var data = {
      userName: userName,
      password: password
  };
 AuthService.login(userName, password) .then((response) => {   
  if (response.data.isSuccess) {
    localStorage.clear();
    localStorage.setItem("token", response.data.message);
    localStorage.setItem("role",response.data.roleName);
    localStorage.setItem("userId",response.data.userId);
    localStorage.setItem("name", response.data.name);
  props.history.push('/');

  }
  else {
    localStorage.clear();
    toast.warning(response.data.message, {position: toast.POSITION.TOP_RIGHT});
}
 });
}
 
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{
      saveUser(values.userName,values.password);
      resetForm();
    }
  })  

  return (
    <div>
 
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit} autoComplete="off">
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput                       
                        id="userName"                        
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        name="userName"
                      placeholder="Username" autoComplete="username" />  
                    </CInputGroup>
                    <p> {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                         id="password"                        
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />     
                    </CInputGroup>
                    <p> {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton  type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                   
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                    {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                    
                  </div>
                </div>
              )}
               </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  

    </div>
  )
}

export default Login
