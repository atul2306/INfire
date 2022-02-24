import {UserContext} from "../../customHooks/reducer/UserContext"
import React, { useContext, useEffect } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
const Googlelogin = () => {
    const {login}= useContext(UserContext)
    const { token } = useParams();
    const history= useHistory();
    useEffect(async() => {
       fetch(`http://localhost:9000/api/auth/oauth/${token}`,{
              method: "GET",
       }) .then((res) => res.json())
       .then((res) => {
            if (res.ok) {
                console.log(res)
               
                login(res.data,res.token);
           toast.success("Logged In Success", { position: toast.POSITION.TOP_RIGHT });
           
           history.push("/dash/home")
            } else {
                toast.warn("error", { position: toast.POSITION.TOP_RIGHT });
            }
            })
            .catch((err) => {
                console.log(err)
                toast.warn(err, { position: toast.POSITION.TOP_RIGHT });
            })
    },[token])
  return (
   <div>
   
      </div>
  );
};

export default Googlelogin;
