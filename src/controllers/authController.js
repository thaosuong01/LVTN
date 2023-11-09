import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../middlewares/api-error.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

export const createUserController = async (req, res, next) => {
  try {
    const { fullname, username, password, email, role_id } = req.body;

    if (!fullname || !username || !password || !email || !role_id) {
      throw new Error("Missing input!");
    }

    const existUser = await Account.findOne({ username });

    if (existUser) {
      return res.status(409).json("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAccount = await Account.create({
      username,
      password: passwordHash,
    });

    const newUser = await User.create({
      fullname,
      email,
      account_id: newAccount.id,
      role_id,
    });

    const populatedUser = await User.findOne(newUser)
      .populate("role_id", "role_name description")
      .populate("account_id", "username password");

    return res.status(201).json({ user: populatedUser });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });

    if (!account) {
      return next(new ApiError(404, "User not found"));
    }

    const isValid = await bcrypt.compare(password, account.password);

    if (!isValid) {
      return next(new ApiError(401, "Incorrect password"));
    }

    const user = await User.findOne({ account_id: account.id }).populate({
      path: "role_id",
      select: "role_name description",
    });
    const role_name = user?.role_id?.role_name;
    const user_id = user?._id;
    const jwtToken = jwt.sign({ user_id, role_name }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};


