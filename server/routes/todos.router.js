const router = require('express').Router();
const pool = require('../modules/pool');

// Create GET router to get and return all to-dos from db
router.get("/", (req, res) => {
  // Set and run SQL query statement to retrieve todos
  // in order by ID
  let statement = `SELECT * FROM "todos" ORDER BY "id" ASC`;
  pool.query(statement)
    .then(result => {
      // That worked so log it and return the db
      // rows/todo items
      console.log("Getting todos from db…", result.rows);
      res.send(result.rows);
  })
    .catch(error => {
      // Log error and send HTTP status
      console.log("Error getting todos from database…", error);
      res.sendStatus(500);
  });
});

module.exports = router;