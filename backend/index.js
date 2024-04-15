const express = require('express')
const app = express()
const cors=require('cors')
require('./db/Connection')
const port = 3001
const multer=require('multer')
const path=require('path')
const Add_newitem=require('./models/Add_new_item')
const Controller=require('./Controller')
const bodyParser=require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))

// for image storing 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'../src/images/')
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const upload=multer({
    storage:storage
  })


// creating new account
app.post('/create_account',Controller.createAccount)
// sign new user
app.post('/signin',Controller.signinAccount)
// add new item
app.post('/add_newitem',upload.single('file'),async(req,res)=>{
  try{
    let{item,details,price}=req.body
    console.log(req.body)
    let fileDetails=req.file
    let fileName=fileDetails.filename
    await Add_newitem.create({item, details,price,file:fileName})
    res.json("file uploades scessfully")
  }catch(err)
  {
    console.log(err)
  }
})

// getting all items show on screen
app.get('/get_items',Controller.Getitems)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})