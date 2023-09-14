const express=require('express')
const app=express();
const mongoose=require('mongoose');
const dotevv=require('dotenv')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const postRoute=require('./routes/post')


dotevv.config();
const PORT=process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


//Database Config
mongoose.connect(process.env.MongoBD_URI,{
    dbname:process.env.dbname,
    user:process.env.user,
    pass:process.env.pass,
})
.then(()=>{
    console.log("Monogodb connected");
}).catch(err=>{
    console.log(err.message)
})

mongoose.connection.on('connected',()=>{
    console.log("Mongoose Connected to DB")
})


//Import Routes
const authRoute=require('./routes/auth');


//Route Middleware

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute)



app.listen(PORT,()=>{
    console.log("Started on port 5000");
})
