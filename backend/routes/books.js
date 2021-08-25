const { Router } = require('express');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');
const Book = require('../models/book');

router.get('/', async (request, response) => {
  const books = await Book.find().sort('-_id');
  response.json(books);
});

router.post('/', async (request, response) => {
  const { title, author, isbn } = request.body;
  const imgPath = '/uploads/' + request.file.filename;
  const newBook = new Book({ title, author, isbn, imgPath });
  await newBook.save();
  response.json({ message: 'Book Saved' });
});

router.delete('/:id', async (request, response) => {
  const book = await Book.findByIdAndDelete(request.params.id);
  await unlink(path.resolve('./backend/public' + book.imgPath));
  response.json({ message: 'Book Deleted' });
});

module.exports = router;
