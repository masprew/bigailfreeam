export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: 'API function OK',
    method: req.method,
    endpoint: req.query.endpoint || null
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
