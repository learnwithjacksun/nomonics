import jwt from "jsonwebtoken";
import process from "process";

export const generateCookies = (user, res) => {
  if (!user || !user.id) {
    throw new Error("user is undefined or missing required fields");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );

  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return token;
};
