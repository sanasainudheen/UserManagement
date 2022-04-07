import React, { useState, useEffect, useMemo, useRef  } from "react";
import UserDataService from "./../../services/UserService";
import { useTable,useSortBy, useFilters  } from "react-table";
import {withRouter} from 'react-router-dom'
import {Link } from "react-router-dom";
import {Filter,DefaultColumnFilter} from "./../../services/filters";
import { toast } from "react-toastify";



const UserList = (props) => {
   
  const [userList, setUserList] = useState([]);
  const[showModalPopup,setShowModalPopup]=useState(false);  
  const[rowId,setRowId]=useState(0);
  const usersRef = useRef();
  usersRef.current = userList;
  useEffect(() => {   
    retrieveUsers();    
  }, []);
  function isShowPopup (status)  {  
    setShowModalPopup(status);  
  }; 
 
function handleClose ()  {  
  isShowPopup(false); 
}  

const deleteUser = (rowIndex) => {
  if (window.confirm('Are you sure you wish to delete this user?'))
  UserDataService.remove(rowIndex)
    .then((response) => {
      if (response.data.isSuccess) {       
        props.history.push("/base/RegisteredUsers");
      let newUsers = [...usersRef.current];
      newUsers.splice(rowIndex, 1);
      setUserList(newUsers);     
      refreshList();    
    }
    else {
    
        toast.error(response.data.message);
    }
  });
}
const blockUser = (rowIndex) => {   
  if (window.confirm('Are you sure you wish to block this user?'))
  UserDataService.block(rowIndex,1)
    .then((response) => {
      if (response.data.isSuccess) {
          toast.success(response.data.message, {autoClose:3000});          
          retrieveUsers();  
          props.history.push("/base/RegisteredUsers");   
      }
      else {
          toast.error("response.data.errors");
      }
  })    
}; 
const unBlockUser = (rowIndex) => {   
  if (window.confirm('Are you sure you wish to unblock this user?'))
  UserDataService.block(rowIndex,0)
    .then((response) => {
      if (response.data.isSuccess) {
          toast.success(response.data.message, {autoClose:3000});    
          retrieveUsers();        
          props.history.push("/base/RegisteredUsers");   
      }
      else {
          toast.error("response.data.errors");
      }
  })    
};
  const retrieveUsers = () => {    
    UserDataService.getAll() .then((response) => {
      setUserList(response.data);    
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveUsers();
  }; 
  
  const columns = useMemo(
    () => [
  
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "EmailId",
        accessor: "email",
      },
      {
        Header: "Username",
        accessor: "userName",
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
 pathname: "/EditUser", 
 state: usersRef.current[rowIdx].id
}}>
<button type="button" className="btn btn-link">Edit</button>
</Link>  
{usersRef.current[rowIdx].isBlock=="0"?
           ( <button type="button" className="btn btn-link" onClick={() => blockUser(usersRef.current[rowIdx].id)}>Block</button>)
           :
           ( <button type="button" className="btn btn-link" onClick={() => unBlockUser(usersRef.current[rowIdx].id)}>UnBlock</button>)
}
          
           <button type="button" className="btn btn-link" onClick={() => deleteUser(usersRef.current[rowIdx].id)}>Delete</button>
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
    data: userList,
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
    
{userList?(
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
<div>No Users Found</div>
    )
    }
  </div>
);
};
export default withRouter(UserList);