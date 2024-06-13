const registerSchema = require("../../../schemas/admin/register.schema");
const bcrypt = require("bcryptjs");
const { registerMessages } = require("../../../utils/messages");
const { createToken } = require("../../../utils/util.helper.service");

const registerBusiness = async (req, res) => {
  const secret = process.env.SECRETKEY;
  try {
    const userName = req.body.userName;
    if (!userName) {
      throw new Error(registerMessages.userNameRequired);
    }
    const password = req.body.password;
    if (!password) {
      throw new Error(registerMessages.passwordRequired);
    }
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
    throw new Error(registerMessages.passwordNotMatch);
    }

    const user = await registerSchema.findOne({ userName });
    if (user) {
    throw new Error(registerMessages.userNameExist);
    }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new registerSchema({
        userName,
        password: hashedPassword,
      });
      await newUser.save();
      const userId = newUser._id;
      const token = await createToken(userId);
    res.status(201).json({ message: registerMessages.userCreated, token });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: err.message || "Internal Server Error"});
  }
};

module.exports = {registerBusiness};
