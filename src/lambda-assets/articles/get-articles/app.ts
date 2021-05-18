import articles from '../../seeds/articles';

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      articles: articles,
    }),
  };
}