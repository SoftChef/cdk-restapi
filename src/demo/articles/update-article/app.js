'use strict'

exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      updated: true
    })
  }
}