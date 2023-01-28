
import {useState, useEffect} from "react";
import logo from './images/raja_pinja1.jpg';
import './App.css';
import './normal.css';
import Modal from './Component/Modal';
import ModalDown from './Component/ModalDown';
import ModalEdit from './Component/EditModal';
  
function App() {

    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([{
        user:"gpt", 
        message:"How can I help you?"
      },
      {
        user:"me",
        message:"I want to use ChatGPT Today"
      }
    ]); 
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = useState("ada");    
    const [urls, setUrls] = useState([]);
  
    // useEffect
    useEffect(() => {
      getEngineModels();
    }, []);

    //To get chatGPT completion/response for give question/prompt
    async function handleSubmit(e){
      e.preventDefault();
      let chatLogNew = [...chatLog, {user:"me", message: `${input}`}];
      setInput("");
      setChatLog(chatLogNew);

      const messages =  chatLogNew.map((message) => message.message).join("\n");
      const response = await fetch("http://localhost:3001/", {
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify(
          {
            message: messages,
            model:currentModel
        })
      }).then((response)  => response.json())
      .then((message) => {
        setChatLog([...chatLogNew, {user: "gpt", message:`${message}`}]); 
        console.log(message);
      });   
    }      

    //To get chatGPT models or engine models
    async function getEngineModels(){
      const response = await fetch("http://localhost:3001/models/", {
        method:"GET",
        headers:{
          "content-Type":"application/json"
        }
      }).then((response)  => response.json())
      .then((data) => {
        console.log(data);
        setModels(data.models);
      }); 
    }

    //To get AI generated Image for given question/prompt
    async function getImage(){
      const response = await fetch("http://localhost:3001/createImage", {
        method:"GET"
      }).then((response)  => response.json())
      .then((data) => {       
        console.log(data.urls.data);
        setUrls(data.urls.data);
      });   

    }    
    //To clear out chatLogs //previously  entered by user
    async function clearChat(){
      setChatLog([])
    }  

  return (
    <div className="App">        
      <aside clasName="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span> 
          New Chat
        </div> 
        <div className="models">  
        <div><label>Engine Modal</label></div>        
          <select onChange={(e) => setCurrentModel(e.target.value)} placeholder="Select Modal" >
            {models.map((model, index) =>(
               <option key={index} value={model.id} >
                {model.id}
               </option>
            ) )}
          </select>
        </div>
      </aside>      
      <section className="chatbox">
        <div className="chat-log">
          {
            chatLog.map((message, index) => (<ChatMessage key={index} message={message} />))
          }
        </div>          
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>        
            <input className="chat-input-textarea" 
              rows="1"        
              value={input}
              onChange={(e)=>setInput(e.target.value)}/>       
          </form>            
        </div>           
        {/* <div>
          <button onClick={getImage}> GET IMAGE</button>
            {urls.map((url, index) => (<div key={index} value={url}>{url.url}</div>))}
        </div> */}  
      </section>   
    
    </div>    
  )
}

// Create ChatMessage Component
const ChatMessage = ({message}) =>{

  const [modal, setModal] = useState(false);
  const [modalDown, setModalDown] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  return(
    <div className={`chat-message ${message.user === "gpt" && "chat-gpt"}`}>
      <div className="chat-message-center"> 
        <div className={`avatar ${message.user === "gpt" && "chat-gpt"}`}>        
        {message.user === "gpt" && 
        <svg
                width={41}
                height={41}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={1.5}
                className="h-6 w-6"                
              >
                <path
                  d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                  fill="currentColor"
                />
              </svg>   }
              {message.user === "me" &&  <img className="avatar profile" src={logo} alt="Logo" />  }
        </div>
        <div className="message">
          {modalEdit === false && <div className="gptMessageDisplay"><p>{message.message}</p></div> }                 
          <div className="editPrompt">
            {message.user === "me" && 
              <button className="editPromptBtn" onClick={() =>{setModalEdit(true)}} >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"    
                color= "white"         
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg></button>
            }            
          </div>
          <br/>
          {
            modalEdit && <ModalEdit modalClose={setModalEdit} editMessage={message}/>            
          }         
          <div className="thumsup">{message.user === "gpt" && 
          <button className="button-up" onClick={()=>{setModal(true)}}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            height="1.2em"
            width="1.2em"
            xmlns="http://www.w3.org/2000/svg"
            color="#ecf0f1" 
            >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
         </button>
         }          
        </div>
        {modal && <Modal modalClose={setModal}/> }  
        <div className="thumsdown" >
          {message.user === "gpt" && 
            <button class="button-down" onClick={()=>{setModalDown(true)}}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1.2em"
              width="1.2em"
              xmlns="http://www.w3.org/2000/svg"  
              color="#ecf0f1"     
              >
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
            </button>
          }
        </div>
        {modalDown && <ModalDown modalClose={setModalDown}/> }  
      </div>
      </div>
    </div>
  )
}

export default App;