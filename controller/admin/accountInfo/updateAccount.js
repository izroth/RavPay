const accountSchema = require("../../../schemas/account/account.schema");
const { updateMessages, globalMessages } = require("../../../utils/messages");

const updateAccount = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error(globalMessages.unauthorized);
    }
    const accountId = req.params.id;
    if (!accountId) {
      throw new Error(updateMessages.accountIdRequired);
    }
    const account = await accountSchema.findById(accountId);
    if (!account) {
      throw new Error(updateMessages.accountNotFound);
    }
    const active = req.body.active;
    if (typeof active !== "boolean") {
      throw new Error(updateMessages.activeBoolean);
    }
    if (active === undefined) {
      throw new Error(updateMessages.activeRequired);
    }

    const updatedAccount = await accountSchema.findByIdAndUpdate(
      accountId,
      { active },
      { new: true }
    );
    res
      .status(200)
      .json({ updatedAccount, msg: updateMessages.accountUpdated });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: err.message || "Internal Server Error" });
  }
};

module.exports = { updateAccount };
