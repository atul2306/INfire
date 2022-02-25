import { useHttpClient } from "../../../customHooks/httpHook";
import { NewsContext } from "../../../customHooks/reducer/NewsContext";
import React, { useEffect, useState, useContext } from "react";

import style from "../Assets/styles/home.module.css";
import img from "../Assets/images/atul.jpeg"
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import SendIcon from "@material-ui/icons/Send";
import { toast } from "react-toastify";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { UserContext } from "../../../customHooks/reducer/UserContext";
import { NavLink } from "react-router-dom";
const Home1 = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { userDetails } = useContext(UserContext);
  const { newsData } = useContext(NewsContext);
  console.log(newsData);

  const userid = userDetails.userId;
  const [post, setpost] = useState([]);
  const [like, setlike] = useState([]);
  const [delete1, setdelete] = useState(false);
  const [comment, setcomment] = useState("");
  useEffect(async () => {
    sendRequest("http://localhost:9000/api/v1/post/findfollowedpost/" + userid)
      .then((res) => {
        if (res.success) {
          //  console.log(res.post);
          setpost(res.post);
        } else {
          console.log("false");
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [like, delete1, comment]);

  const deletePost = (id) => {
    sendRequest("http://localhost:9000/api/v1/post/delete/" + id + "," + userid)
      .then((res) => {
        //console.log(2);
        if (res.success) {
          //  console.log(res);
          setdelete(true);
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          //  console.log(res);
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = (id) => {
    sendRequest(
      "http://localhost:9000/api/v1/post/likeandUnlike/" + id + "," + userid
    )
      .then((res) => {
        if (res.success) {
          // console.log(res);
          setlike(res.post);

          //  toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          //console.log(res);
          //  toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const islike = (id) => {
    const requiredpost = post.find((pst) => {
      return pst._id == id;
    });
    return requiredpost.likes.indexOf(userid) >= 0;
  };
  const addcomment = (id) => {
    const data = {
      postid: id,
      userid: userid,
      comment: comment,
    };
    sendRequest(
      "http://localhost:9000/api/v1/post/comment",
      "POST",
      JSON.stringify(data),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        if (res.success) {
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong, Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      <div className={style.container}>
        {post.map((currphoto) => {
          // console.log(currphoto);

          return (
            <div className={style.container1}>
              <div className={style.container2}>
                <h3>Name</h3>
                <HighlightOffIcon
                  style={{ fontSize: "1.8rem" }}
                  onClick={() => deletePost(currphoto._id)}
                />
              </div>
              <div className={style.container3}>
                <img className={style.container4} src={currphoto.image.url} />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "72%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    width: "100%",
                    margin: "3%",
                  }}
                >
                  {currphoto.caption}
                </span>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <i
                    className={style.container5}
                    style={{
                      color: islike(currphoto._id) ? "black" : "lightblue",
                      cursor: "pointer",
                    }}
                    onClick={() => likePost(currphoto._id)}
                    className="fa fa-heart"
                  >
                    {currphoto.likes.length} Likes
                  </i>
                  <i className={style.container5} className="fa fa-comment">
                    {currphoto.comments.length} Comments
                  </i>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    marginTop: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    className={style.container6}
                    type="text"
                    placeholder="Add Comment"
                    onChange={(e) => setcomment(e.target.value)}
                  />

                  <SendIcon onClick={() => addcomment(currphoto._id)} />
                </div>
              </div>
            </div>
          );
        })}

        {newsData.map((currnews,idx) => {
          var date = new Date(currnews.created_date);
            date = date.toString();
            const short=currnews.short_url;
             if(currnews.title && currnews.abstract && currnews.multimedia )   
               return (

                <div className={style.container7}>
             <div style={{display:"flex",width:"90%",padding:"14px",flexDirection:"column"}} key={idx} >
            <img src={currnews.multimedia && currnews.multimedia[0].url}/>
             <h1 >{currnews.title}</h1>
             <h3 >{currnews.abstract}</h3>
             {date}
        <a   style={{cursor:"pointer",color:"black",textDecoration:"none",display:"flex",marginLeft:"75%",border:"double",padding:"4px",justifyContent:"flex-end"}} href={currnews.short_url} target="_blank" >Read More..</a>
             </div>
             
        </div>  
               );
          })
        }
      </div>
    </>
  );
};

export default Home1;
