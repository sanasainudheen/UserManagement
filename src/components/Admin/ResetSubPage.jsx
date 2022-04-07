import React from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import './../../Styles/Styles.css';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';

 const ResetSubPage = (props) => {
    const passwordLength = /^.{6,}$/
     const initialValues={
         oldPassword:'',
         newPassword:'',
         confirmPassword:''
     }
     const validationSchema = Yup.object({
        oldPassword: Yup.string()
        .required("Enter the old Password!!!").matches(passwordLength, 'Minimum 6 characters required!!'),        
        newPassword: Yup.string()
       .required("Enter the new Password!!!").matches(passwordLength, 'Minimum 6 characters required!!'),       
       confirmPassword: Yup
            .string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.')      
});
const formik = useFormik({
initialValues: initialValues,
validationSchema: validationSchema,
onSubmit: (values,{resetForm}) => {      
resetPassword(values.oldPassword, values.newPassword)
resetForm();
},
});
const resetPassword=(oldPassword, newPassword)=>{    
    UserService.resetPassword(props.userName,oldPassword,newPassword)
    .then((response) => {
      if (response.data) {
          if(response.data.isSuccess==true){               
      toast.success(response.data.message)   
      props.onHandleDisplay(false)  ;     
          }
          else {
              toast.error(response.data.message);             
          }       
      }
})
}
const handleCancel=()=>{
    props.onHandleDisplay(false)  ; 
}
  return (

    <div >
          <form onSubmit={formik.handleSubmit}>    
          <div className='row'>
            <div className='col-md-4'>
                <label htmlFor='oldPassword'></label>                
                </div>
                </div>
                <div className='row'>
            <div className='col-md-4'>
            <input
            type="password"
            className="form-control"
            id="oldPassword"
           placeholder='Enter the old password'
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            name="oldPassword"
          />
          {formik.errors.oldPassword ? 
      <div className="myDiv">{formik.errors.oldPassword}</div> : null}
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <label htmlFor='newPassword'></label>                
                </div>
                </div>
                <div className='row'>
            <div className='col-md-4'>
            <input
            type="password"
            className="form-control"
            id="newPassword"
           placeholder='Enter the new password'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            name="newPassword"
          />
          {formik.errors.newPassword ? 
      <div className="myDiv">{formik.errors.newPassword}</div> : null}
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <label htmlFor='confirmPassword'></label>                
                </div>
                </div>
                <div className='row'>
            <div className='col-md-4'>
            <input
            type="password"
            className="form-control"
            id="confirmPassword"
           placeholder='Retype the password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            name="confirmPassword"
          />
          {formik.errors.confirmPassword ? 
      <div className="myDiv">{formik.errors.confirmPassword}</div> : null}
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <label htmlFor='Reset'></label>                
                </div>
                </div>
                <div className='row'>
            <div className='col-md-1'>
               <button type='submit' className='btn btn-primary'>Reset</button>
              
                </div>
                <div className='col-md-2'>
               <button type='button' onClick={handleCancel} className='btn btn-primary'>Cancel</button>
              
                </div>
        </div>
        </form>
    </div>
  )
}
export default ResetSubPage;
