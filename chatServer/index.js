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


//console.log(listmodels);
//listmodels.forEach(data => {
 // console.log(`${data.id}`)
  //for (let key in data) {
    //console.log(`${data[key]}`)
    //console.log(`${key}: ${data[key]}`)
  //}
//})

app.post('/', async (req, res) =>{
  const { message } = req.body;
  console.log(message);
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "What is the airport code of Hyderabad" 
  // });

  // const response1 =await openai.listModels();
  // //let listmodels = response1.data.data;
  // console.log("List of AI models belwo...:");
  res.json({
    // listmodels:response1.data.data});
    data:message
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