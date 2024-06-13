const jwt = require("jsonwebtoken");
const adminRegisterSchema = require("../schemas/admin/register.schema");
const accountSchema = require("../schemas/account/account.schema");

const { globalMessages } = require("./messages");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error(globalMessages.unauthorized);
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const secret = process.env.SECRETKEY;
    const decoded = jwt.verify(token, secret);
    const user = await adminRegisterSchema.findById(decoded.userId);
    if (!user) {
      throw new Error(globalMessages.userNotFound);
    }

    req.token = token;
    req.userId = user._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: err.message || "Unauthorized" });
  }
};

const accountAuthMiddleware = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error(globalMessages.unauthorized);
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const secret = process.env.SECRETKEY;
    const decoded = jwt.verify(token, secret);
    const user = await accountSchema.findById(decoded.userId);
    if (!user) {
      throw new Error(globalMessages.userNotFound);
    }
    if (!user.active) {
      throw new Error(globalMessages.inActive);
    }

    if (user.updatedAt) {
      const remaingWithdrawalLimit = user.dailyWithdrawalLimit;
      const currentTime = new Date();
      const updatedTime = new Date(user.updatedAt);
      const diff = currentTime - updatedTime;
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      if (diffInDays >= 1) {
        await accountSchema.findByIdAndUpdate(user._id, {
          remaingWithdrawalLimit: remaingWithdrawalLimit,
          updatedAt: new Date(),
        });
      }
    }
    req.token = token;
    req.userId = user._id;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: err.message || "Internal Server Error" });
  }
};

module.exports = { adminAuthMiddleware, accountAuthMiddleware };
