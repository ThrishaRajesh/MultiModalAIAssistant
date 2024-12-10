import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState('text'); // Default to text generation
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Added error state

  const handleGenerateClick = async () => {
    if (!prompt.trim()) {
      alert("Please enter a valid prompt.");
      return;
    }
  
    setLoading(true);
    setOutput('');
    setError('');
  
    try {
      const response = await fetch("http://localhost:5012/generate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, generationType }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate content.");
      }
  
      const data = await response.json();
      console.log("Response from backend:", data);
  
      if (data.result) {
        if (generationType === 'text' && data.result.parts) {
          const generatedText = data.result.parts.map((part) => part.text).join('');
          setOutput(generatedText.trim());
        } else if (generationType === 'image') {
          setOutput(data.result); // Backend sends a direct URL to the image
        } else {
          throw new Error("Unexpected response structure.");
        }
      } else {
        throw new Error("No result received from backend.");
      }
      
    } catch (err) {
      console.error("Error during generation:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app">
      <h1 className="title">AI Content Generator</h1>

      <div className="toggle-container">
        <label className="toggle-label">
          <input
            type="radio"
            value="text"
            checked={generationType === 'text'}
            onChange={() => setGenerationType('text')}
          />
          Text Generation
        </label>
        <label className="toggle-label">
          <input
            type="radio"
            value="image"
            checked={generationType === 'image'}
            onChange={() => setGenerationType('image')}
          />
          Image Generation
        </label>
      </div>

      <textarea
        className="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />

      <button
        className="generate-button"
        onClick={handleGenerateClick}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <div className="error-message">{error}</div>} {/* Display error if any */}

      <div className="output">
  <h4>Output:</h4>
  {loading && <div className="loading-spinner"></div>}

  {!loading && generationType === 'text' && <pre className="text-output">{output}</pre>}
  {!loading && generationType === 'image' && output && (
    <img src={output} alt="Generated content" className="image-output" />
  )}
</div>
    </div>
  );
}

export default App;