const registerSchema = require("../../schemas/register.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerMessages } = require("../../utils/messages");

const registerBusiness = async (req, res) => {
  const secret = process.env.SECRETKEY;
  try {
    const userName = req.body.userName;
    if (!userName) {
      return res.status(400).send(registerMessages.userNameRequired);
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
      const token = jwt.sign({ userName }, secret, { expiresIn: "1m" });
    res.status(201).json({ message: registerMessages.userCreated, token });
    
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message || "Internal Server Error");
  }
};

module.exports = {registerBusiness};
