function authToken(req, res, next) {
  if (
    !req.body.token &&
    !req.query.token &&
    !req.headers["x-access-token"] &&
    !req.headers["authorization"]
  ) {
    return res.status(404).json({
      status: false,
      message: "User not authenticated",
    });
  }

  const authHeader = req.headers["authorization"];

  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  if (
    token ===
    "SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE="
  ) {
    return next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Invalid Token",
    });
  }
}

module.exports = {
  authToken,
};
