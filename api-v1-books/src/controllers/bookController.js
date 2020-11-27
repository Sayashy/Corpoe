import makeHttpError from '../helpers/http-error';
import makeHttpSuccess from '../helpers/http-success';

const makeBookController = ({ bookRepo }) => {
    const handle = (httpRequest) => {
        switch (httpRequest.method) {
            case 'GET':
                return getBooks(httpRequest);
            case 'POST':
                return addBook(httpRequest);
            case 'PATCH':
                return updateBook(httpRequest);
            case 'DELETE':
                return deleteBook(httpRequest);
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed`
                })
        }
    }
    return handle

    /**
    * List Books.
    * @param {Object} httpRequest - Request Object
    */
    async function getBooks(httpRequest) {

        const { isbn = null } = httpRequest.pathParams || {};

        try {
            let result = {}

            result = isbn ? await bookRepo.findOne({ isbn }) : await bookRepo.findAll()

            return makeHttpSuccess({
                statusCode: 200,
                data: JSON.stringify(result)
            })
        } catch (error) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            })
        }
    }

    /**
    * Add Book.
    * @param {Object} httpRequest - Request Object
    */
    async function addBook(httpRequest) {

        const { params } = httpRequest.body || {};

        try {

            let result = {}

            result = await bookRepo.addBook(params)

            if (result.success) {
                return makeHttpSuccess({
                    statusCode: 200,
                    data: JSON.stringify(result)
                })
            } else {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: result.error
                })
            }

        } catch (error) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            })
        }
    }

    /**
    * Update Book.
    * @param {Object} httpRequest - Request Object
    */
    async function updateBook(httpRequest) {

        const { params } = httpRequest.body || {};

        try {
            let result = {}

            result = await bookRepo.updateBook(params)

            if (result.success) {
                return makeHttpSuccess({
                    statusCode: 200,
                    data: JSON.stringify(result)
                })
            } else {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: result.error
                })
            }

        } catch (error) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            })
        }
    }

    /**
    * Delete Book.
    * @param {Object} httpRequest - Request Object
    */
    async function deleteBook(httpRequest) {

        const { isbn = null } = httpRequest.pathParams || {};

        try {
            if (isbn) {
                let result = {}

                result = await bookRepo.deleteBook({isbn})

                if (result.success) {
                    return makeHttpSuccess({
                        statusCode: 200,
                        data: JSON.stringify(result)
                    })
                } else {
                    return makeHttpError({
                        statusCode: 400,
                        errorMessage: result.error
                    })
                }
            }
            else {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: "Please insert a valid isbn."
                })
            }
        } catch (error) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: error.message
            })
        }
    }



}

export default makeBookController;