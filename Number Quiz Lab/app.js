const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

const sequences = [
    { seq: [1, 3, 9, 27, 81], next: 243, explanation: 'powers of 3' },
    { seq: [1, 1, 2, 3, 5], next: 8, explanation: 'fibonacci' },
    { seq: [1, 4, 9, 16, 25], next: 36, explanation: 'squares' },
    { seq: [2, 3, 5, 7, 11], next: 13, explanation: 'primes' },
    { seq: [1, 2, 4, 8, 16], next: 32, explanation: 'powers of 2' },
];

app.get('/', (req, res) => {
    if (!req.session.score) {
        req.session.score = 0;
        req.session.quizIndex = 0;
    }

    if (req.session.quizIndex >= sequences.length) {
        res.render('end', { score: req.session.score, total: sequences.length });
    } else {
        res.render('quiz', { sequence: sequences[req.session.quizIndex].seq, score: req.session.score });
    }
});

app.post('/', (req, res) => {
    const answer = parseInt(req.body.answer, 10);
    if (answer === sequences[req.session.quizIndex].next) {
        req.session.score += 1;
    }

    req.session.quizIndex += 1;
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
