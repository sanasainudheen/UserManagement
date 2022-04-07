import React, { useState, useMemo,useRef } from "react";
import { useTable,useSortBy, useFilters } from "react-table";
import TaskService from "../../services/TaskService";
import {Link } from "react-router-dom";
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./../../services/filters";

const ViewGroupTasks=()=>{
    const [groupTaskList, setGroupTaskList] = useState([]);
    const tasksRef = useRef();
    tasksRef.current = groupTaskList;
    React.useEffect(()=>{
        async function GetGroupTasksByUser(){
           // string userId=localStorage.getItem("userId")
            TaskService.GetGroupTasksByUser(localStorage.getItem("userId"),"0","1") .then((response) => {              
                setGroupTaskList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }    
      
        GetGroupTasksByUser();
    },[]);
    const generateSortingIndicator = column => {
      return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
    }
   
    const columns = useMemo(
        () => [
      
          {
            Header: "Group Name",
            accessor: "groupName",
          },
          {
            Header: "Task",
            accessor: "taskName",
            disableFilters:true,
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
            disableFilters:true,
              Cell: (props) => {
                const rowIdx = props.row.id;
               
                return (          
                  
                <div>  
                <Link to={{  pathname: "/TaskDetails",  state: tasksRef.current[rowIdx].taskId}}>
                    <button type="button" className="btn btn-link">View Details</button>
                </Link>  
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
        data: groupTaskList,
        defaultColumn: { Filter: DefaultColumnFilter },
       
      },
      useFilters,
      useSortBy  
      );
     
   

    return(
        <div  className="col-md-12">
          
        <table
             className="table table-striped table-bordered"
             {...getTableProps()} >
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
          
           </div> 
    )
}
export default ViewGroupTasks;