const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){

   const bearertoken=req.header('Authorization');
    token:String


   //Removing Bearer from the token
    if(typeof(bearertoken)!=='undefined'){
        const bearer=bearertoken.split(" ");
         token=bearer[1];
    }




   console.log(token)
    if(!token)
    return res.status(401).send('Access Denied');


    try {
        const verified=jwt.verify(token,process.env.secretkey);
        req.user=verified;
        next();
    } catch (error) {
        res.status(400).send('Invaild Token')
    }
}

