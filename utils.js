const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = require('./secrets/crucial-respect.json');
const translate = new Translate({ credentials: CREDENTIALS, projectId: CREDENTIALS.project_id });

const translateText = async (text, targetLangugage) => {
  try {
    const [translation] = await translate.translate(text, targetLangugage);
    return translation;
  } catch (error) {
    console.log("Error at translating text ", error);
    return;
  }
}

const detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log('Error at detect language ', error);
    return;
  }
};

module.exports = { translateText, detectLanguage }