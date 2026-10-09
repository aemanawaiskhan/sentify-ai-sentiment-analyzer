import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
  fetch("http://127.0.0.1:8000/history")
    .then((response) => response.json())
    .then((data) => setHistory(data))
    .catch((error) => console.error("Error fetching history:", error));
}, []);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const data = await response.json();
      setResult(data);
      const historyResponse = await fetch("http://127.0.0.1:8000/history");
const historyData = await historyResponse.json();
setHistory(historyData);
    } catch (error) {
      setResult({
        sentiment: "Error",
        text: "Could not connect to the API.",
      });
    }

    setLoading(false);
  };

  const getEmoji = () => {
    if (!result) return "🤖";

    if (result.sentiment === "Positive") return "😊";
    if (result.sentiment === "Negative") return "😞";
    if (result.sentiment === "Neutral") return "😐";

    return "⚠️";
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          Sentify
        </div>

        <div className="nav-badge">
          AI Sentiment Analyzer
        </div>
      </nav>

      <main className="main-container">

        <section className="hero">
          <div className="hero-badge">
            ✨ Powered by Machine Learning
          </div>

          <h1>
            Understand the
            <span> Emotion </span>
            Behind Words
          </h1>

          <p>
            Analyze text instantly using our intelligent sentiment
            analysis model powered by Python and Machine Learning.
          </p>
        </section>

        <section className="analyzer-card">

          <div className="card-header">
            <div>
              <h2>Analyze Your Text</h2>
              <p>Enter a sentence and discover its sentiment.</p>
            </div>

            <div className="ai-icon">
              ✨
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something like: I really love this product..."
          />

         <div className="input-footer">
  <span>{text.length} characters</span>

  <div className="button-group">
    <button
      className="clear-button"
      onClick={() => {
        setText("");
        setResult(null);
      }}
      disabled={!text && !result}
    >
      Clear
    </button>

    <button
      onClick={analyzeSentiment}
      disabled={loading || !text.trim()}
    >
      {loading ? "Analyzing..." : "Analyze Sentiment →"}
    </button>
  </div>
</div>

        </section>

        {result && (
          <section className={`result-card ${result.sentiment.toLowerCase()}`}>

            <div className="result-emoji">
              {getEmoji()}
            </div>

            <div className="result-content">
              <span className="result-label">
                ANALYSIS RESULT
              </span>

              <h2>{result.sentiment}</h2>

              <p>
                Your text has been classified as{" "}
                <strong>{result.sentiment}</strong>.
              </p>
            </div>

            <div className={`result-status ${result.sentiment.toLowerCase()}`}>
  ● {result.sentiment}
</div>

          </section>
        )}
        {history.length > 0 && (
  <section className="history-section">
    <div className="history-header">
      <div>
        <h2>Analysis History</h2>
        <p>Your previous sentiment analyses</p>
      </div>
    </div>

    <div className="history-list">
      {history.map((item) => (
        <div className="history-item" key={item.id}>
          <div className="history-text">
            <p>{item.text}</p>
            <small>{item.created_at}</small>
          </div>

          <span className={`history-sentiment ${item.sentiment.toLowerCase()}`}>
            {item.sentiment}
          </span>
        </div>
      ))}
    </div>
  </section>
)}

        <section className="info-section">

          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3>Fast Analysis</h3>
            <p>
              Get sentiment predictions in seconds.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🧠</div>
            <h3>Machine Learning</h3>
            <p>
              Powered by a trained Naive Bayes model.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Three Sentiments</h3>
            <p>
              Detect Positive, Negative and Neutral text.
            </p>
          </div>

        </section>

      </main>

      <footer>
        <p>
          Built with React.js • FastAPI • Python • Machine Learning
        </p>
      </footer>

    </div>
  );
}

export default App;