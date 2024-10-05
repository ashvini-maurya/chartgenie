import './App.css';

import { useEffect, useState } from 'react';

const App = () => {

  const [message, setMessage] = useState(null)

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello how are you?'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
        const response = await fetch('http://localhost:8000/completions', options);
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="app">
      <section className='sideBar'>
        <button>
          +new chat
        </button>
        <nav>
          <ul className='history'>
            <li>hi1</li>
            <li>hi2</li>
            <li>hi3</li>
          </ul>
        </nav>
      </section>
      
      <section className='main'>
        <h1>ChartGenie2</h1>
        <ul className='feed'></ul>

        <section className='bottomSection'>
          <div className='inputContainer'>
            <input type="text" placeholder='type a message' />
            <div id='submit' onClick={getMessages}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-2xl"><path fillRule="evenodd" clipRule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg>
            </div>
          </div>

          <p className='info'>
            this is the info section area!!!!
          </p>
        </section>
      </section>
    </div>
  );
}

export default App;
