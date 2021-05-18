'use strict'

const authors = require('../../seeds/authors.json')

exports.handler = async(event) => {
  const pathParameters = event.pathParameters || {}
  const authorId = pathParameters.authorId
  const author = authors.find(author => author.id === authorId)
  if (author) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        author: author
      })
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        author: null
      })
    }
  }
}