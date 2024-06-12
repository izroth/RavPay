const accountSchema = require("../../../schemas/account/account.schema");
const { updateMessages, globalMessages } = require("../../../utils/messages");
const { accountType } = require("../../../utils/enum");

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

    const { active, accountType: newAccountType } = req.body;

    const updateData = {};

    if (active !== undefined) {
      if (typeof active !== "boolean") {
        throw new Error(updateMessages.activeBoolean);
      }
      updateData.active = active;
    }

    if (newAccountType !== undefined) {
      if (!Object.values(accountType).includes(newAccountType)) {
        throw new Error(updateMessages.accountTypeInvalid);
      }
      updateData.accountType = newAccountType;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error(updateMessages.noUpdatesProvided);
    }

    const updatedAccount = await accountSchema.findByIdAndUpdate(
      accountId,
      updateData,
      { new: true }
    );

    res.status(200).json({ updatedAccount, msg: updateMessages.accountUpdated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message || "Internal Server Error" });
  }
};

module.exports = { updateAccount };
