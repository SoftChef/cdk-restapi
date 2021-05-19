import * as authors from '../../seeds/authors';

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      authors: authors,
    }),
  };
}