export default function (err, req, res, next) {
  console.error(err);
  return res.status(500).json({ success: false, message: 'internal server error' });
}
