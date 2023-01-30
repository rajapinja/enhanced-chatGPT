import { Configuration, OpenAIApi } from "openai";
import express, { response }   from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const configuration = new Configuration({
   apiKey:"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",
});
const openai = new OpenAIApi(configuration);

//Post a question or prompt and get AI answered
app.post('/', async (req, res) =>{
  const { message } = req.body;
  console.log(message);
  //console.log(model, "model");
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`, //"Pretend like Elon Musk?",//,
    max_tokens : 100,
    temperature: 0.5
  });  
  console.log(response.data.choices[0].text);
  let gptMessage = response.data.choices[0].text;
  return res.json({message:gptMessage}); 
});

//To get list of OpenAI Engine models
app.get('/models', async (req, res) =>{
  console.log("Inside models API....")
  const response = await openai.listModels();
  //const response = await openai.listEngines().then((response)=>(response.data.data));
  //let listmodels = response.data.data;
  console.log(response);
  //return res.json({models:listmodels});
  return res.json(response.data);
});

//Create an image
app.get('/createImage', async(req, res)=>{
  //const { message} = req.body;
  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 1, // no of images to be retrieved
    size: "1024x1024",
  });

  console.log(response.data);
  let gptImages = response.data;
  return res.json({urls:gptImages});
})
//console.log(response2.data);
app.listen(3001, () =>{
  console.log("I'm running on port "+3001)
})
