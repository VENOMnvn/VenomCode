import './popup.css';
import CancelIcon from '@mui/icons-material/Cancel';
const PopUp = (properties)=>{

    return <div className='popup-container'>
    <div className='popup'>
        <div className='popup-header'>
            <CancelIcon sx={{color:"gray"}} onClick={properties.cancel} className='cancel'></CancelIcon>
        </div>
        <div className='popup-body'>
         {properties.element}
        </div>
    </div>
    </div>
}

export default PopUp;