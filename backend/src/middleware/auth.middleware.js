import * as utils from "../utils/utils.js";
export async function authmiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
  const decoded = utils.verifyJWT(token);
  if (!decoded) {
    res.status(401).json({
      messsage: "Unauthorized",
    });
  }
  req.user = decoded;
  next()
}
