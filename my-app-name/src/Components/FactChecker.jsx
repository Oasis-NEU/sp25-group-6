import React, { useState } from 'react';
import axios from 'axios';

function FactChecker() {
  // State variables for form input, API response, and error handling
  const [claim, setClaim] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!claim.trim()) {
      setError("Please enter a claim.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send POST request to the backend
      const res = await axios.post("/api/app/verify-claim", { claim });
      setResponse(res.data.result);
    } catch (err) {
      setError("Error verifying claim. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Inline CSS for demonstration purposes.
          In production, consider using a separate .css file 
          and placing the font link in public/index.html. */}
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

        /* We will place the entire form in the same "input-section" style. */
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        textarea {
          width: 80%;
          max-width: 500px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        }

        button {
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
        button:hover {
          background-color: #c1662d;
        }

        /* Error/Response Text */
        .error-text {
          color: red;
          margin-top: 10px;
        }
        .response-text {
          margin-top: 10px;
          font-size: 1rem;
        }

      `}</style>

      {/* Glowy Circle Background */}
      <div className="circle-bg"></div>

      <header>
        <h1>STAND AI</h1>
        <p>
          Advanced AI-driven fact-checking: Get a clear verdict (True/False), 
          confidence level, and reliable sources instantly.
        </p>
      </header>

      <section className="input-section">
        <h2>Enter Your Statement</h2>

        {/* The Claim Form (merged from ClaimForm.jsx) */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Enter a claim..."
            rows={4}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Claim"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {response && (
          <p className="response-text">
            <strong>Result:</strong> {response}
          </p>
        )}
      </section>
    </div>
  );
}

export default FactChecker;
