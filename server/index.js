import { Configuration, OpenAIApi } from "openai";
import express   from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000'   
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


const configuration = new Configuration({
  apiKey: "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",
  
  //apiKey:process.env.OPENAI_API_KEY1,
});
const openai = new OpenAIApi(configuration);


//console.log(response.data.choices[0].text);

// const response =await openai.listModels();
// let listmodels = response.data.data;
//console.log(listmodels);
//listmodels.forEach(data => {
 // console.log(`${data.id}`)
  //for (let key in data) {
    //console.log(`${data[key]}`)
    //console.log(`${key}: ${data[key]}`)
  //}
//})

//Post a question or prompt and get AI answered
app.post('/', async (req, res) =>{

  const { message, model } = req.body;
  console.log(message, "message");
  console.log(model, "model");
  const response = await openai.createCompletion({
    model: `${model}`,//"text-davinci-003",
    prompt: `${message}`,
    max_tokens : 100,
    temperature: 0.5
  });
  
  console.log(response.data.choices[0].text);
  let gptMessage = response.data.choices[0].text;
  return res.json(gptMessage); 
});

//To get list of OpenAI Engine models
app.get('/models', async (req, res) =>{
  const response = await openai.listModels();
  let listmodels = response.data.data;
  console.log(listmodels);
  return res.json({models:listmodels});
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

//const response2 = await openai.retrieveModel("text-davinci-003");
//console.log("Retrieves AI models belwo...:");

//console.log(response2.data);
app.listen(3001, () =>{
  console.log("I'm running on port "+3001)
})

/**app.listen(process.env.PORT, () =>{
  let PORT = process.env.PORT;
  console.log("I'm running on port "+PORT)
})*/