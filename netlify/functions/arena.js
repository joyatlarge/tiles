exports.handler = async (event) => {
  const path = event.queryStringParameters?.path || '';
  const token = process.env.ARENA_TOKEN;
  const url = `https://api.are.na/v2${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log('ARE.NA STATUS:', res.status);
    console.log('ARE.NA RESPONSE:', JSON.stringify(data).slice(0, 500));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log('ERROR:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
