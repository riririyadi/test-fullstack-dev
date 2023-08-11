const { default: axios } = require("axios");
const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");

const jobRouter = express.Router();

jobRouter.get("/job/:pageNumber", authenticateJWT, async (req, res, next) => {
  try {
    const { pageNumber } = req.params;
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${pageNumber}`
    );
    res.send(response.data.filter((d) => d !== null));
  } catch (error) {
    next(error);
  }
});

jobRouter.get("/job/:id", authenticateJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
    );
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

jobRouter.post("/job", authenticateJWT, async (req, res, next) => {
  try {
    const { param1, param2, param3 } = req.body;
    console.log(req.body);
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${param1}&location=${param2}`
    );

    res.send(
      param3
        ? response.data.filter((d) => d.type === "Full Time")
        : response.data
    );
  } catch (error) {
    next(error);
  }
});

module.exports = jobRouter;
