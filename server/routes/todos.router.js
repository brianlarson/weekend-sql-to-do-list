const router = require('express').Router();
const pool = require('../modules/pool');

// ********************
// ! 🙀 Oh C.R.U.D.!
// ********************

// ! CREATE
// POST - add a new todo to the db
router.post("/", (req, res) => {

  // Run SQL query statement to add new todo to db with pg.Pool
  // TODO Figure out why $1 replacement for SQL injection security doesn't work
  // * $1, $2 etc. used in template for security against SQL injection
  // * Also, note that sequel statements require terminator at end ";" or an
  // * error will occur
  const statement = `INSERT INTO "todos"("text") VALUES ('${req.body.text}');`;
  pool.query(statement)
    // That worked so log it and return HTTP created status
    .then(result => {
      console.log("Adding todo to db…");
      res.sendStatus(201);
  })
    .catch(error => {
      // Log error and send HTTP error status
      console.log("Error adding todo to database…", error);
      res.sendStatus(500);
  });

});

// ! READ
// GET - get and return all todos from db
router.get("/", (req, res) => {

  // Run SQL query statement with pg.Pool to retrieve todos
  // ordered by ID
  let statement = `SELECT * FROM "todos" ORDER BY "id" ASC;`;
  pool.query(statement)
    .then(result => {
      // That worked so log it and return the db rows/todo items
      // console.log("Getting todos from db…", result.rows);
      res.send(result.rows);
  })
    .catch(error => {
      // Log error and send HTTP error status
      console.log("Error getting todos from database…", error);
      res.sendStatus(500);
  });

});

// ! UPDATE
// TODO: Set up PUT router for changing `isComplete` status
// PUT - update a todo from the db
router.put("/", (req, res) => {

 // Run SQL query statement with pg.Pool to delete todo by ID
  let statement = `UPDATE "todos" SET "isComplete" = ${req.body.isComplete} WHERE "id" = ${req.body.id};`;
  console.log(`req.body`, req.body);
  console.log(`SQL statement:`, statement);
  pool.query(statement)
   .then(result => {
    // That worked so return an OK status
    res.sendStatus(200);
 })
   .catch(error => {
     // Log error and send HTTP error status
     console.log("Error getting todos from database…", error);
     res.sendStatus(500);
 });

});

// ! DELETE
// DELETE - delete a todo from the db
router.delete("/", (req, res) => {
  console.log(`req.body is:`, req.body);
  // Run SQL query statement with pg.Pool to delete todo by ID
  let statement = `DELETE FROM "todos" WHERE "id" = ${req.body.id};`;
  pool.query(statement)
   .then(result => {
    // That worked so return an OK status
    res.sendStatus(200);
 })
   .catch(error => {
     // Log error and send HTTP error status
     console.log("Error getting todos from database…", error);
     res.sendStatus(500);
 });

});

module.exports = router;