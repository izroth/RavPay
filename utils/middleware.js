const jwt = require("jsonwebtoken");
const adminRegisterSchema = require("../schemas/admin/register.schema");

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
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ msg: err.message || "Unauthorized" });
    }
}

module.exports = { adminAuthMiddleware };