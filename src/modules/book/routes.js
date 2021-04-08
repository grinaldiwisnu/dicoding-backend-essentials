const router = require('express').Router();
const {
  createBook, getAllBook, getDetailBook, updateBook, deleteBook,
} = require('./books');

router.get('/', getAllBook);
router.get('/:bookId', getDetailBook);
router.post('/', createBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

module.exports = router;
