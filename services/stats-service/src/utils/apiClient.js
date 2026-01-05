const axios = require("axios");

if (!process.env.MATCHES_SERVICE_URL || !process.env.USERS_SERVICE_URL) {
  console.error("❌ Missing service URLs in .env");
}

const matchesAPI = axios.create({
  baseURL: process.env.MATCHES_SERVICE_URL
});

const usersAPI = axios.create({
  baseURL: process.env.USERS_SERVICE_URL
});

module.exports = { matchesAPI, usersAPI };
