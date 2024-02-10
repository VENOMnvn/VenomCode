import "./homepage.css";
import HomeFeed from "./homefeed";
import CreatePost from "./CreatePost";
import Filter from "./FilterComp";
import ProfileCard from "./ProfileCard";
import Tutorial from "./Tutorial";
import { useEffect, useRef } from "react";
import MyDirects from "./MyDirects";

const HomePage = () => {
  const homepageref = useRef();
  const centerpageref = useRef();
  function scrollcenter(){
    console.log("123");
  }
  return (
    <>
      <div className="Homepage" style={{ marginTop: "50px" }} ref={homepageref} >
        <div className="mid-width">
          <ProfileCard></ProfileCard>
          <Filter></Filter>
          <CreatePost></CreatePost>
          <Tutorial></Tutorial>
        </div>
        <div className="left-homepage">
          <ProfileCard></ProfileCard>
          <Tutorial></Tutorial>
          {/* <DeveloperCard></DeveloperCard> */}
        </div>
        <div className="center-homepage" ref={centerpageref} onScroll={scrollcenter}>
          <HomeFeed></HomeFeed>
        </div>
        <div className="right-homepage">
          <CreatePost></CreatePost>
          <Filter></Filter>
          <MyDirects></MyDirects>
        </div>
      </div>
    </>
  );
};

export default HomePage;
