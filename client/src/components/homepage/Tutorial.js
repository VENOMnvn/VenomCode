import { Button, ButtonGroup } from "@mui/material";
import {YoutubeLogo,GithubLogo,LinkedinLogo,UserFocus} from 'phosphor-react';
import { Link } from "react-router-dom";
import { youtubeLogoLink } from "../../path";

const Tutorial = ()=>{

    return <>
    <div className="tutorial">
        <div className="tutorial-top">
            Are You New ?
        </div>
        <h2 className="font">You can watch a Video tutorial </h2>
        <div className="centerAll">
        <Link className="pb-2 m-auto" to={youtubeLogoLink}>
        <Button variant="outlined"  startIcon={<YoutubeLogo></YoutubeLogo>}>Watch</Button>
        </Link>
        </div>
        <div className="tutorial-top">
            About me
        </div>
        <div className="">
            <div className="font">
             My Social handels to connect with me
            </div>
            <div className="centerAll">
           
            <ButtonGroup>
                <Link to={"https://venomscode.netlify.app/user/naveenchaudhary1402/"}>
                <Button startIcon={<UserFocus></UserFocus>}></Button>
                </Link>
                <Link to={'https://www.linkedin.com/in/naveenchaudhary1402/'} target="_blank">
                <Button startIcon={<LinkedinLogo></LinkedinLogo>}></Button>
                </Link>
                <Link to={"https://github.com/VENOMnvn"} target="_blank">
                <Button startIcon={<GithubLogo></GithubLogo>}></Button>
                </Link>
            </ButtonGroup>
            </div>
        </div>
    </div>
    </>
}
export default Tutorial;