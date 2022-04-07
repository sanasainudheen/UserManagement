import {Filter,DefaultColumnFilter,SelectColumnFilter } from "./../../services/filters";
import UserDataService from "./../../services/UserService";
import React, { useEffect, useMemo} from "react";
import { useTable,useSortBy, useFilters  } from "react-table";

const ViewGroupUsers = (props) => {
    const [userList,setUserList]=React.useState([]);
    useEffect(() => {   
        retrieveUsersByGroupId();    
      }, []);
      const retrieveUsersByGroupId = () => { 
     
        UserDataService.getUsersByGroupId(props.location.state)   
         .then((response) => { 
            setUserList(response.data);  
         })
         .catch((e) => {
           console.log(e);
         });
     };
     const columns = useMemo(
        () => [
            {
                Header: "Group Name",
                accessor: "groupName",
                disableSortBy: true,
                Filter: SelectColumnFilter,              
                filter: 'includes' ,
                disableFilters: true,
              },
      
          {
            Header: "Full Name",
            accessor: "name",
            disableFilters: true,
          },
          {
            Header: "Email Id",
            accessor: "email",
            disableFilters: true,
          },
          {
            Header: "Contact",
            accessor: "phoneNumber",
            disableFilters: true,
           },
          {
            Header: "Job Title",
            accessor: "jobTitle",
            disableFilters: true,
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
        data: userList,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
      useFilters,
      useSortBy  
      );
      const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
      }
      const handleBack=()=>{
        props.history.push("/base/ViewGroups");       
      }
  return (
    <div className="list row AddUser">
 
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
    </div>
    <div className="row">
        <div className="col-md-2">
        <button type="button" className="btn btn-primary mt-2 " onClick={handleBack}>Back To List</button>

        </div>
    </div>
   
    </div>
  )
}

export default ViewGroupUsers