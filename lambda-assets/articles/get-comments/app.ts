import comments from '../../seeds/comments';

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      comments: comments,
    }),
  };
}