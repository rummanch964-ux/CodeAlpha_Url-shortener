const express = require('express');
const { nanoid } = require('nanoid');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// POST endpoint — receive long URL and generate a short code
app.post('/shorten', (req, res) => {
    const { original_url } = req.body;

    if (!original_url) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    // URL validation
    try {
        new URL(original_url);
    } catch (err) {
        return res.status(400).json({ error: 'This is not a valid URL. URL must start with http:// or https://' });
    }

    // Check if URL already exists
    db.get(`SELECT short_code FROM urls WHERE original_url = ?`, [original_url], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // return the same short URL if the URL has already been shortened
            return res.json({
                short_url: `http://localhost:${PORT}/${row.short_code}`,
                original_url: original_url,
                message: 'This URL has already been shortened.'
            });
        }

        // generate new short code
        const short_code = nanoid(6);

        db.run(
            `INSERT INTO urls (short_code, original_url) VALUES (?, ?)`,
            [short_code, original_url],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({
                    short_url: `http://localhost:${PORT}/${short_code}`,
                    original_url: original_url
                });
            }
        );
    });
});

// GET endpoint — fetch the original URL and redirect to it 
app.get('/:code', (req, res) => {
    const { code } = req.params;

    db.get(`SELECT original_url FROM urls WHERE short_code = ?`, [code], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.redirect(row.original_url);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});