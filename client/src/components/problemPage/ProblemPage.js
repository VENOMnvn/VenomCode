import "./problems.css";
import {
  Button,
  ButtonGroup,
  IconButton,
  Chip,
  TextField,
  Icon,
  Pagination
} from "@mui/material";
import { Plus, HashStraight, BookBookmark, Share } from "phosphor-react";
import Question from "./Question";
import PopUp from "../common/popup";
import CreatePost from "./CreateQuestion";
import { useEffect, useState } from "react";
import axios from "axios";
import path from "../../path";
import { Dropdown, SearchBar, Tag, TextInput } from "keep-react";
import { useSearchParams } from "react-router-dom";

const ProblemPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [currentTag, setcurrentTag] = useState("");
  const [Tags, setTags] = useState([]);
  const [showAddTag, setShowAddTag] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionOne, setQuestionOne] = useState(false);
  const [count,setcount]=useState(1);
  const [page,setPage] = useState(1);

  const [SearchParams] = useSearchParams();

  const questionQuery = SearchParams.get("question");

  const handleTagDelete = (tag) => {
    let tagTemp = Tags;
    tagTemp = tagTemp.filter((ele) => {
      return ele != tag;
    });
    setTags(tagTemp);
  };

  const handleAddTag = (e) => {
    if (e.keyCode == "13") {
      setTags((prev) => [...prev, currentTag]);
      setcurrentTag("");
    }
  };

  const getAllProblems = async () => {
    try {

      const data = await axios.get(path + "problems?limit=10&skip="+(page-1));
      if (data.data.success) {
        console.log(data.data.problems);
        setQuestions(data.data.problems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPageCount = async ()=>{
    try{
      const countResponse = await axios.get(path+'problems/count');
      const maxPageTemp = Math.ceil(countResponse.data.count/10);
      setcount(maxPageTemp);
    }catch(err){
      console.log(err);
    }
  }

  const getTagProblems = async () => {
    try {
      const data = await axios.post(path + "problems/tag",{
        Tags
      });
      if (data.data.success) {
        setQuestions(data.data.problems);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getSingleProblem = async () => {
    try {
      const data = await axios.get(path + "getproblem?id=" + questionQuery);
      if (data.data.success) {
        setQuestionOne(data.data.problem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (questionQuery) {
      getSingleProblem();
    }
  }, [questionQuery, SearchParams]);

  useEffect(() => {
    getPageCount();
    getAllProblems();
  }, []);

  useEffect(()=>{
    if(Tags.length>0){
      getTagProblems();
    }else{
      getAllProblems();
    }
  },[Tags,page])

  return (
    <>
      <div className="problemPage">
        {showCreate && (
          <PopUp
            element={
              <CreatePost cancel={() => setShowCreate(false)}></CreatePost>
            }
            cancel={() => setShowCreate(false)}
          ></PopUp>
        )}
        
        <div className="problem-navbar">
          <div className="left">
            <p>Problems</p>
          </div>

          <div className="right">
            <ButtonGroup>
              <Button
                variant="contained"
                startIcon={<Plus></Plus>}
                onClick={() => setShowCreate(true)}
              >
                New
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="centerAll">
          <div className="active-tags">
            {showAddTag && (
              <input
                placeholder="Enter a Tag to Search Question"
                value={currentTag}
                onChange={(e) => setcurrentTag(e.target.value.toUpperCase())}
                onKeyDown={handleAddTag}
                className="addtagefield"
              ></input>
            )}

            <IconButton
              onClick={() => setShowAddTag(!showAddTag)}
              className={showAddTag ? "rotate45" : ""}
            >
              <Plus></Plus>
            </IconButton>
             <Chip label={'Tags'} ></Chip>
            {Tags?.map((ele) => (
              <Chip  label={ele} onDelete={() => handleTagDelete(ele)}></Chip>
            ))}
          </div>
        </div>

        {questionOne && (
          <div
            className="Question-Container"
            style={{
              backgroundColor: "aliceblue",
              border: "1px solid lightgray",
              padding: "2px 4px",
            }}
          >
            <p>
              <b>Question</b> asked by {questionOne?.user?.firstname}{" "}
              {questionOne?.user?.lastname}{" "}
            </p>
            <Question data={questionOne}></Question>
            <div className="details">
              <span>Copy and Share URL to Share Question</span>
            </div>
          </div>
        )}

        {
          questionOne && <div style={{
            fontSize:"18px",
            padding:"14px",
            backgroundColor:"white",
            borderRadius:"8px",
            marginTop:"15px"
          }}>
            <b>Other Questions</b>
          </div>
        }

        <div className="Question-Container">
          {
            !questions ? <div>No Questions to show</div>:""
          }
          {questions?.map((problem) => (
            <Question key={problem.createdAt} data={problem}></Question>
          ))}
        </div>
        <div className="pagination">
        <Pagination count={count} page={page} onChange={(e,v)=>setPage(v)} />
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
