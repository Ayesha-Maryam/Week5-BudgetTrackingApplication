const mongoose= require('mongoose');
const port=8080;
const express= require('express')
const BudgetUsers=require('./budgetUsers')
const cors=require('cors');
const app=express();
app.use(express.json())
app.use(cors());
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

app.put('/budgetUser/:id',async(req,res)=>
{
    const user = await BudgetUsers.findByIdAndUpdate(req.params.id,
        {
            
            entries:req.body.entries,
            new:true
        }
    );
    if(!user)
    {
        return res.status(404).send('User not Found')
    }
    const updatedBudgetUser = await BudgetUsers.findById(req.params.id);
    res.send(updatedBudgetUser);
})

app.delete('/budgetUser/:id', async (req,res)=> 
{
    const user= BudgetUsers.findByIdAndDelete(req.params.id);
    if(!user)
    {
        return res.status(404).send('User not Found')
    }else
    {
        return res.status(204).send()
    }

    // const _user = BudgetUsers.findById(req.params.id);
    // const updatedEntries = _user.entries.filter(e => (e._id !== req.query.budgetId));
    // _user.entries = updatedEntries;
    // await BudgetUsers.findByIdAndUpdate(req.params.id, _user);
    // return updatedEntries;
})

app.listen(port,()=>
{
    console.log(`Server listening on port ${port}`)
})
