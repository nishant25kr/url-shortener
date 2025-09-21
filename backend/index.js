import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./src/db/db.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

ConnectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is runnign at : ", PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
    

app.get('/',(req,res)=>{
        res.send("<h1>This is server of url shortner</h1>")
})

//import routes
import urlRoute from "./src/routes/url.routes.js"

app.use("/",urlRoute)
