import { ApiError } from "../middlewares/api-error.js";
import Role from "../models/Role.js";

export const createRoleController = async (req, res, next) => {
  try {
    const { role_name, description } = await req.body;

    if (!role_name || !description) {
      throw new Error("Please fill all fields");
    }

    const existRole = await Role.findOne({ role_name });
    //exist user
    if (existRole) {
      return res.status(409).json("Role already exists");
    }

    const newRole = await Role.create({
      role_name: role_name,
      description: description,
    });

    return res.status(201).json(newRole);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getAllRoleController = async (req, res, next) => {
  try {
    const roles = await Role.find();

    return res.status(200).json(roles);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const updateRoleController = async (req, res, next) => {
  try {
    const { role_name, description } = await req.body;
    const role_id = await req.params.id;

    const updatedRole = await Role.findByIdAndUpdate(
      role_id,
      {
        role_name: role_name,
        description: description,
      },
      { new: true }
    );

    if (!updatedRole) {
      return next(new ApiError(404, "Role not found"));
    }

    return res.status(200).json(updatedRole);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getRoleByIdController = async (req, res, next) => {
  try {
    const role_id = req.params.id;
    const role = await Role.findById(role_id);

    if (!role) {
      return next(new ApiError(404, "Role not found"));
    }

    return res.status(200).json(role);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const deleteRoleController = async (req, res, next) => {
  try {
    const role_id = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(role_id);

    if (!deletedRole) {
      return next(new ApiError(404, "Role not found"));
    }

    return res.status(204).json({ message: "Role deleted successfully" });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
