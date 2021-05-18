'use strict'

const articles = require('../../seeds/articles.json')

exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      articles: articles
    })
  }
}