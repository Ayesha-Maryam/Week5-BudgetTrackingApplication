const mongoose= require('mongoose');
const port=3000;
const express= require('express')
const BudgetUsers=require('./budgetUsers')
const app=express();
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/BudgetDb',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>
{
    console.log("Connected to MongoDb")
}
).catch(error=>console.error("Could not Connect to MongoDb"))


app.post('/budgetUser', async(req,res)=>
{
    try{
        let newUser= new BudgetUsers({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            budgetLimit:req.body.budgetLimit,
            entries:req.body.entries
        })
        newUser= await newUser.save();
        res.send(newUser)

    }
    catch(error)
    {
        console.error('Error saving User:', error);
        res.status(500).send('Error saving User');
    }
    
})

app.get('/budgetUser',async(req,res)=>
{
    const user=await BudgetUsers.find();
    res.send(user);

})

app.get('/budgetUser/:id', async(req,res)=>
{
    const user= await BudgetUsers.findById(req.params.id);
    if(!user)
    {
        return res.status(404).send('User not Found')
    }
    else
    {
        res.send(user)
    }
})

app.put('/budgetuser/:id',async(req,res)=>
{
    const user= await BudgetUsers.findByIdAndUpdate(req.params.id,
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            budgetLimit:req.body.budgetLimit,
            entries:req.body.entries
        }
    );
    if(!user)
    {
        return res.status(404).send('User not Found')
    }else
    {
        res.send(user)
    }
})

app.delete('/budgetUser/:id',(req,res)=>
{
    const user= BudgetUsers.findByIdAndDelete(req.param.id);
    if(!user)
        {
            return res.status(404).send('User not Found')
        }else
        {
            return res.status(204).send()
        }
})

app.listen(port,()=>
{
    console.log(`Server listening on port ${port}`)
})