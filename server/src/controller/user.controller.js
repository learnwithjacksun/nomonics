import UserModel from "../model/user.model.js";

const onError = (res, error) => {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile Has been updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    onError(res, error);
  }
};
