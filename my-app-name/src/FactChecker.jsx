import React from 'react';

// Define your function that will be triggered on button click
function checkStatement() {
  // Insert your fact-checking logic here
  console.log("Checking statement...");
}

function FactChecker() {
  return (
    <div className="container">
      {/* Inline CSS for demonstration purposes.
          In production, consider using a separate .css file and placing the font link in public/index.html. */}
      <style>{`
        /* Import Poppins font so it matches your original HTML. */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #fff;
          color: #333;
          line-height: 1.6;
          padding: 40px;
        }

        .container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Glowy Circle Background */
        .circle-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          height: 400px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 106, 0, 0.893) 0%,
            rgba(255, 165, 0, 0) 70%
          );
          z-index: -1;
        }

        /* Header */
        header {
          text-align: center;
          margin-bottom: 40px;
        }
        header h1 {
          font-size: 2.75rem;
          margin-bottom: 10px;
          letter-spacing: 3px;
        }
        header p {
          font-size: 1.1rem;
          font-weight: 300;
          font-style: italic;
        }

        /* Input Section */
        .input-section {
          background-color: #f6f6f6;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .input-section h2 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          text-align: center;
        }
        .input-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .input-container input[type="text"] {
          width: 70%;
          max-width: 400px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .input-container button {
          padding: 10px 20px;
          background-color: #ff8346;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        .input-container button:hover {
          background-color: #c1662d;
        }

        /* Output Section */
        .output-section {
          background-color: #f6f6f6;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
        }
        .output-section h2 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          text-align: center;
        }
        .output-section p {
          font-size: 1rem;
          margin-bottom: 10px;
        }
        .sources {
          background-color: #fff;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 4px;
          font-size: 0.95rem;
          margin-top: 15px;
        }
        .sources strong {
          display: block;
          margin-bottom: 5px;
        }
      `}</style>

      {/* Glowy Circle Background */}
      <div className="circle-bg"></div>

      <header>
        <h1>STAND AI</h1>
        <p>
          Advanced AI-driven fact-checking: Get a clear verdict (True/False), confidence level, and reliable sources instantly.
        </p>
      </header>

      <section className="input-section">
        <h2>Enter Your Statement</h2>
        <div className="input-container">
          <input
            type="text"
            id="userInput"
            placeholder="Type your statement here..."
          />
          <button onClick={checkStatement}>Check Fact</button>
        </div>
      </section>

      <section className="output-section">
        <h2>Result</h2>
        <p id="outputText">
          No result yet. Enter a statement and click “Check Fact”.
        </p>
        <div className="sources">
          <strong>SOURCES:</strong>
          <p id="sourcesText">None</p>
        </div>
      </section>
    </div>
  );
}

export default FactChecker;
