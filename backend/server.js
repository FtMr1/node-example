const express = require('express')
const mongoose =  require('mongoose')
const cors = require("cors")
const dotenv = require("dotenv");
const userRoute = require("./routes/index")


const app =express();
const port = 5001;

dotenv.config()

const connect = async()=>{
try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Başarılı")
} catch (error) {
        throw error
}
}

app.use(express.json())
app.use(cors())
app.use('/api' , userRoute),

app.listen(port , ()=>{
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})