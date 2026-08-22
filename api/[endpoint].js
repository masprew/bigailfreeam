export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: 'API function OK',
    method: req.method,
    endpoint: req.query.endpoint || null
  });
}