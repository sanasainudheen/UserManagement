import React, { useState, useEffect, useMemo, useRef  } from "react";
import TaskService from "./../../services/TaskService";
import { useTable,useSortBy, useFilters  } from "react-table";
import {Filter,DefaultColumnFilter} from "./../../services/filters";
import { Button,Modal} from 'react-bootstrap';  
import UserService from "../../services/UserService";
import './../../Styles/Styles.css';
import { toast } from "react-toastify";

const AssignTaskUsers = () => {
    const [groupList, setGroupList] = useState([]);
    const[rowId,setRowId]=useState(0);
    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selTask, setSelTask] = React.useState("");
    const [selUser, setSelUser] = React.useState("");
    const[note,setNote]=React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [groupValue, setGroupValue] = React.useState("");
    const groupsRef = useRef();
    groupsRef.current = groupList;
    useEffect(() => {   
        retrieveGroups();    
      }, []);
      const retrieveGroups = () => {    
          TaskService.getAllGroups().then((response) => {
            setGroupList(response.data);    
          })
          .catch((e) => {
            console.log(e);
          });
      };    
      const  handleModalClose=()=>{  
        setShow(!show)  ;               
        }
        const  handleModalClose1=()=>{  
            setShow1(!show1)  ;               
            }
    
    const  handleModal=(groupId)=>{  
        setGroupValue(groupId);
        setShow(!show)  ;
          getTasks(); 
        }
        const getTasks=()=>{
            TaskService.getAllPendingTasks()
            .then((response) => {
               
                const TaskList = [{taskId: '-1', taskName: 'Please Select A Task...'}, ...response.data];
                setTasks(TaskList);
               
        })
            .catch((e) => {
            });       
        }
        




        const  handleModal1=(groupId)=>{  
            setGroupValue(groupId);
            setShow1(!show)  ;
              getUsers(); 
            }
            const getUsers=()=>{
                UserService.getTheUsers()
                .then((response) => {
                   
                    const userList = [{id: '-1', name: 'Please Select A User...'}, ...response.data];
                    setUsers(userList);                   
            })
                .catch((e) => {
                });       
            }
        const AssignTask=()=>{
            var data = {
                GroupId:groupValue,
        TaskId:selTask,
        isActive:"1",
        Attachment: "Doc"+groupValue+"_"+selTask+"."+selectedFile.name.split('.').pop() ,
        Note:note
            };
          
          TaskService.AssignTaskToGroup(data)
           .then((response) => {
               if (response.data.isSuccess) {
                   toast.success(response.data.message)
                  onFileUpload();
                handleModalClose();                
            } 
                else{               
                   toast.error(response.data.message)
             }
              })
           }
           const onFileUpload = () => {
            const formData = new FormData();
      var fileExtension = selectedFile.name.split('.').pop();
     
      formData.append(
        "myFile",
        selectedFile,
        "Doc"+groupValue+"_"+selTask+"."+fileExtension          
      );     
          TaskService.uploadDoc(formData) .then(          
           (response) => {
              console.log("success");
            }, () => {
              console.log("fail");
            });
         
       };   
       const AssignUser=()=>{
        var data = {
            GroupId:groupValue,
    UserId:selUser,
    isActive:"1"   
        };
    
      TaskService.AssignUserToGroup(data)
       .then((response) => {
           if (response.data.isSuccess) {
               toast.success(response.data.message)             
            handleModalClose1();                
        } 
            else{               
               toast.error(response.data.message)
         }
          })
       }
      const columns = useMemo(
        () => [
      
          {
            Header: "Group Name",
            accessor: "groupName",
          },
          {
            Header: "Description",
            accessor: "description",
            disableFilters: true,
          },
          {
            Header: "Members",
            accessor: "noOfMembers",
            disableFilters: true,
           },
          {
            Header: "Created Date",
            accessor: "createdDate",
            disableFilters: true,
          },         
        {
          Header: "Actions",
          accessor: "actions",
          disableSortBy:true,
          disableFilters: true,
            Cell: (props) => {
              const rowIdx = props.row.id;
              setRowId(props.row.id);
              return (            
              <div>      
    
    {groupsRef.current[rowIdx].isActive=="1"?
  (<div> <button type="button" className="btn btn-link" onClick={()=>handleModal(groupsRef.current[rowIdx].groupId)}>Assign Tasks</button>
  <button type="button" className="btn btn-link" onClick={() => handleModal1(groupsRef.current[rowIdx].groupId)}>Assign Users</button>
  </div>)
         :
         (<div className="highlight" >Blocked</div>)
}    
              
              </div>
            );
            },
          },
        ],
        []
      );
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: groupList,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
      useFilters,
      useSortBy  
      );
      const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
      }
  return (
    <div className="list row AddUser">
    
{groupList?(
    <div className="col-md-12 list">
      <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  {generateSortingIndicator(column)}
                </div>
                <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>):
    (
<div>No Groups Found</div>
    )
    }
       <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Select a Task</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selTask} onChange={e=>setSelTask(e.currentTarget.value)}>
   {
       tasks.map(({taskId,taskName})=>(
           <option
           key={taskId} value={taskId}>{taskName}</option>
       ))
   }
   </select>
   <div>
     <label>Enter Note:</label>
   <textarea className="form-control" placeholder="Note"  onChange={(e)=>{setNote(e.target.value)}}></textarea>
   </div>
   <div>
     <label></label>
     <br/>
                <input type="file" onChange={(e)=>{ setSelectedFile(e.target.files[0]);}} />
               
            </div>
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>AssignTask()}>Save</Button>
            <Button onClick={()=>handleModalClose()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  

        
        <Modal show={show1} onHide={()=>handleModalClose1()}>  
          <Modal.Header closeButton>Select a User</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selUser} onChange={e=>setSelUser(e.currentTarget.value)}>
   {
       users.map(({id,name})=>(
           <option
           key={id} value={id}>{name}</option>
       ))
   }
   </select>   
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>AssignUser()}>Save</Button>
            <Button onClick={()=>handleModalClose1()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
  </div>
  )
}
export default AssignTaskUsers;
