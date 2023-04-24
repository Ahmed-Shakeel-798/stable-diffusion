require('dotenv').config()
const express = require("express");
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const ACCEPT_TYPE_PNG = 'image/png'
const ACCEPT_TYPE_JSON = 'application/json'

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: process.env.STABLE_DIFF_API,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.AUTH_TOKEN
  },
};

app.post('/get-image-png', async (req, res) => {
  const prompt = req.body;
  try {
    config.headers['Accept'] = ACCEPT_TYPE_PNG;
    config.data = JSON.stringify(prompt);

    axios.request(config)
      .then((response) => {
        return res.status(200).send(response.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });

  } catch (e) {
    return res.status(400).send(e);
  }
});

app.post('/get-image-base64', async (req, res) => {
  const prompt = req.body;
  try {
    config.headers['Accept'] = ACCEPT_TYPE_JSON;
    config.data = JSON.stringify(prompt);

    axios.request(config)
      .then((response) => {
        return res.status(200).send(response.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });


  } catch (e) {
    return res.status(400).send(e);
  }
});


app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});