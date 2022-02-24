import React, { useContext, useEffect } from "react";
import style from "../MyProfile/assets/styles/myprofile.module.css";
import { useHttpClient } from "../../../../../customHooks/httpHook";
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../../../../customHooks/reducer/UserContext";
import { Avatar } from "@material-ui/core";
const MyProfile = () => {
  const { userDetails, logout } = useContext(UserContext);
  const { sendRequest, isLoading } = useHttpClient();
  // console.log(userDetails)
  const [user, setUser] = useState({});
  const id = userDetails.userId;

  //console.log(id);
  useEffect(() => {
    sendRequest("http://localhost:9000/api/auth/mydetail/" + id)
      .then((res) => {
        if (res.success) {
          console.log(res.user);
          setUser(res.user);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

//console.log(user.avatar.url)
  return (
    <>
      <div className={style.container}>
        <div className={style.container2}>
          <Avatar
            src={user?.local?.avatar?.url}
            style={{
              color: "black",

              width: "200px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8px",

              margin: "auto",
            }} 
           
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <span style={{ fontSize: "21px" }}>
              <b>{user?.local?.followers?.length}</b> Follower
            </span>
            <span style={{ fontSize: "21px" }}>
              <b>{user?.local?.following?.length}</b> Following
            </span>
          </div>
          <span className={style.container1}>
            Email :- {userDetails.userEmail}
          </span>
          <span className={style.container1}>
            Name :- {userDetails.userName}
          </span>
          <span className={style.container1}>Password :- *********</span>
          <div
            style={{
              marginLeft: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "18px",
            }}
          >
            <button className={style.button}>
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  exact
                  to="/dash/feedback"
                >
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    exact
                    to="/dash/Updateprofile"
                  >
                    Update Profile
                  </NavLink>
                </NavLink>{" "}
              </span>
            </button>
            <button className={style.button} onClick={logout}>
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  exact
                  to="/"
                >
                  Logout
                </NavLink>
              </span>
            </button>
            <button className={style.button}>
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  exact
                  to="/dash/feedback"
                >
                  Update Password
                </NavLink>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
