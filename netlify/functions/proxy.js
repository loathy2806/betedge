exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const url = event.queryStringParameters && event.queryStringParameters.url;
  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing url parameter' }) };
  }

  const allowed = [
    'https://api.sportmonks.com/',
    'https://api.oddspapi.io/'
  ];

  const isAllowed = allowed.some(function(prefix) {
    return url.startsWith(prefix);
  });

  if (!isAllowed) {
    return { statusCode: 403, body: JSON.stringify({ error: 'URL not allowed' }) };
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
