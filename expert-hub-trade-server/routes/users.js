const router = require("express").Router();
const userController = require("../controllers/user");
const private = require("../middlewares/privateRoute");
const UsersSchema = require("../models/User");

router.get("/", userController.All);

router.put("/:email/edit", async (req, res) => {
  const { email } = req.params;

  //   check if any user exists
  const user = await UsersSchema.findOne({ email });

  // if user exists
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }

  const credentials = req.body;

  try {
    await UsersSchema.updateMany({
      ...credentials,
    }).then((_) => {
      return res.status(200).json({
        success: true,
        message: "user details updated",
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

router.delete("/:email/delete", async (req, res) => {
  const { email } = req.params;

  //   check if any user exists
  const user = await UsersSchema.findOne({ email });

  // if user exists
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }

  try {
    UsersSchema.deleteOne(user).then((_) => {
      return res.status(200).json({
        success: true,
        message: "user deleted",
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
