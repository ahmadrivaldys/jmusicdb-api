const CatalogType = require('../../../models/CatalogType')

const catalogTypes = async (req, res, next) =>
{
    try
    {
        const getCatalogTypes = await CatalogType.query()

        if(!getCatalogTypes)
        {
            const error = new Error('Catalog type not found.')
            error.statusCode = 404
            throw error
        }
        
        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched all catalog type.',
                catalogTypes: getCatalogTypes
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = catalogTypes