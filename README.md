# Sentify — AI Sentiment Analyzer

A full-stack sentiment analysis web application that classifies text as **Positive, Negative, or Neutral** using Machine Learning.

## Features

- Real-time sentiment predictions through a FastAPI backend
- React-based user interface
- Machine Learning model trained using TF-IDF and Multinomial Naive Bayes
- Three sentiment categories: Positive, Negative, and Neutral
- REST API for sending text and receiving predictions

## Tech Stack

**Frontend:** React.js, JavaScript, CSS
**Backend:** Python, FastAPI
**Machine Learning:** Scikit-learn, TF-IDF, Multinomial Naive Bayes

## Project Structure

```text
Sentify-AI-Sentiment-Analyzer/
├── backend/
│   ├── main.py
│   ├── sentiment_model.pkl
│   └── tfidf_vectorizer.pkl
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### 1. Run the Backend

Open a terminal in the project folder and run:

```bash
cd backend
python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies listed in `requirements.txt`, then start the API:

```bash
uvicorn main:app --reload
```

The API will run at `http://127.0.0.1:8000`.

API documentation: `http://127.0.0.1:8000/docs`

### 2. Run the Frontend

Open a **second terminal** in the main project folder:

```bash
cd frontend
npm install
npm start
```

The React application will open at `http://localhost:3000`.

## Model Performance

The model achieved **90% accuracy** on the project's test split. Actual performance may vary with new text.

## Purpose

This project demonstrates practical skills in frontend development, API integration, Python, and Machine Learning.

---

**Built with React.js, FastAPI, Python, and Machine Learning.**
