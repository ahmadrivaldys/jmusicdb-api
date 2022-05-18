const table = require('../../config/tables')
const database = require('../../config/database')

const Song = database.model('Song', {
    tableName: table.songs,
    visible: [
        'id',
        'title',
        'track_no',
        'release_date',
        'duration',
        'slug',
        'created_at',
        'updated_at',
        'catalog.id',
        'catalog.title',
        'catalog.type.name',
        'catalog.slug',
        'author.fullname'
    ],
    author()
    {
        return this.belongsTo(Admin, 'author_id', 'uuid')
    },
    catalog()
    {
        return this.belongsTo(Catalog, 'catalog_id')
    }
})

const Admin = database.model('Admins', {
    tableName: table.admin_accounts,
    hidden: ['password', 'account_type_id']
})

const Catalog = database.model('Catalogs', {
    tableName: table.catalogs,
    author()
    {
        return this.belongsTo(Admin, 'author_id', 'uuid')
    },
    type()
    {
        return this.belongsTo(CatalogType, 'catalog_type_id')
    }
})

const CatalogType = database.model('CatalogTypes', {
    tableName: table.catalog_types
})

module.exports = Song