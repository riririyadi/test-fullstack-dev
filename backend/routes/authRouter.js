const jwt = require("jsonwebtoken");
const express = require("express");
const authRouter = express.Router();

const accessTokenSecret = "youraccesstokensecret";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "riri",
  host: "localhost",
  database: "riri",
  password: "postgres",
  port: 5432,
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    let user;
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);

      user = results.rows.find((u) => {
        return u.username === username && u.password === password;
      });
      if (user) {
        // Generate an access token
        const accessToken = jwt.sign(
          { username: user.username },
          accessTokenSecret
        );

        res.json({
          accessToken,
        });
      } else {
        res.send("Username or password incorrect");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
