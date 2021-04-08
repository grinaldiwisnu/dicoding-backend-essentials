const getCurrentTime = () => new Date().toISOString();
const ERROR = (res, code, status, message) => {
  res.header('Access-Control-Allow-Origin', '*');
  return res.status(code).json({
    status,
    message,
  });
};
const SUCCESS = (res, code, status, message, data) => {
  let response;
  if (message === '' || message === '' || message == null) {
    response = {
      status,
      data,
    };
  } else if (data === '' || data === '' || data === null) {
    response = {
      status,
      message,
    };
  } else {
    response = {
      status,
      message,
      data,
    };
  }
  res.header('Access-Control-Allow-Origin', '*');
  return res.status(code).json(response);
};
const VALIDATE = (params, type) => {
  if (params.name === null || params.name === undefined) {
    return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. Mohon isi nama buku`;
  } if (params.readPage > params.pageCount) {
    return `Gagal ${type === 'insert' ? 'menambahkan' : 'memperbarui'} buku. readPage tidak boleh lebih besar dari pageCount`;
  }

  return null;
};

module.exports = {
  getCurrentTime,
  ERROR,
  SUCCESS,
  VALIDATE,
};
