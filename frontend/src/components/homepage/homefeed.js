
import Post from './Post';
const HomeFeed = ()=>{
    const arr = [1,2,3,45,6,7,8,9,10,342,523];

    return <div className="home-feed">
        {arr.map((ele)=>{
            return (<Post></Post>);
        })}

        
    </div>;
}
export default HomeFeed;