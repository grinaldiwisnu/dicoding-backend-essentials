/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const {
  getCurrentTime, ERROR, SUCCESS, VALIDATE,
} = require('../../utils');
const books = require('../../models/book');

module.exports = {
  createBook: (req, res) => {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.body;

    const id = nanoid(16);

    const finished = pageCount === readPage;
    const insertedAt = getCurrentTime();
    const updatedAt = insertedAt;

    const validate = VALIDATE({ name, pageCount, readPage }, 'insert');

    if (validate != null) {
      return ERROR(res, 400, 'fail', validate);
    }

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const result = books.filter((v) => v.id === id).length > 0;

    if (!result) {
      return ERROR(res, 500, 'error', 'Catatan gagal ditambahkan');
    }

    return SUCCESS(res, 201, 'success', 'Buku berhasil ditambahkan', { bookId: id });
  },
  getAllBook: (req, res) => {
    const { name, reading, finished } = req.query;

    let listBook = books;

    if (name != null) {
      listBook = listBook.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (reading != null) {
      listBook = listBook.filter((book) => (parseInt(reading, 10) === 1 ? book.reading === true : book.reading === false));
    }
    if (finished != null) {
      listBook = listBook.filter((book) => (parseInt(finished, 10) === 1 ? book.finished === true : book.finished === false));
    }

    listBook = listBook.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return SUCCESS(res, 200, 'success', '', { books: listBook });
  },
  getDetailBook: (req, res) => {
    const { bookId } = req.params;

    const found = books.filter((book) => book.id === bookId)[0];

    if (found === undefined || found == null) {
      return ERROR(res, 404, 'fail', 'Buku tidak ditemukan');
    }

    return SUCCESS(res, 200, 'success', '', { book: found });
  },
  updateBook: (req, res) => {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.body;

    const id = req.params.bookId;

    const finished = pageCount === readPage;

    const validate = VALIDATE({ name, pageCount, readPage }, 'update');

    if (validate != null) {
      return ERROR(res, 400, 'fail', validate);
    }

    const findPosition = books.findIndex((book) => book.id === id);

    if (findPosition >= 0) {
      books[findPosition] = {
        ...books[findPosition],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        getCurrentTime,
      };

      return SUCCESS(res, 200, 'success', 'Buku berhasil diperbarui');
    }

    return ERROR(res, 404, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan');
  },
  deleteBook: (req, res) => {
    const id = req.params.bookId;

    const findPosition = books.findIndex((book) => book.id === id);

    if (findPosition >= 0) {
      books.splice(findPosition, 1);

      return SUCCESS(res, 200, 'success', 'Buku berhasil dihapus');
    }

    return ERROR(res, 404, 'fail', 'Buku gagal dihapus. Id tidak ditemukan');
  },
};
