import authors from '../../seeds/authors.json';

export async function handler(event: any) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      authors: authors,
    }),
  };
}