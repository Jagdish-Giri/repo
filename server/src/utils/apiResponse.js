export const sendSuccess = (res, data, message = 'ok', meta = undefined) => res.json({ success: true, message, data, meta });
