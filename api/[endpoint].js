const API_KEY = 'alight_live_48243cc94c0c517ee76e91abc4bd1a69';
const BASE_URL = '/api';

const ALLOWED_ENDPOINTS = [
  'send-data',
  'verify-data'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  const { endpoint } = req.query;

  if (!endpoint || !ALLOWED_ENDPOINTS.includes(endpoint)) {
    return res.status(404).json({
      success: false,
      error: 'Endpoint tidak tersedia'
    });
  }

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
