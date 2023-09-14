const router = require("express").Router();
const verify=require('../verify/verifytoken')

router.get("/", verify,(req, res) => {
  res.json({
    post: {
      title: "My first Post",
      description: "random data you shoudnt access",
    },
  });
});

module.exports = router;
