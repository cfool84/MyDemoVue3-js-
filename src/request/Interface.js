import request from "./HttpManager";

//登陆
export const login = (data) => request.post("/login", data);