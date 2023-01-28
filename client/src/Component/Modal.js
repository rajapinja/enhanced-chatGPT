import React, { useState } from "react";
import "./Modal.css";

export default function Modal({modalClose}) {
  
  return(
          <div className="modal">           
            <div  className="overlay" onClick={()=>modalClose(false)}></div>            
            <div className="modal-content">
            <div  className="titleCloseBtn">
                <button onClick={()=>modalClose(false)}>
                  X
                </button>
              </div>                                    
              <div className="modalTitle ">
                <div className="modalSVG">                  
                     <svg
                     stroke="currentColor"
                     fill="none"
                     strokeWidth={1.5}
                     viewBox="0 0 24 24"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="h-6 w-6 text-green-700"
                     height="1.3em"
                     width="1.3em"
                     xmlns="http://www.w3.org/2000/svg"   
                     color="rgba(4,105,8,1)" 
                             
                   >
                     <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                   </svg>         
                </div>
                <div className="title">Provide additional feedback </div>  
              </div> 
              <div className="modalBody">
                <textarea rows="4" placeholder="What would the ideal answer have been?"/>
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

