const obj = {
    addEvent: (key, value) => {
        if (!obj[key]) obj[key] = []
        obj[key].push(value)
        obj[key] = obj[key].slice(0, 100)
    }
}

module.exports = obj