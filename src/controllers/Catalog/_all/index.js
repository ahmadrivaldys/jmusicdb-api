// Importing models
const Catalog = require('../../../models/Catalog')

const all = async (req, res, next) =>
{
    try
    {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.per_page) || 10

        const totalData = await Catalog.query()
            .count('id as id')
            .then(count => count[0].id)
        
        const getAllCatalogs = await Catalog.query()
            .select('id', 'title', 'release_date', 'image_cover', 'slug', 'created_at', 'updated_at')
            .withGraphFetched('[main_artists(selectMainArtists), featuring_artists(selectFeaturingArtists), type(selectCatalogType), author(selectAuthor)]')
            .modifiers({
                selectMainArtists: builder => builder.select('name'),
                selectFeaturingArtists: builder => builder.select('name'),
                selectCatalogType: builder => builder.select('name'),
                selectAuthor: builder => builder.select('fullname')
            })
            .offset((currentPage - 1) * perPage)
            .limit(perPage)
            .orderBy('title')

        if(!getAllCatalogs)
        {
            const error = new Error('Catalog data not found.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched all catalog data.',
                catalogs: getAllCatalogs,
                totalData,
                perPage,
                currentPage
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = all