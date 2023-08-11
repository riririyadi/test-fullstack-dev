const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRouter = require("./routes/authRouter");
const jobRouter = require("./routes/jobRouter");
const router = express.Router();
router.use(authRouter);
router.use(jobRouter);

app.use(morgan("tiny"));
app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
