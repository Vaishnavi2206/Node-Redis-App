const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(todoId) {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function getTasksData(req, res) {
  const todoId = req.params.todoId;
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(todoId);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData(todoId);
      if (results.length === 0) {
        throw new Error("API returned an empty array");
      }
      await redisClient.set(todoId, JSON.stringify(results));
    }

    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

app.get("/tasks/:todoId", getTasksData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});