import Head from 'next/head';
import Image from 'next/image';
import Logo from '../assets/img.jpg';

import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)


  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> 🤖 ScholarBot </h1>
          </div>
          <div className="header-subtitle">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

            <h2> I am artificial intelligent writing tool that assists users in writing a statement of purpose for a desired university department by emphasizing relevant keywords to generate a detailed essay. </h2>
            <br></br>
            <h3> prompt - a prompt is a short description in the english language that acts as inputs for AI generators</h3>
            <br></br>
            <h4> Please create your prompt in the format below. 👇🏼</h4>
            
            <p>Title: Topic: Description<br /> University: Name of institution <br /> Course of Study: <br /></p>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder="start typing here" 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText} />
        <div className="prompt-buttons">
        <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
        </div></a>
        </div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/Im_Mr_Chris"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={Logo} alt="logo" />
            <p>by chriscelaya</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
