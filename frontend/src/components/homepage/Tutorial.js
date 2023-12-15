import { Button, ButtonGroup } from "@mui/material";
import {YoutubeLogo,GithubLogo,LinkedinLogo,UserFocus} from 'phosphor-react';
import { Link } from "react-router-dom";
import { youtubeLogoLink } from "../../path";

const Tutorial = ()=>{

    return <>
    <div className="tutorial">
        <h1>Are you New ? </h1>
        <h2>You can watch a Video tutorial </h2>
        <Link className="centerAll" to={youtubeLogoLink}>
        <Button  startIcon={<YoutubeLogo></YoutubeLogo>}>Watch</Button>
        </Link>
        <div>
            <h1>About Me</h1>
            <div className="centerAll">

            <ButtonGroup>
                <Link>
                <Button startIcon={<UserFocus></UserFocus>}></Button>
                </Link>
                <Link>
                <Button startIcon={<LinkedinLogo></LinkedinLogo>}></Button>
                </Link>
                <Link>
                <Button startIcon={<GithubLogo></GithubLogo>}></Button>
                </Link>
            </ButtonGroup>
            </div>
        </div>
    </div>
    </>
}
export default Tutorial;