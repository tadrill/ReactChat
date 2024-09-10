import OpenAI from 'openai';
import './Ai.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = "HIDDEN"; // 10 requests per hour
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
let userPrompt = '';
const api = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true
});
 
const main = async () => {
  const completion = await api.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  console.log("User:", userPrompt);
  console.log("AI:", response);
};


function Ai() {
  const [inputValue, setInputValue] = React.useState('');
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }
  const handlelKeyDown = (event) => {
    if (event.key === 'Enter') {
      // send the input
      console.log('we got the input', inputValue);
      userPrompt = inputValue;
      setInputValue(''); // clear the box
      main();
    }
  }

  return (
    <div className="App">
      <TextField fullWidth label="Chat (256 Char)" id="fullWidth" rows={4} type="text" value={inputValue} onChange={handleChange} onKeyDown={handlelKeyDown}/>
    </div>
  );
}

export default Ai;
