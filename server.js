require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')

const routes = require('./controllers/routes')

app.use(cors())
app.use(express.json())
app.use(express.json({ limit: '50mb' })); // Increase limit for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', routes)

app.use((req,res)=>{
    res.status(404).json({message: "You are in the wrong routes .."})
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log("Connected and Running")
})