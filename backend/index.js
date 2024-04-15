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
const emailController=require('./emailControllers')


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
    let{item,details,price,category,weight}=req.body
    console.log(req.body)
    let fileDetails=req.file
    let fileName=fileDetails.filename
    await Add_newitem.create({item, details,price,file:fileName,category,weight})
    res.json("file uploades scessfully")
  }catch(err)
  {
    console.log(err)
  }
})

// getting all items show on screen
app.get('/get_items',Controller.Getitems)
// updating password
app.put('/update_password',Controller.Update_password)

// adding new orders 
app.post('/add_orders',Controller.Add_ordrs)

// geting all orders of user
app.get('/user_invoice/:email',Controller.User_invoices)

// getting profile of the users 
app.get('/profile/:userId',Controller.User_profile)

// updating user profile
app.put('/update_profile/:userId',Controller.Update_profile)

// getting all users for admin
app.get('/all_users',Controller.All_users)

// deleting the signle user
app.delete('/delete/:id',Controller.Delete_user)

// getting all orders for admin
app.get('/admin_orders',Controller.Admin_orders)

// getiing all items for admin
app.get('/admin_items',Controller.Admin_items)

// deleting admin items
app.delete('/delete_adminitems/:id',Controller.Delte_adminitems)


app.put('/update_items/:id',(req,res)=>{
  const id=req.params.id
  let {item,details,price,file}=req.body
  Add_newitem.findByIdAndUpdate({_id:id},{item:item,details:details,price:price,file:file})
  .then(result=>{
    res.json(result)
  }).catch(err=>{
    res.json(err)
  })
})


// sending email 
app.post('/sendEmail',emailController.sendEmail)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})