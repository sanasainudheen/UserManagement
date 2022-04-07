
import React from "react";
import UserService from '../../services/UserService';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import './../../Styles/Styles.css';
import ResetSubPage from "./ResetSubPage";
import { toast } from "react-toastify";

 const ResetPassword = () => {   
    const[showPage,setShowPage]=React.useState(false);
   
    const initialValues = {
        userName:''
      }
      const validationSchema = Yup.object({
        userName: Yup.string()
       .required("Username is required!")
       .max(50)            
});
const formik = useFormik({
initialValues: initialValues,
validationSchema: validationSchema,
onSubmit: (values) => {      
searchUser(values.userName)
},
});
    const searchUser = (userName) => {       
    
        UserService.searchUserByName(userName)
          .then((response) => {
            if (response.data) {
                if(response.data.isSuccess==true){    
              setShowPage(true);
                }
                else {
                    toast.warning(response.data.message);
                    setShowPage(false);
                }       
            }
           
        })
      
      }; 
      const handleDisplay=(data)=>{
setShowPage(data);
      }
  return (
    <div >  
        <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit}>      
  <div className="row">
        <div className="col-3" >
          <label className="label-style" htmlFor="userName"></label>
          <input
            type="text"
            className="form-control"
            id="userName"
           placeholder='Enter the Username'
            value={formik.values.userName}
            onChange={formik.handleChange}
            name="userName"
          />
          {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}
        </div>
        <div className="col-3">
<button type="submit"  className="btn btn-secondary" >Search User</button>
</div>
        </div>
        
        

         </form>
         {showPage && <ResetSubPage userName={formik.values.userName} onHandleDisplay={handleDisplay}/>}
        </div>  
    </div>
  )
}
export default ResetPassword;
