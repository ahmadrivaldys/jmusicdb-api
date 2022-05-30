const { Model } = require('objection')
const knex = require('../../config/database')

Model.knex(knex)

module.exports =
{
    Model,
    knex
}