 import './homepage.css';
import HomeFeed from './homefeed';
import CreatePost from './CreatePost';
import Filter from './FilterComp';
import ProfileCard from './ProfileCard';
import DeveloperCard from './DeveloperCard';


const HomePage = ()=>{


    return <div className="Homepage">
    <div className="left-homepage">
    <ProfileCard></ProfileCard>
    {/* <DeveloperCard></DeveloperCard> */}

    </div>
    <div className="center-homepage"><HomeFeed></HomeFeed></div>
    <div className="right-homepage">
    <CreatePost></CreatePost>
    <Filter></Filter>
    </div>
    </div>;
}

export default HomePage;