const API_KEY = 'alight_live_48243cc94c0c517ee76e91abc4bd1a69';
const BASE_URL = 'https://alightfree.my.id/api/v1';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  const { endpoint } = req.query;

  console.log('Endpoint:', endpoint);
  console.log('Target:', `${BASE_URL}/${endpoint}`);

  try {
    const response = await fetch(
      `${BASE_URL}/${encodeURIComponent(endpoint)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(req.body || {})
      }
    );

    const text = await response.text();

    return res.status(response.status).json({
      proxy: true,
      target: `${BASE_URL}/${endpoint}`,
      upstreamStatus: response.status,
      upstreamResponse: text
    });

  } catch (error) {
    return res.status(500).json({
      proxy: false,
      error: error.message
    });
  }
}      `${BASE_URL}/${encodeURIComponent(endpoint)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(req.body || {})
      }
    );

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        success: false,
        error: text || 'Response API tidak valid'
      };
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('API proxy error:', error);

    return res.status(502).json({
      success: false,
      error: 'Tidak dapat menghubungi server API',
      detail: error.message
    });
  }
}
