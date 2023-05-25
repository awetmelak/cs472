const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(require('cors')());

const database = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'entries'
});

// connect once when setting up the server
database.connect(err => {
    if (err) {
        console.error('error connecting to database:', err);
        process.exit(1);
    }
});

app.route('/search/:term')
    .get((req, res) => {
        const term = req.params.term;
        const query = `SELECT * FROM entries WHERE word = '${term}'`;

        database.query(query, (err, result) => {
            console.log('query completed');
            if(err) {
                console.log(err.message);
                return;
            }
            res.json(result);
        });
    });

app.listen(3000, () => {
    console.log('server is listening on http://localhost:3000');
});
