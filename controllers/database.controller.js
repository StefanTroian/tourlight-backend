"use strict"

const get = async function (req, res) {
    try {
        res.status(200).send({
            message: 'Tourlight works'
        })
    } catch (error) {
        res.status(500).send({
            message: `Server error ${error}`
        })
    }
}

module.exports = {
    get,
}