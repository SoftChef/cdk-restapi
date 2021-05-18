'use strict'

const authors = require('../../seeds/authors.json')

exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      authors: authors
    })
  }
}