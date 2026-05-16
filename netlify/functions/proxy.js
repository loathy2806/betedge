exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const url = event.queryStringParameters && event.queryStringParameters.url;
  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing url parameter' }) };
  }

  // Only allow Sportmonks API calls
  if (!url.startsWith('https://api.sportmonks.com/')) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Only Sportmonks API allowed' }) };
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
