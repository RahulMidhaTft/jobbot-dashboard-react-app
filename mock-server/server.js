const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const data = require("./data.json");
app.use(cors());

app.get("/api/dashboard/count", (req, res) => {
  const { users, clicks, messages, profiles, subscriptions } = data;
  return res.json({
    users,
    clicks,
    messages,
    profiles,
    subscriptions,
  });
});

app.get("/api/dashboard/data", (req, res) => {
  return res.json(data.data);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
