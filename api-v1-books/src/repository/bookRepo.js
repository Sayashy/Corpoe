const makeBookRepo = ({ database }) => {
    return Object.freeze({
        addBook,
        findAll,
        findOne,
        updateBook,
        deleteBook
    });

    /**
    * Find One Book.
    * @param {number} isbn - isbn of the book
    */
    async function findOne({ isbn }) {
        try {
            const db = await database;
            const Book = db.Book;

            return Book.findOne({ where: { 'isbn': isbn } }).then(data => {
                return {
                    success: true,
                    item: data
                }
            }).catch(err => {
                return {
                    success: false,
                    error: err.message
                }
            });

        }
        catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    /**
    * Get All Books.
    */
    async function findAll() {
        try {
            const db = await database;
            const Book = db.Book;


            return Book.findAll().then(data => {
                return {
                    success: true,
                    items: data
                }
            }).catch(err => {
                return {
                    success: false,
                    error: err.message
                }
            });

        }
        catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    /**
    * Update One Book.
    * @param {Object} Book - Object with model keys -> check models folder
    */
    async function updateBook({ ...params }) {
        try {
            const db = await database;
            const Book = db.Book;

            const count = await Book.count({
                where: {
                    isbn: params.isbn
                }
            })

            if (count > 0) {

                return Book.update(params, { where: { 'isbn': params.isbn } }).then(num => {
                    if (num == 1) {
                        return {
                            success: true,
                            message: "Book was updated successfully."
                        }
                    } else {
                        return {
                            success: false,
                            error: `Cannot update Book with isbn=${params.isbn} !`
                        }
                    }

                }).catch(err => {
                    return {
                        success: false,
                        error: err.message
                    }
                });

            } else {
                return {
                    success: false,
                    error: "This book doesn't exists !"
                }
            }

        }
        catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    /**
    * Add One Book.
    * @param {Object} Book - Object with model keys -> check models folder
    */
    async function addBook({ ...params }) {

        try {
            const db = await database;
            const Book = db.Book;

            const count = await Book.count({
                where: {
                    isbn: params.isbn
                }
            })

            if (count < 1) {
                return Book.create(params).then(data => {
                    return {
                        success: true,
                        created: data
                    }
                }).catch(err => {
                    return {
                        success: false,
                        error: err.message
                    }
                });
            }
            else {
                return {
                    success: false,
                    error: "This book already exists !"
                }
            }
        }
        catch (err) {
            return {
                success: false,
                error: err.message
            }
        }

    }

    /**
    * Find One Book.
    * @param {number} isbn - isbn of the book
    */
    async function deleteBook({isbn}) {
        try {
            const db = await database;
            const Book = db.Book;

            const count = await Book.count({
                where: {
                    isbn: isbn
                }
            })

            if (count > 0) {

                return Book.destroy({ where: { 'isbn': isbn } }).then(num => {
                    if (num == 1) {
                        return {
                            success: true,
                            message: "Book was deleted successfully."
                        }
                    } else {
                        return {
                            success: false,
                            error: `Cannot delete Book with isbn=${params.isbn} !`
                        }
                    }

                }).catch(err => {
                    return {
                        success: false,
                        error: err.message
                    }
                });

            } else {
                return {
                    success: false,
                    error: "This book doesn't exists !"
                }
            }

        }
        catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

}

export default makeBookRepo;