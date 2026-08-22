const API_KEY = 'alight_live_48243cc94c0c517ee76e91abc4bd1a69';
const BASE_URL = 'https://alightfree.my.id/api/v1';

const ALLOWED_ENDPOINTS = [
  'send-magiclink',
  'verify-account',
  'apply-premium',
  'auto-activate'
];

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        method: req.method
      });
    }

    const { endpoint } = req.query;

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        error: 'Endpoint tidak ditemukan'
      });
    }

    if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
      return res.status(404).json({
        success: false,
        error: 'Endpoint tidak diizinkan',
        endpoint
      });
    }

    const targetUrl = `${BASE_URL}/${encodeURIComponent(endpoint)}`;

    console.log('Target:', targetUrl);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(req.body || {})
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        success: false,
        error: 'Response bukan JSON',
        raw: text
      };
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('FUNCTION ERROR:', error);

    return res.status(500).json({
      success: false,
      error: 'Function crashed',
      message: error?.message || String(error),
      name: error?.name || 'UnknownError'
    });
  }
}      upstreamStatus: response.status,
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
