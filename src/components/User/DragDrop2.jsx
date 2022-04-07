//import "./styles.css";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskService from "../../services/TaskService";


export default function App() {
    const [groupTaskList, setGroupTaskList] = useState([]);
    React.useEffect(()=>{
        async function GetGroupTasksByUser(){
            TaskService.GetDoneGroupTasksByUser(localStorage.getItem("userId"),"0","3") .then((response) => {              
                setGroupTaskList(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }    
      
        GetGroupTasksByUser();
    },[]);


  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(groupTaskList);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setGroupTaskList(tempData);
  };
  return (
    <div className="App mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table borderd">
          <thead>
            <tr>
              <th />
              <th>Group Name</th>
              <th>Task</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {groupTaskList?.map((user, index) => (
                  <Draggable
                    key={user.taskName}
                    draggableId={user.taskName}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps}> = </td>
                        <td>{user.groupName}</td>
                        <td>{user.taskName}</td>
                        <td>{user.status}</td>
                       
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}