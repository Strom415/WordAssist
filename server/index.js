const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const wd = require('word-definition');

const db = require('../db/index.js');

const app = express();
const port = 3087;

app.use(express.static(path.resolve(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dictionary = db.makeDictionary('./db/dictionary-max-9.txt');

app.get('/anagrams/', (req, res) => {
  wd.getDef("pretty", "en", null, (def) => { console.log(def); });
  db.anagrams(req.query.data, dictionary, (anagrams) => { res.end(JSON.stringify(anagrams)); });
});

app.get('/definition/', (req, res) => {
  wd.getDef(req.query.data, "en", null, (def) => { res.end(JSON.stringify(def)); });
});

app.listen(port, console.log(`listening on port ${port}`));