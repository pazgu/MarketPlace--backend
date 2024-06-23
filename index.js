const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware - run this for every request
app.use(express.json());

app.get("/", (req, res) => {
  const { name } = req.query;
  res.send(`ok ${name}`);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`item  ${id} was deleted`);
});

app.post("/", (req, res) => {
  const person = req.body;
  res.send(`item ${person.name} was created`);
});

app.listen(PORT, () => console.log(`app runing on port ${PORT}`));
