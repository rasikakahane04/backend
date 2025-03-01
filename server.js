const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const recipeRoutes = require('./routes/recipeRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app=express()
const PORT=3000
app.use(express.json())

//Home Page API
app.get('/',(req,res)=>{
    res.send("<h1 align=center>Welcome to  the RecipeHub</h1>")
})

//Registration Page API
app.post('/register',async(req,res)=>{
    const{username,email,password}=req.body
    try{
            const hashedPassword= await bcrypt.hash(password,10)
            const user=new User({username,email,password:hashedPassword})
            await user.save()
            res.json({message: "User Registered.."})
            console.log("User Registration completed...")
    }
    catch(err)
    {
        console.log(err)
    }
})

//Login Page API

app.post('/login',async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(400).json({message: "Invalid Credentials" });
        }
        res.json({message: "Login Successful", username: user.username});
    }
    catch(err)
    {
        console.log(err)
    }

})

//Use Recipe Routes
app.use('/api', recipeRoutes);

// Use Settings Routes
app.use('/api', settingsRoutes);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected successfully.."))
.catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
});


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)

    }

)