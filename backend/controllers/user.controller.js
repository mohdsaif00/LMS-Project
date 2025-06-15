export async function logout(req, res) {
  const userId = req.userId;

  if (!userId) {
    return res.json({
      msg: 'please provide id',
    });
  }

  const cookieOption = {
    httpOnly: true,
    source: process.env.NODE_ENV,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 100,
  };
  res.clearCookie('accessToken', cookieOption);

  return res.json({
    message: 'Logged Out',
  });
}
