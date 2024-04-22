// import { message } from "antd";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUser } from "../apicalls/users";
import { SetUser } from "../redux/usersSlice";
import { useNavigate } from "react-router";
import { message } from "antd";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const getPresentUser = async () => {
        try {
            const response  = await GetCurrentUser()
            if(response.success){
                console.log(response)
                dispatch(SetUser(response.data))
            }else {
                message.error("You are not Logged in!")
                localStorage.removeItem("token")
                navigate("/login")
            }
        } catch (error) {
            
        }
    }
    if(localStorage.getItem("token")){
          getPresentUser()
    }else{
        navigate("/login")
    }
  }, [])
 
  return (
    user && 
    (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1 className="text-2xl text-white cursor-pointer"
            >Book My Show</h1>
          </div>

          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary mt-1"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.email}
            </h1>

            <i
              className="ri-logout-box-r-line mt-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
