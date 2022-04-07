import http from "./http-common";
import IUserData from "../types/User";

const getAll = () => { 
  return http.get<Array<IUserData>>("/user/list");
};

const getTheUsers = () => { 
  return http.get<Array<IUserData>>("/User/getTheUsers");
};

const getUserById = (id: any) => {
  console.log(id);
  return http.get<IUserData>(`/user/get/${id}`);
};
const getUsersByGroupId = (groupId: any) => {  
  return http.get(`/user/getUsersByGroupId/${groupId}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/user", data);
};
const update = (id: any, data: IUserData) => {
  return http.put<any>(`/user/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/user/${id}`);
};

const block = (id: any,value:any) => {
  return http.put<any>(`/user/blockuser/${id}/${value}`);
};
const searchUserByName = (userName: string) => {  
  return http.get<any>(`/user/searchUserByName/${userName}`);
};
const resetPassword = (userName: string,oldPassword:string,newPassword:string) => { 
  return http.put<any>(`/user/resetPassword/${userName}/${oldPassword}/${newPassword}`);
};
const UserService = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  block,
  getTheUsers,
  getUsersByGroupId,
  searchUserByName,
  resetPassword
};

export default UserService;