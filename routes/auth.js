const router = require("express").Router();
const { valid } = require("@hapi/joi");
const User = require("../model/User");
const validation = require("../Validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//Register User
router.post("/register", async (req, res) => {
  //validated the data before posting
  const { error } = validation.RegisterValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check for user name already exist in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email Already Exists in Database");
  }

  //Hash the Password
  const saltkey = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, saltkey);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  // Saving Data into MongoDB
  try {
    const saveUser = await user.save();
    
    // res.send(saveUser);
    res.send(User._id);
    console.log("User Saved");
  } catch (error) {
    res.status(400).send(error);
  }


  //res.send("Register Successful");
});


//Login User
router.post("/login", async(req, res) => {
  //validated the data before posting
  const { error } = validation.LoginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

    //Check for user name already exist in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email or Password is wrong");
    }
    const validPass=await bcrypt.compare(req.body.password,user.password);  
    //user.password is the one from database which hass hashed password and req.body.password is the one we are getting from the form.

    if(!validPass){
        return res.status(400).send("Email or Password is wrong");
    }


    //Creating and assigning a token
    const token=jwt.sign({_id:user._id},process.env.secretkey,{expiresIn:'300s'});
    
       res.header('Authorization',token)
       const token_Json=JSON.stringify(token)

       res.send(token_Json)


      //  res.json({
      //   "token":token,
      //   "email":req.body.email
      // });


  //  res.json({
  //   "name":any= req.body.name,
  //   "email":any= req.body.email,
  //   "token":any=token,
  //   "userID":any=req.body._id
  //  })
   
  //  res.header('Authorization',token).send({
  //   "email":req.body.email,
  //   "token":token_Json
  //  })
});

module.exports = router;
