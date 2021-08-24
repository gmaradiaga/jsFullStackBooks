const { Router, json } = require('express');
const { unlink } = require('fs-extra');
const path = require('path');
const book = require('../models/book');
const router = Router();

require('../models/book');

router.get('/', async (request, response) => {
  const books = await book.find();
  response.json(books);
});

router.post('/', async (request, response) => {
  const { title, author, isbn } = request.body;
  const imgPath = '/uploads/' + request.file.filename;
  const newBook = new book({ title, author, isbn, imgPath });
  await newBook.save();
  response.json({ message: 'Book Saved' });
});

router.delete('/:id', async (request, response) => {
  const delBook = await book.findByIdAndDelete(request.params.id);
  unlink(path.resolve('./backend/public' + delBook.imgPath));
  response.json({ message: 'Book Deleted' });
});

module.exports = router;
