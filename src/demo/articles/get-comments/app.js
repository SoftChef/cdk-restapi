'use strict'

const comments = require('../../seeds/comments.json')

exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      comments: comments
    })
  }
}