# Node-Redis-App

# Todo API Caching with Express and Redis

This project is a simple Express application that fetches todo items from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com) and caches the results using Redis. The application returns cached results when available, reducing the number of API calls and improving performance.

## Features

- Fetches todo items by ID from an external API.
- Caches results in Redis to minimize API requests.
- Returns data from cache if available.
- Handles errors gracefully.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [Redis](https://redis.io/) (ensure it's running)

## Installation

1. Clone the repository:

   git clone https://github.com/Vaishnavi2206/Node-Redis-App
   cd node-redis-app

2. Install dependencies - npm install

3. Start redis server - redis-server

4. Start node application - node app.js

5. Open a REST client like Postman and hit -> http://localhost:3000/tasks/{todoId}


