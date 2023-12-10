import "./Notification.css";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import path from "./../../path";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, matchRoutes } from "react-router-dom";
import DateDiff from "date-diff";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(false);
  const user = useSelector((s) => s.user.user);

  const getNotifications = async () => {
    try {
      const response = await axios.post(path + "notifications", {
        userId: user._id,
      });
      console.log(user._id);
      console.log(response.data);
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markedAsSeen = async ()=>{
    try{
      const response = await axios.get(path+'seennotification?userid='+user._id);
      console.log(response);
      getNotifications();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="notification-panel">
      <div className="panel-heading"><p>Notifications</p> <button onClick={markedAsSeen} variant="outlined">Marked as Seen</button></div>
      <div className="table">
        <div className="table-head">
          <p>User</p>
          <p>Information</p>
          <p>Time</p>
        </div>

        {notifications ? (
          <>
            {notifications.map((eleme, index) => {
              let ele = notifications[notifications.length - 1 - index];
              const dateNow = new Date();
              const createdAt = new Date(ele.createdAt);
              const time = new DateDiff(dateNow, createdAt);
              let timeToshow;
              if (time.minutes() < 60) {
                timeToshow = time.minutes().toFixed(0) + " mins ago";
              } else if (time.hours() < 25) {
                timeToshow = time.hours().toFixed(0) + " hours ago";
              } else if (time.days() < 8) {
                timeToshow = time.days().toFixed(0) + " days ago";
              } else {
                timeToshow = time.weeks().toFixed(0) + " weeks ago";
              }

              return (
                <div className={ele.isSeen ? "table-row" : "table-row unseen"}>
                  <Avatar src={ele.profilePicture}></Avatar>
                  <p>
                    {" "}
                    <Link
                      to={`/user/${ele.username}`}
                      className="username-link"
                    >
                      {ele.username}
                    </Link>{" "}
                    {ele.msg}
                    {ele.extra && <Link to={ele.link}> {" " + ele.extra}</Link>}
                    {!ele.isSeen && <span className="new-indicator"></span>}
                  </p>
                  <p className="time">{timeToshow}</p>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
