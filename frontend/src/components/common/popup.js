import './popup.css';
import cancelIcon from './../ICONS/cancel.png';

const PopUp = (properties)=>{
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
                <img src={cancelIcon}></img>
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