const express = require("express");
const app = express();

app.use(express.json());

const data = require("./books.json");

app.get("/books", (req, res) => {
  readBooks(req, res);
});
app.get("/books/:id", (req, res) => {
  readBook(req, res);
});
app.post("/books", (req, res) => {
  createBook(req, res);
});
app.put("/books/:id", (req, res) => {
  updateBook(req, res);
});
app.delete("/books/:id", (req, res) => {
  deleteBook(req, res);
});

const createBook = (req, res) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).send("invalid request");
  }

  const newBook = {
    id: data.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  data.push(newBook);

  res.status(201);
  res.send("Book created!");
};

const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const author = req.body.author;

  if (!id || !title || !author) {
    return res.status(400).send("invalid request");
  }

  const book = data.find((book) => book.id === id);

  if (!book) {
    return res.status(404).send("book not found");
  }

  book.title = title;
  book.author = author;

  res.status(200).send(`Book ${id} has changed`);
};

const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).send("invalid request");
  }

  const book = data.find((book) => book.id === id);

  if (!book) {
    return res.status(404).send("book not found");
  }

  const index = data.indexOf(book);

  data.splice(index, 1);

  res.status(200).send(`Book ${id} has been deleted.`);
};

const readBooks = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(data);
};

const readBook = (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).send("invalid request");
  }
  const book = data.find((book) => book.id === id);

  if (!book) {
    return res.status(404).send("book not found");
  }

  const index = data.indexOf(book);

  res.setHeader("Content-Type", "application/json");
  res.status(200).send(data[index]);
};

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
