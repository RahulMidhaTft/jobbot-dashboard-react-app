const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const data = require("./data.json");
const ACCESS_TOKEN_SECRET =
  "9c29e15f63d6800c1795852ecfb32c6b85e76334856dd7944f926c24062cbfd90f0";
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body.data;
  if (username !== "admin" && password !== "admin") {
    return res.status(401).send("Unauthorized");
  }

  const token = jwt.sign(
    {
      username: "admin",
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const date = new Date();
  date.setHours(date.getHours() + 1);
  return res.json({
    token,
    expiresIn: date,
  });
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  let isValid = false;
  if (token) {
    try {
      isValid = jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET);
    } catch (error) {
      isValid = false;
    }
  }
  if (!isValid) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

app.get("/api/dashboard/count", authenticate, (req, res) => {
  const { users, clicks, messages, profiles, subscriptions } = data;
  return res.json({
    users,
    clicks,
    messages,
    profiles,
    subscriptions,
  });
});

app.get("/api/dashboard/data", authenticate, (req, res) => {
  return res.json(data.data);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
