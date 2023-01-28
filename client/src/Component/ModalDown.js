import React, { useState } from "react";
import "./Modal.css";

export default function ModalDown({modalClose}) {

  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  
  return(
          <div className="modal">           
            <div className="overlay" onClick={()=>modalClose(false)}></div>            
            <div className="modal-content">
            <div className="titleCloseBtn">
                <button onClick={()=>modalClose(false)}>
                  X
                </button>
              </div>                                    
              <div className="modalTitle ">
                <div className="modaldownSVG">                  
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-red-600"
                  height="1.3em"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"  
                  color="rgba(183,44,10,1)" 
                  >
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                </svg>         
                </div>
                <div className="title">Provide additional feedback </div>  
              </div> 
              <div className="modalBody">
                <textarea rows="4" placeholder="What would the ideal answer have been?"/>
              </div>
              <div className="modalCheckbox">
                <div>
                  <label>
                    <input 
                      type="checkbox" 
                      value=""
                      onChange={handleChange}/> &nbsp;
                    This is harmful / unsafe
                  </label>   
                </div>
                <div>
                  <label>
                    <input 
                      type="checkbox"
                      value=""
                      onChange={handleChange}/> &nbsp;
                    This isn't true
                  </label>
                </div>
                <div>
                  <label>
                    <input 
                      type="checkbox"
                      value=""
                      onChange={handleChange} /> &nbsp;
                    This isn't helpful
                  </label> 
                </div>                          
              </div>
              <div className="modalFooter">  
                {/* <button id="cancelBtn" onClick={()=>modalClose(false)}>
                  Cancel
                </button>              */}
                <button onClick={()=>modalClose(false)}>
                  Submit Feedback
                </button>
              </div>   
            </div>
          </div>
        )
}

