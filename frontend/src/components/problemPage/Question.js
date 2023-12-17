import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Icon,
  Tooltip,
} from "@mui/material";
import "./problems.css";
import * as Icons from "phosphor-react";
import { Link, useSearchParams } from "react-router-dom";
import CreateAnswer from "./../common/CreatePost";
import { useEffect, useState } from "react";
import Popup from "../common/popup";
import { useDispatch } from "react-redux";
import Solution from "./../homepage/Post";
import { setQuestion } from "./../../utils/slices/utilitySlice";

const Question = (props) => {
  const [showPopUp, setshowPopUp] = useState(false);
  const [solutions, setSolutions] = useState(props.showSolution);
  const [data,setData] = useState(props.data);

  useEffect(()=>{
    setData(props.data);
  },[props]);

  const dispatch = useDispatch();

  let title = data.title;
  let id = data.createdAt;

  id = id.split("-").join("");
  id = id.split(":").join("");
  id = id.split(".").join("");

  return (
    <>
      <div className="question">
        {showPopUp ? (
          <Popup
            element={
              <CreateAnswer cancel={() => setshowPopUp(false)}></CreateAnswer>
            }
            heading={"Solve a Problem"}
            cancel={() => setshowPopUp(false)}
          ></Popup>
        ) : (
          ""
        )}
        <h1>
          <span>Question : {id}</span>
          <span className="solution-length">
            {data?.solutions.length} Solutions
          </span>
          <p>{data.title}</p>
        </h1>

        <div className="question-details">{data?.description}</div>
        <div className="question-tags">
          <div style={{ fontWeight: "600" }}>Tags : </div>
          <div className="question-tags-chip">
            {data?.tags?.map((tag) => {
              return (
                <Chip
                  label={tag}
                  sx={{ backgroundColor: "green", color: "white" }}
                ></Chip>
              );
            })}
          </div>
        </div>
        <div className="question-base">
          <div className="left">
            <ButtonGroup>
              <Link to={data.link}>
                <Tooltip title="reference">
                  <Button  disabled={!data.link} startIcon={<Icons.Link></Icons.Link>}></Button>
                </Tooltip>
              </Link>

              <Link to={"/problems?question=" + data._id}>
                <Tooltip title="share">
                  <Button
                    startIcon={<Icons.ShareNetwork></Icons.ShareNetwork>}
                  ></Button>
                </Tooltip>
              </Link>

              <Link to={"/user/" + data.user.username}>
                <Tooltip title={data.user.username}>
                  <Button
                    startIcon={
                      <Avatar
                        src={data?.user?.profilePicture}
                        sx={{ width: "20px", height: "20px" }}
                      ></Avatar>
                    }
                  ></Button>
                </Tooltip>
              </Link>
            </ButtonGroup>
          </div>

          <div className="right">
            <ButtonGroup>
              <Button
                variant="outlined"
                startIcon={<Icons.Plus></Icons.Plus>}
                onClick={() => {
                  setshowPopUp(true);
                  dispatch(
                    setQuestion({
                      dateID: id,
                      questionID: data?._id,
                      title: data?.title,
                      user: data.user,
                    })
                  );
                }}
              >
                Answer
              </Button>
              <Button
               
                variant={!solutions?"contained":"outlined"}
                onClick={() => setSolutions(!solutions)}
              >
                {
                  solutions ? "Hide" :"Solutions"
                }
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      {solutions && (
        <div className="solutions">
          <p>
            <b>Solutions</b> of {data?.title} : {data.solutions.length}{" "}
          </p>
          {data?.solutions.map((ans) => (
            <Solution data={ans}></Solution>
          ))}
        </div>
      )}
    </>
  );
};

export default Question;
