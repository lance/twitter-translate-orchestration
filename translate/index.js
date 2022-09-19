const { CloudEvent, HTTP } = require('cloudevents');
const { Translate } = require('@google-cloud/translate').v2;

// Use the Google translation API
const translate = new Translate();

// CloudEvent response defaults
const defaults = {
  source: "ksvc:translate",
  type: "knative.function.translation",
}

// Our handler function, invoked with a CloudEvent
const handle = async (_, event) => {
  if (!event || !event.data) return
  const data = event.data

  // Don't translate English tweets, just return the raw text
  if (data.lang === "en") {
    return HTTP.binary(new CloudEvent({
      ...defaults,
      data: data.text
    }));
  } else {
    return HTTP.binary(new CloudEvent({
      ...defaults,
      data: {
        // Return a CloudEvent with the English translated text
        ...await translate.translate(data.text, { to: "en", model: "base"}),
        // Include the original tweet text
        text: data.text,
      }
    }));
  }
};

module.exports = { handle };
