import { ApiError } from "../middlewares/api-error.js";
import Account from "../models/Account.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUserController = async (req, res, next) => {
  try {
    const getAll = await User.find()
      .populate({
        path: "account_id",
        select: "username",
      })
      .populate({
        path: "role_id",
        select: "role_name description",
      })
      .select("fullname avatar email birthday");

    const excludeAdmin = getAll.filter(
      (item) => item.role_id?.role_name !== "Admin"
    );
    return res.status(200).json(excludeAdmin);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const getUser = await User.findById(user_id)
      .populate({
        path: "account_id",
        select: "username",
      })
      .populate({
        path: "role_id",
        select: "role_name description",
      })
      .select("fullname avatar email");

    if (!getUser) {
      return next(new ApiError(404, "User not found"));
    }

    return res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const { user_id } = req.account;
    const getUser = await User.findById(user_id)
      .populate({
        path: "account_id",
        select: "username",
      })
      .populate({
        path: "role_id",
        select: "role_name description",
      })
      .select("fullname avatar email");

    if (!getUser) {
      return next(new ApiError(404, "User not found"));
    }

    return res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const user_id = req.params.id;

    const deleteUser = await User.findByIdAndDelete(user_id);

    if (!deleteUser) {
      return next(new ApiError(404, "User not found"));
    }

    await Account.findByIdAndDelete(deleteUser.account_id);

    return res.status(201).send("User deleted successfully");
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const id = await req.account.user_id;

    const { fullname, email } = req.body;

    const update = await User.findByIdAndUpdate(
      id,
      { fullname, email },
      { new: true }
    )
      .populate("account_id", "username")
      .select("-role_id");

    if (!update) {
      return next(new ApiError(404, "User not found"));
    }

    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = await req.params.id;
    console.log("id: ", id);

    const { fullname, email, role_id, username } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }
    // console.log('user: ', user);

    const accountUpdate = await Account.findByIdAndUpdate(user.account_id, {
      username,
    });

    if (!accountUpdate) {
      return next(new ApiError(404, "Account not found"));
    }

    const userUpdate = await User.findByIdAndUpdate(
      id,
      { fullname, email, role_id },
      { new: true }
    )
      .populate("account_id", "username")
      .populate("role_id", "role_name description");

    if (!userUpdate) {
      return next(new ApiError(404, "User not found"));
    }

    return res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const createManyStudent = async (req, res, next) => {
  try {
    const data = req.body;

    await Promise.all(
      data.map(async (item) => {
        console.log("item: ", item);
        // throw new ApiError(400, "Maintain system");
        const existUser = await Account.findOne({ username: item?.username });

        if (existUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(item?.password + "", salt);

        const newAccount = await Account.create({
          username: item?.username,
          password: passwordHash,
        });

        await User.create({
          fullname: item?.fullname,
          email: item?.email,
          account_id: newAccount.id,
          role_id: "64fa8e778552d8ecf9efcbad",
        });
      })
    );

    return res.status(201).json("Tạo thành công");
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
