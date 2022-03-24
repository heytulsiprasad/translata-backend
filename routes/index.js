const express = require('express');
const router = express.Router();

const { translateText, detectLanguage } = require("../utils")

/**
 * Server is working
 */

router.get('/', async function (req, res, next) {
  return res.json({ server: "ok" })
});

/**
 * Get translated data
 * @param {string} text - The text that is to be translated
 * @param {string} targetLang - The language that text should be translated into
 */

router.post("/translate", (req, res) => {
  const text = req.body.text;
  const targetLang = req.body.targetLang || "en"; // By default translate to english

  if (text) {
    translateText(text, targetLang)
      .then(data => {
        console.log(data);
        res.json({ before: text, after: data })
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
      })    
  } else {
    res.status(400).json({ error: "Send text to translate" })
  };

  return;
})

/**
 * Detect which language user sent
 * @param {string} text - The text that is to be detected for langugage
 */

router.post("/detect", (req, res) => {
  const text = req.body.text;

  if (text) {
      detectLanguage(text)
        .then(data => {
          console.log(data);
          res.json({ text, lang: data })
        })
        .catch(err => {
          console.error(err);
        })
  } else {
    res.status(400).json({ error: "Send text to detect" })
  };

  return;
})


module.exports = router;
