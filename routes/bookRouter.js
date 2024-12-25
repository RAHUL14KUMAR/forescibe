const express = require('express');
const router = express.Router();

const { addBook, getAllBooksInPaginatedForm, updateBook, deleteBook, getBookById, fuzzySearch } = require('../controllers/BookController');


router.get('/', getAllBooksInPaginatedForm);
router.get('/:id', getBookById);
router.get('/search/query', fuzzySearch);

router.post('/', addBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router;