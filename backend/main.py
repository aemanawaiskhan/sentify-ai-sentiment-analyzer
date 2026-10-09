import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import mysql.connector

# Create FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("sentiment_model.pkl")

# Load TF-IDF vectorizer
vectorizer = joblib.load("tfidf_vectorizer.pkl")
db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME", "sentiment_db")
)


@app.get("/")
def home():
    return {"message": "Sentiment Analysis API is running"}


@app.post("/predict")
def predict_sentiment(data: dict):
    text = data["text"]

    text_tfidf = vectorizer.transform([text])
    prediction = model.predict(text_tfidf)

    sentiment = prediction[0]

    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO analyses (text, sentiment) VALUES (%s, %s)",
        (text, sentiment)
    )

    db.commit()
    cursor.close()

    return {
        "text": text,
        "sentiment": sentiment
    }
@app.get("/history")
def get_history():
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM analyses ORDER BY id DESC"
    )

    history = cursor.fetchall()
    cursor.close()

    return history