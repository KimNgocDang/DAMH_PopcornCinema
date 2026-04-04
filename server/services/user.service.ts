import { User } from "../schemas/user.schema";

export const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const changeUserRole = async (id: string, role: "CUSTOMER" | "ADMIN") => {
  const user = await User.findByIdAndUpdate(id, { role }, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const changeUserStatus = async (id: string, status: "ACTIVE" | "INACTIVE") => {
  const user = await User.findByIdAndUpdate(id, { status }, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("User not found");
  return user;
};
