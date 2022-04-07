import  React, { useState} from "react";
import TaskService from "./../../services/TaskService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
 import './../../Styles/Styles.css';
import { useFormik } from 'formik'
import moment from 'moment';
import * as Yup from 'yup'
import { toast } from "react-toastify";

const minDate=new Date();
const CreateTask = () => {  
  const initialValues = {
    taskName:'',
    taskDescription: '',
    startDate: '',
    endDate:''
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const validationSchema = Yup.object({
              taskName: Yup.string()
             .required("Title is required!")
             .max(50),
             taskDescription: Yup.string()
              .required("Description is required!"),                    
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{      
      saveTask(values.taskName,values.taskDescription,startDate,endDate);
      resetForm();
    }
  })  
 


  const saveTask = (taskName,taskDescription,startDate,endDate) => {    
    var data = {
        taskName: taskName,
        taskDescription: taskDescription,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate:moment(endDate).format('YYYY-MM-DD'),      
        statusId:"1",
        createdDate:moment(new Date()).format('YYYY-MM-DD'),  
        isActive:"1",

    };
if(startDate !==null && endDate !==null){
    TaskService.createTask(data)
      .then((response) => {
        if (response.data.isSuccess) {
            toast.success(response.data.message);          
        
        }
        else {
            toast.error(response.data.errors);
        }
    })
  }
  };

  return (
    <div>
           <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit}>      
  <div className="row">
        <div className="form-group col-6" >
          <label htmlFor="taskName">Title</label>
          <input
            type="text"
            className="form-control"
            id="taskName"
           
            value={formik.values.taskName}
            onChange={formik.handleChange}
            name="taskName"
          />
          {formik.errors.taskName ? 
      <div className="myDiv">{formik.errors.taskName}</div> : null}
        </div>
</div>
<div className="row">
        <div className="form-group col-6">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="taskDescription"
            
            value={formik.values.taskDescription}
            onChange={formik.handleChange}
            name="taskDescription"          />
          {formik.errors.taskDescription ? 
      <div className="myDiv">{formik.errors.taskDescription}</div> : null}
        </div>
        </div>
        <div className="row">       
        <div className="col-md-6">
    <label htmlFor="sdate">Start Date</label>
<DatePicker className="form-control" selected={startDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setStartDate(date)}  minDate={minDate}/>
        {startDate ? 
       null:<div className="myDiv">Start Date Is Required</div>}
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <label htmlFor="edate">End Date</label>
 <DatePicker className="form-control" selected={endDate}  minDate={minDate}
      onChange={date=>setEndDate(date)} dateFormat='dd/MMM/yyyy'/>
      
        {endDate ? 
       null:<div className="myDiv">End Date Is Required</div>}
    </div>
       </div>
         
      
        
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Create Task</span>
                </Button>        
         
         </form>
        </div>        
        </div>
  );
};

export default CreateTask;