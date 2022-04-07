import  React, { useState } from "react";
import UserDataService from "./../../services/UserService";
import Button from '@mui/material/Button';
 import './../../Styles/Styles.css';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment';
const minDate=new Date();
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const CreateUser = (props) => {
  const [joinDate, setJoinDate] = useState(new Date());   
  const initialValues = {
    name:'',
    email:'',
    phoneNumber:'',
    jobTitle:'',
    joinDate:joinDate,
    userName:'',
    password:'',
    confirmPassword:''
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const passwordLength = /^.{6,}$/

  const validationSchema = Yup.object({
              name: Yup.string()
             .required("Required!")
             .max(50),
             email: Yup.string()
              .required("Required!").email('Invalid email format'),
              phoneNumber: Yup.string()
              .required("Required!").matches(phoneRegExp, 'Phone number is not valid'),
             jobTitle: Yup.string()
              .required("Required!"),
             joinDate: Yup.string()
              .required("Required!"),
              userName: Yup.string()
                .required("Required!")
                .max(600),
                password: Yup.string()
            .required("Required!").matches(passwordLength, 'Minimum 6 characters required!!'),
            confirmPassword: Yup
            .string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('password')], 'Password mismatch...')
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{      
      saveUser(values.name,values.email,values.phoneNumber,values.jobTitle,joinDate,values.userName,values.password,values.confirmPassword);
      resetForm();
     
    }
  })  
  const saveUser = (name,email,phoneNumber,jobTitle,joinDate,userName,password,confirmPassword) => {   
    var data = {
        name: name,
        email: email,
        phoneNumber:phoneNumber,
        jobTitle:jobTitle,      
        joinDate: moment(joinDate).format('YYYY-MM-DD'),
        userName: userName,
        password:password,
        confirmPassword:confirmPassword,
        isBlock:"0"
    };
if(joinDate !== null){
     UserDataService.create(data)
       .then((response) => {
         if (response.data.isSuccess) {
           setJoinDate(new Date());
           toast.success(response.data.message,{position:toast.POSITION.TOP_RIGHT});    

        }
         else {
          toast.error(response.data.message,{position:toast.POSITION.TOP_RIGHT});     
        }
     })
}
  }; 
  return (
    <div  >
             <div className="CreateUser">  
         <form autoComplete="off" onSubmit={formik.handleSubmit}>      
  <div className="row">
        <div className="form-group col-10" >
         
          <input
            type="text"
            className="form-control"
            id="name"
           placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}           
            name="name"
          />
          {formik.errors.name ? 
      <div className="myDiv">{formik.errors.name}</div> : null}
        </div>
        </div>
<div className="row">
        <div className="col-5">
          <label htmlFor="email"></label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
           
            name="email"
          />
          {formik.errors.email ? 
      <div className="myDiv">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group col-5">
          <label htmlFor="phoneNumber"></label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Contact Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber ? 
      <div className="myDiv">{formik.errors.phoneNumber}</div> : null}
        </div>
        </div>
        <div className="row">
        <div className="col-5 ">
          <label htmlFor="jobTitle"></label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            placeholder="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            name="jobTitle"
          />
          {formik.errors.jobTitle ? 
      <div className="myDiv">{formik.errors.jobTitle}</div> : null}
        </div>
         <div className=" form-group col-5">         
    <label htmlFor="joinDate"></label>
<DatePicker className="form-control marginTop" id="joinDate" selected={joinDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setJoinDate(date)}  minDate={minDate}/>
      {joinDate ? 
       null:<div className="myDiv">Join Date Is Required</div>}
    </div>
        </div>  
        <div className="row">
        <div className="form-group col-10">
          <label htmlFor="userName"></label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="UserName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            name="userName"
          />
          {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}
        </div>
        </div>
        <div className="row">
        <div className="col-5">
          <label htmlFor="password"></label>
          <input
            type="password"
            className="form-control"
            id="password"          
            placeholder="Password"  
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />           
          {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group col-5">
          <label htmlFor="confirmPassword"></label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"  
            placeholder="Retype Password"          
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            name="confirmPassword"
          />           
          {formik.errors.confirmPassword ? 
      <div className="myDiv">{formik.errors.confirmPassword}</div> : null}
        </div>
        </div>      
        <Button type="submit"                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >                 
                  <span>Register</span>
                </Button>                  
         </form>
        </div>  
    </div>
  );
};

export default CreateUser;