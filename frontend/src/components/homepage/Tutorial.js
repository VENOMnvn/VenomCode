import { Button, ButtonGroup } from "@mui/material";
import {YoutubeLogo,GithubLogo,LinkedinLogo,UserFocus} from 'phosphor-react';
import { Link } from "react-router-dom";
import { youtubeLogoLink } from "../../path";

const Tutorial = ()=>{

    return <>
    <div className="tutorial">
        <h1>Are you New ? </h1>
        <h2>You can watch a Video tutorial </h2>
        <Link className="centerAll pb-2" to={youtubeLogoLink}>
        <Button variant="outlined"  startIcon={<YoutubeLogo></YoutubeLogo>}>Watch</Button>
        </Link>
        
        <div className="tut-line">
            <h1>About Me</h1>
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