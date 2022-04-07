import React, { useState, useEffect, useMemo, useRef  } from "react";
import TaskService from "./../../services/TaskService";
import { useTable,useSortBy, useFilters  } from "react-table";
import { Button,Modal} from 'react-bootstrap';
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./../../services/filters";
import moment from 'moment';

const ViewTasks = () => {
    const [taskList, setTaskList] = useState([]);
    const [show, setShow] = React.useState(false);
    const [selStatus, setSelStatus] = React.useState("4");
    const[selTask,setSelTask]=React.useState();
    const tasksRef = useRef();
    tasksRef.current = taskList;
    useEffect(() => {   
        retrieveAllTasks();    
      }, []);
      const retrieveAllTasks = () => {    
          TaskService.getAllTasksByAdmin(0,1).then((response) => {
            setTaskList(response.data);    
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const  handleModalClose=()=>{  
        setShow(!show)  ;               
        }
        const  handleModal=(taskId)=>{  
            setSelTask(taskId);
            setShow(!show)  ;
            retrieveAllTasks(); 
            }
            const ChangeStatus=()=>{
                var data = {
                    taskId:selTask,
                  statusId:selStatus,
                  userId:localStorage.getItem("userId"),
                  createdOn:moment(new Date()).format('YYYY-MM-DD'),

                };        
            TaskService.updateUserStatus(data)
            .then((response) => {
              if (response.data.isSuccess) {
                  alert(response.data.message);    
                  retrieveAllTasks();        
                 handleModalClose();
              }
              else {
                  alert(response.data.errors);
              }
          })
               }   
      const columns = useMemo(
        () => [
      
          //{
           // Header: "Group Name",
           // accessor: "groupName",
           // disableFilters: true,
            // Filter: SelectColumnFilter,              
            // filter: 'includes' 
         // },
          {
            Header: "Task Name",
            accessor: "taskName",
            disableFilters: true,
          },
          {
            Header: "Task Description",
            accessor: "taskDescription",
            disableFilters: true,
          },
          {
            Header: "Start Date",
            accessor: "startDate",
            disableFilters: true,
           },
          {
            Header: "End Date",
            accessor: "endDate",
            disableFilters: true,
          },  
          {
            Header: "Status",
            accessor: "status",
            disableSortBy: true,
            Filter: SelectColumnFilter,              
            filter: 'includes' 
          },  
                
          {
            Header: "Actions",
            accessor: "actions",
            disableSortBy:true,
            disableFilters: true,
              Cell: (props) => {
                const rowIdx = props.row.id;               
                return (            
                <div>    
                  {tasksRef.current[rowIdx].status=="Completed" || tasksRef.current[rowIdx].status=="Done" || tasksRef.current[rowIdx].status=="Rejected"?(<div></div>):(
                  <button type="button" className="btn btn-link" onClick={()=>handleModal(tasksRef.current[rowIdx].taskId)}>Change Status</button>      )                        
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
        data: taskList,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
      useFilters,
      useSortBy  
      );
      const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
      }
  return (
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
      <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Select the status</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selStatus} onChange={e=>setSelStatus(e.currentTarget.value)}>  
        <option value="4">Done</option>
        <option value="5">Rejected</option>  
   </select> 
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>ChangeStatus()}>Save</Button>
            <Button onClick={()=>handleModalClose()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
    </div>
  )
}

export default ViewTasks