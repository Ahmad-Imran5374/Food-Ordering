// Importing the Create_account model
const Create_account = require('./models/Create_account');
const bcrypt=require('bcrypt')
const Add_newitem=require('./models/Add_new_item')


  
// create account function
function createAccount(req, res) {
    const {name,email,phone,adress,g,password}=req.body
    Create_account.findOne({ email: email })
        .then(result => {
            if (result) {
                console.log(result.email);
                res.json("error");
                console.log("You already have an account.");
            } else {
                bcrypt.hash(password,10)
                .then(hash=>{ 
                Create_account.create({name,email,phone,adress,g,password:hash})
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
        .catch(err => res.json(err));
}


// sigin protocol 
function signinAccount(req,res)
{
    let email=req.body.email
    let password=req.body.password
    Create_account.findOne({email:email})
    .then(result=>{
        if(result)
        { 
            bcrypt.compare(password,result.password,(err,response)=>{
                if(err)
                {
                    res.json("not found")
                }
                if(response)
                {
                    res.json("found")
                }
                else{
                    res.json("not found")
                }
         })
        }
        else
        {
            res.json("not found")
        }
    })
    .catch(err=>{
        res.json(err)
    })
}

const Getitems=(req,res)=>{
    Add_newitem.find()
    .then(result=>{
        console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}
module.exports = { createAccount,signinAccount,Getitems};

