export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      created: true,
    }),
  };
}