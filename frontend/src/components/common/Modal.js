import { Button, IconButton } from "@mui/material";
import "./Modal.css";

const Modal = ({
  Icon,
  cancel,
  heading,
  subheading,
  confirm,
  leftButton,
  Element,
  leftButtonFunction,
  confirmButtonText,
  leftButtonText,
}) => {
  return (
    <>
      <div className="modalContainer">
        <div className="modalBox">
          <div className="modal-top">
            <IconButton
              style={{
                backgroundColor: "#e4e6eb",
              }}
            >
              {Icon && <Icon></Icon>}
            </IconButton>
            <IconButton onClick={cancel}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
                class="h-6 w-6"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="200"
                  y1="56"
                  x2="56"
                  y2="200"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="12"
                ></line>
                <line
                  x1="200"
                  y1="200"
                  x2="56"
                  y2="56"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="12"
                ></line>
              </svg>
            </IconButton>
          </div>
          {Element ? (
            <Element></Element>
          ) : (
            <>
              <div className="modal-body">
                <p>{heading}</p>
                <span>{subheading}</span>
              </div>
              <div className="modal-button">
                {leftButton && (
                  <Button
                    variant="outlined"
                    sx={{ padding: "10px 20px" }}
                    onClick={leftButtonFunction ? leftButtonFunction : cancel}
                  >
                    {
                     leftButtonText ? leftButtonText :"Cancel" 
                    }
                  
                  </Button>
                )}
                <Button variant="contained" onClick={confirm}>
                  {
                    confirmButtonText ? confirmButtonText :"Confirm"
                  }
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
