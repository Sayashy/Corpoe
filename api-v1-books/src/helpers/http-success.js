const makeHttpSuccess = ({ statusCode, data }) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        data
    }
}

export default makeHttpSuccess;