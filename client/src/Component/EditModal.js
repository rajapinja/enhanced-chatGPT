import React, { useState } from "react";
import "./Modal.css";

export default function EditModal({modalClose, editMessage}) {  

    const [updatedMessage, setUpdatedMessage] = useState("");    

    async function handleSubmit(e){
        e.preventDefault();
        editMessage.message = updatedMessage;
        // console.log(updatedMessage, "updatedMessage");
        // console.log(editMessage.message, "editMessage.message");
        modalClose(false)
    }

  return(            
           
            <form >
                <div className="modalEditContent">
                    {/* {console.log(editMessage.message)} */}
                    <textarea 
                        rows="1" 
                        defaultValue={editMessage.message}                       
                        onChange = {(e) => setUpdatedMessage(e.target.value)}
                        />
                    <div className="modalFooterEdit">                                                                         
                        {/* <button onClick={()=>modalClose(false)}> */}
                        <button onClick={(e)=>handleSubmit(e)}>
                            Save & Submit
                        </button>
                        <button id="cancelBtn" onClick={()=>modalClose(false)}>
                            Cancel
                        </button>  
                    </div> 
                </div>            
            </form>
        )
    }

