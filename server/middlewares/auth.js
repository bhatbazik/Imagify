import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({ sucesss: false, message: "Not  authorized Please login" });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.status(401).json({ sucesss: false, message: "Not authorized Please login" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ sucesss: false, message: error.message });
  }
};

export default userAuth;