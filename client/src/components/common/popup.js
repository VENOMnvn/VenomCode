import './popup.css';
import cancelIcon from './../ICONS/cancel.png';
import { Icon } from '@mui/material';

const PopUp = (properties)=>{
    const { IconCancel } = properties;
    console.log(properties);
    return <div className='popup-container'>
    <div className={properties.isFull ? "popup full-width-popup":"popup"}
    style={{width:properties.wid}}
    >
        <div className='popup-header'>
           <div>
                    {properties.heading}
           </div>
           <div>
                <div onClick={properties.cancel}>
                {
                    IconCancel ? <IconCancel sx={{width:"24px",height:"24px"}}></IconCancel>:
                    <img src={cancelIcon}></img>
                }
                </div>
           </div>
        </div>
        <div className='popup-body'>
         {properties.element}
        </div>
    </div>
    </div>
}

export default PopUp;