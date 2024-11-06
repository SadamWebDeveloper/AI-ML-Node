const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const sentiment = new Sentiment();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to analyze sentiment
app.post('/analyze-feedback', (req, res) => {
    const { feedback } = req.body;
    
    // Analyze sentiment
    const result = sentiment.analyze(feedback);
    const response = {
        feedback,
        sentimentScore: result.score,
        isPositive: result.score > 0
    };

    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
