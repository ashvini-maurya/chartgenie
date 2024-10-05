const PORT = 8000;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// const API_KEY = 'sk-yEnzxh6xpLk1AS17yUbuOx-MFPYsOD5BRvuUUiYb5bT3BlbkFJLFW2W3THqU_NxUywr0Ci_4lvE6ABXgoTLIbA4fK7QA'
const API_KEY = 'sk-dVarUiKvGAe9MrU_MoxDubii8Uz4K3se1yFHyRfU4nT3BlbkFJ260IXSqZ0lSK0ZGC0Q-RQMvCFGWuBYWqb8WLwFklkA'
// const API_KEY = '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'

app.post('/completions', async(req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0125',
      message: [{role: 'user', content: 'How are you doing!'}],
      max_token: 1000
    })
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
  }
  catch (error){
    console.error(error);
  }
})

app.listen(PORT, () => console.log('Your server is running!!! ', PORT));