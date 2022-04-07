import http from "./http-common";
import IGroupData from "../types/Group";
import ITaskData from "../types/Task";
import IUserGroupData from "../types/UserGroup";
import IUserGroupTaskData from "../types/UserGroupTask";
import IAssignUserData from "../types/AssignUser";


 const getAllGroups = () => { 
      return http.get<Array<IGroupData>>("/Task/GetAllGroups");
 };


 const CreateGroup = (data: IGroupData) => {
   return http.post<IGroupData>("/Task/CreateGroup", data);
 };
 const createTask = (data: ITaskData) => {
  return http.post<ITaskData>("/Task/CreateTask", data);
};
const createUserGroup = (data: IUserGroupData) => {
  return http.post<IUserGroupData>("/Task/CreateUserGroup", data);
};
const createUserGroupTask = (data: IUserGroupTaskData) => {
  return http.post<IUserGroupTaskData>("/Task/CreateUserGroupTask", data);
};
const uploadDoc = (formData:any) => {
  return http.post("/FileUploadApi", formData);
};
const getAllUserGroups = () => { 
  return http.get("/Task/GetAllUserGroups");
};
const getAllTasksByAdmin = (taskId:string,flag:string) => { 
  return http.get(`/Task/getAllTasksByAdmin/${taskId}/${flag}`);
};
const getAllTasks = () => { 
  return http.get("/Task/getAllTasks");
};
const getAllPendingTasks = () => { 
  return http.get("/Task/getAllPendingTasks");
};
const GetGroupTasksByUser = (userId:string,taskId:string,flag:string) => { 
  return http.get( `/Task/GetGroupTasksByUser/${userId}/${taskId}/${flag}`);  
};
const GetDoneGroupTasksByUser = (userId:string,taskId:string,flag:string) => { 
  return http.get( `/Task/GetDoneGroupTasksByUser/${userId}/${taskId}/${flag}`);  
};
const AssignedTasksByUser = (id:string,statusId:string) => { 
  return http.get( `/Task/AssignedTasksByUser/${id}/${statusId}`);  
};

const AssignedTaskDetails = (userGroupTaskId:string,userId:string) => { 
  return http.get( `/Task/ViewTaskDetails/${userGroupTaskId}/${userId}`);  
};

const AssignTaskToUser = (data:any) => {
  return http.post("/Task/AssignTaskToUser", data);
};
const AssignTaskToGroup = (data:any) => {
  return http.post("/Task/AssignTaskToGroup", data);
};
const AssignUserToGroup = (data:any) => {
  return http.post("/Task/AssignUserToGroup", data);
};
const updateUserStatus = (data:any) => {
  return http.post("/Task/UpdateUserStatus", data);
};
const enableDisable = (groupId: any,value:any) => {
  return http.put<any>(`/Task/enableDisable/${groupId}/${value}`);
};



const TaskService = {
    getAllGroups,
    getAllUserGroups,
    getAllTasks,
    CreateGroup,
   createTask,
   createUserGroup,
   createUserGroupTask,
   getAllTasksByAdmin,
   AssignTaskToUser,
   uploadDoc,
   GetGroupTasksByUser,
   GetDoneGroupTasksByUser,
   AssignedTasksByUser,
   AssignedTaskDetails,
   updateUserStatus,
   enableDisable,
   getAllPendingTasks,
   AssignTaskToGroup,
   AssignUserToGroup
};

export default TaskService;