/**
 * Set the limit to 100 if there is no argument, and if there is an argument 
 * @param {number} req 
 *  @returns {number}
 */
function parse(req) {
    const startOfLimit = req.query.start === undefined ? 0 : parseInt(req.query.start)
    const limit = req.query.limit === undefined ? 100 : parseInt(req.query.limit)

    if (!(limit > 0 && limit <= 100)) {
        return {
            status: 400,
            message: 'Limit must be between 1 and 100'
        }
    }
    return {
        start: startOfLimit,
        limit: limit
    }
}


/**
 * Checks if the argument is in range of a day, week or year. 
 * @param {number} param 
 * @returns {number} 
 */
function parseStartDate(param) {
    switch (param.toLowerCase()) {
        case 'day':
            return  Date.now() - 86400000
        case 'week':
            return  Date.now() - 604800000
        case 'year':
            return  new Date(new Date().getFullYear(), 0, 1) - 0;
    }
}

module.exports = {
    parse,
    parseStartDate
}