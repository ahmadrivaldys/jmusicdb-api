const { Catalog } = require('../models')

const index = async (req, res) =>
{
    try
    {
        Catalog
            .fetchAll({ withRelated: ['author'] })
            .orderBy('title')
            .then(catalogs =>
            {
                res.status(200)
                res.json({
                    statusCode: 200,
                    statusMessage: 'OK',
                    message: 'Successfully fetched all catalog data.',
                    data: catalogs
                })
            })
    }
    catch(error)
    {
        console.log(error)
        res.status(422).json(error)
    }
}

const store = async (req, res) =>
{
    //
}

const show = async (req, res) =>
{
    // 
}

const update = async (req, res) =>
{
    // 
}

const destroy = async (req, res) =>
{
    // 
}

module.exports =
{
    index,
    store,
    show,
    update,
    destroy
}