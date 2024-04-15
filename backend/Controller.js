// Importing the Create_account model
const Create_account = require('./models/Create_account');
const bcrypt=require('bcrypt')
const Add_newitem=require('./models/Add_new_item')
const Orders=require('./models/Order')

  
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
                    res.json(result)
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
        //console.log(result)
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

const Update_password=(req,res)=>{
    email=req.body.email
    password=req.body.password
    bcrypt.hash(password,10,(err,hashedPassword )=>{
        if(err)
        {
            res.json("error in hashing password")
        }
    
    //console.log(email," ",hashedPassword)

    Create_account.findOneAndUpdate(
        {email:req.body.email},
        {password:hashedPassword}
    )
    .then(result=>{
        res.json("updated")
    })
    .catch(err=>{
        res.json(err)
    })
})
    
}


// adding new orders
const Add_ordrs=(req,res)=>{
    const {name,email,phone,total1,itemsName}=req.body
   // console.log("orders")
    //console.log(req.body)
    Orders.create({name,email,phone,total:total1,items:itemsName})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json("error")
    })
}

// getting invoices of user 
const User_invoices=(req,res)=>{
    const email=req.params.email
    Orders.find({email:email})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err)
    })
}

// getting user profile

const User_profile=(req,res)=>{
    const id=req.params.userId
    Create_account.findById({_id:id})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(err)
    })
}


const Update_profile=(req,res)=>{
    const id=req.params.userId
    let {name,email,phone,adress,password}=req.body
    if(password.length===8)
    {
        let hashedPassword=bcrypt.hashSync(password,10)
        Create_account.findOneAndUpdate({_id:id},{name:name,email:email,phone:phone,adress:adress,
            password:hashedPassword})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json("errr")
        })
    }
    else
    {
        Create_account.findOneAndUpdate({_id:id},{name:name,email:email,phone:phone,adress:adress,
            password:password})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json("errr")
        })
    }
  
}

const All_users=((req,res)=>{
    Create_account.find({})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(err)
    })
})


const Delete_user=((req,res)=>{
    const id=req.params.id
    Create_account.findByIdAndDelete({_id:id})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        res.json(err)
    })
})


// admin orders
const Admin_orders=(req,res)=>{
    Orders.find({})
    .then(result=>{
        res.json(result)
    }).catch(err=>
        res.json(err)
    )
}

const Admin_items=(req,res)=>{
    Add_newitem.find({})
    .then(result=>{
        res.json(result)
    })
}

const Delte_adminitems=(req,res)=>{
    let id=req.params.id
    Add_newitem.findByIdAndDelete({_id:id})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err)
    })

}
module.exports = { createAccount,signinAccount,Getitems,Update_password,Add_ordrs,User_invoices,User_profile,
    Update_profile,All_users,Delete_user,Admin_orders,Admin_items, Delte_adminitems};

