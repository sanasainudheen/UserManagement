import React, { useState} from "react";
import TaskService from "./../../services/TaskService";
import './../../Styles/Styles.css';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button';
const minDate=new Date();
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from "react-toastify";


const CreateGroup = (props) => {
  const [createdDate, setCreatedDate] = useState(new Date());    
  const initialValues = {
    groupName:'',
    description:'',
    noOfMembers:'',    
    createdDate:''
  }
  const validationSchema = Yup.object({
              groupName: Yup.string()
             .required("Enter Group Name!")
             .max(50),
             description: Yup.string()
              .required("Enter the Description!"),
              noOfMembers: Yup.string()
              .required("Enter the No.of Members!"),           
           //  createdDate: Yup.string()
            //  .required("Enter The Created Date!"),             
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{
      saveUser(values.groupName,values.description,values.noOfMembers,createdDate);
      resetForm();
    }
  })  
  const saveUser = (groupName,description,noOfMembers,createdDate) => {   
    var data = {
        groupName: groupName,
        description: description,
        noOfMembers:noOfMembers,          
        createdDate: moment(new Date()).format('YYYY-MM-DD'),
      isActive:"1"
    };

     TaskService.CreateGroup(data)
       .then((response) => {
         if (response.data.isSuccess) {
             toast.success(response.data.message);  
        }
         else {
             toast.error(response.data.errors);
        }
     })
  }; 
  return (
    <div  >
             <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit} autoComplete="off">      
  <div className="row">
        <div className="form-group col-8" >
         
          <input
            type="text"
            className="form-control"
            id="groupName"
           placeholder="Group Name"
            value={formik.values.groupName}
            onChange={formik.handleChange}
            name="groupName"
          />
          {formik.errors.groupName ? 
      <div className="myDiv">{formik.errors.groupName}</div> : null}
        </div>
        </div>
<div className="row">
        <div className="col-8">
          <label htmlFor="description"></label>
          <textarea
         className="form-control"
         id="description"
         placeholder="Description"
         value={formik.values.description}
         onChange={formik.handleChange}
         name="description"
        />         
          {formik.errors.description ? 
      <div className="myDiv">{formik.errors.description}</div> : null}
        </div>
        </div>
        <div className="row">
        <div className="form-group col-8">
          <label htmlFor="noOfMembers"></label>
          <input
            type="text"
            className="form-control"
            id="noOfMembers"
            placeholder="No Of Members"
            value={formik.values.noOfMembers}
            onChange={formik.handleChange}
            name="noOfMembers"
          />
          {formik.errors.noOfMembers ? 
      <div className="myDiv">{formik.errors.noOfMembers}</div> : null}
        </div>
        </div>
        {/* <div className="row">       
         <div className=" form-group col-8">         
    <label htmlFor="createdDate"></label>
<DatePicker className="form-control marginTop" id="createdDate" selected={createdDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setCreatedDate(date)}  minDate={minDate}/>
      {createdDate ? 
       null:<div className="myDiv">Created Date Is Required</div>}
    </div>
        </div>   */}
     
          
        <Button type="submit"                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >                 
                  <span>Create Group</span>
                </Button>                  
         </form>
        </div>  
    </div>
  );
};

export default CreateGroup;