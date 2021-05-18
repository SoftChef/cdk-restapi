import articles from '../../seeds/articles.json';

export async function handler(event: any) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      articles: articles,
    }),
  };
}