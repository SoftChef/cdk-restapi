import authors from '../../seeds/authors';

export async function handler(event: any) {
  const pathParameters = event.pathParameters || {};
  const authorId = pathParameters.authorId;
  const author = authors.find((item: any) => item.id === authorId);
  if (author) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        author: author,
      }),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        author: null,
      }),
    };
  }
}