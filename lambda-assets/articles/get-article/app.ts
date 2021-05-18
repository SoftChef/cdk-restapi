import articles from '../../seeds/articles.json';

export async function handler(event: any) {
  const pathParameters = event.pathParameters || {};
  const articleId = pathParameters.articleId;
  const article = articles.find(article => article.id === articleId);
  if (article) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        article: article,
      }),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        article: null,
      }),
    };
  }
}