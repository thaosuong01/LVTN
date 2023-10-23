import jwt from "jsonwebtoken";

export const isAuthentication = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader?.split(" ")[1];
    const decodeJwt = jwt.verify(token, process.env.JWT_SECRET);

    req.account = decodeJwt; //gán id cho req sau
    next();
  } catch (e) {
    console.log("ERROR:::", e);
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Expired tokens.");
    }
    return res.status(401).send("Invalid authentication!");
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { role_name } = req.account;
    if (role_name !== "Admin") {
      return res.status(401).send("Non-admin authentication!");
    }
    next();
  } catch (error) {
    return res.status(401).send("Invalid authentication!");
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const { role_name } = req.account;
    if (role_name !== "Teacher") {
      return res.status(401).send("Non-teacher authentication!");
    }
    next();
  } catch (error) {
    return res.status(401).send("Invalid authentication!");
  }
};
