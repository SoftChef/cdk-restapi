'use strict'

const articles = require('../../seeds/articles.json')

exports.handler = async(event) => {
  const pathParameters = event.pathParameters || {}
  const articleId = pathParameters.articleId
  const article = articles.find(article => article.id === articleId)
  if (article) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        article: article
      })
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        article: null
      })
    }
  }
}