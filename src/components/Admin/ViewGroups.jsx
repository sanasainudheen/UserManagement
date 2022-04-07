import React, { useState, useEffect, useMemo, useRef  } from "react";
import TaskService from "./../../services/TaskService";
import { useTable,useSortBy, useFilters  } from "react-table";
import {Link } from "react-router-dom";
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./../../services/filters";
import { toast } from "react-toastify";

 const ViewGroups = (props) => {
    const [groupList, setGroupList] = useState([]);
    const[rowId,setRowId]=useState(0);
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
    
      const enableGroup=(rowIndex)=>{
        if (window.confirm('Are you sure you wish to enable the group?'))
        TaskService.enableDisable(rowIndex,1)
          .then((response) => {
            if (response.data.isSuccess) {
                toast.success(response.data.message);          
                retrieveGroups();  
                props.history.push("/base/ViewGroups");   
            }
            else {
                toast.error("response.data.errors");
            }
        })    
      }
      const disableGroup=(rowIndex)=>{
        if (window.confirm('Are you sure you wish to disable the group?'))
        TaskService.enableDisable(rowIndex,0)
          .then((response) => {
            if (response.data.isSuccess) {
                toast.success(response.data.message);          
                retrieveGroups();  
                props.history.push("/base/ViewGroups");   
            }
            else {
                toast.error("response.data.errors");
            }
        })    
          
    }
      const columns = useMemo(
        () => [
      
          {
            Header: "Group Name",
            accessor: "groupName",
            disableSortBy: true,
            Filter: SelectColumnFilter,              
            filter: 'includes' 
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
     
     <Link to={{ 
     pathname: "/ViewGroupUsers", 
     state: groupsRef.current[rowIdx].groupId
    }}>
    <button type="button" className="btn btn-link">View Users</button>
    </Link>  
    {groupsRef.current[rowIdx].isActive=="1"?
               ( <button type="button" className="btn btn-link" onClick={() => disableGroup(groupsRef.current[rowIdx].groupId)}>Disable</button>)
               :
               ( <button type="button" className="btn btn-link" onClick={() => enableGroup(groupsRef.current[rowIdx].groupId)}>Enable</button>)
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
  </div>
  )
}
export default ViewGroups;
