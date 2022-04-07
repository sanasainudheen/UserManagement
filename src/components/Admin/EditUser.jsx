import React, { useState,useEffect } from "react";
import UserDataService from "./../../services/UserService";
import moment, { parseZone } from 'moment';
const minDate=new Date();
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './../../Styles/Styles.css';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { toast } from "react-toastify";


const EditUser = (props) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   const initialUserState = {
    id: null,
    name:"",
    email: "",
    phoneNumber:"",
    jobTitle:"",
    joinDate:"",
  };
  const [user, setUser] = useState(initialUserState);
  const [joinDate, setJoinDate] = useState(new Date());    
  useEffect(() => {   
    retrieveUserDetails();    
  }, []);
  const validationSchema = Yup.object({
            name : Yup.string()
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
});
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: values => {      
     updateUser(values.name,values.email,values.phoneNumber,values.jobTitle,joinDate)
    },
}); 
   const retrieveUserDetails = () => { 
     
     UserDataService.getUserById(props.location.state)   
      .then((response) => { 
        setUser(response.data);    
        setJoinDate(new Date(response.data.joinDate));
         
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateUser = (name,email,phoneNumber,jobTitle,joinDate) => {   
    var data = {
        name: name,
        email: email,
        phoneNumber:phoneNumber,
        jobTitle:jobTitle,
        joinDate:moment(joinDate).format('YYYY-MM-DD'),
        userName: '',
        password:'',
        confirmPassword:'',
        isBlock:"0"
    };   
    if(joinDate !== null){
    UserDataService.update(props.location.state,data)
      .then((response) => {
        if (response.data.isSuccess) {
            toast.success(response.data.message);           
            props.history.push("/base/RegisteredUsers");       
      
        }
        else {
            toast.error(response.data.errors);
        }
    })
  }
  }; 
const cancelEdit=()=>{
  props.history.push("/base/RegisteredUsers");       
}
  return (
    <div >  
        <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit} autoComplete="off">      
  <div className="row">
        <div className="form-group col-10" >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
           
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
          {formik.errors.name ? 
      <div className="myDiv">{formik.errors.name}</div> : null}
        </div>
        </div>
<div className="row">
        <div className="form-group col-5">
          <label htmlFor="email">Email Id</label>
          <input
            type="text"
            className="form-control"
            id="email"            
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
          />
          {formik.errors.email ? 
      <div className="myDiv">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group col-5">
          <label htmlFor="phoneNumber">Contact No</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"           
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
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"          
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            name="jobTitle"
          />
          {formik.errors.jobTitle ? 
      <div className="myDiv">{formik.errors.jobTitle}</div> : null}
        </div>        
        </div>  
          <button type="submit" className="btn btn-primary me-4 mt-2" >Update</button>
          <button type="button" className="btn btn-primary mt-2 " onClick={cancelEdit}>Cancel</button>
         </form>
        </div>  
    </div>
  );
};

export default EditUser;