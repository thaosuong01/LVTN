import { ApiError } from "../middlewares/api-error.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

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

    return res.status(200).json(getAll);
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

// export const getStudent = async (req, res, next) => {
//   try {
//     const role_id = req.params.id;

//     console.log(role_id);
//   } catch (error) {
//     console.log(error);
//     next(new ApiError(500, error.message));
//   }
// };

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
