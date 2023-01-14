const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app =express();
require('dotenv').config()

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ydjbhxm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db('emaJohn').collection('emaJohnFirst');
        
        
        // getting all products
        app.get('/allProducts', async(req, res)=>{

            const query = {};
            const cursor =  productCollection.find(query);

            const result = await cursor.toArray();
            res.send(result);
        })

        // getting the number of total products
        app.get('/productCount',async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.count();
            res.send({result});
        })
    }
    finally{}
}

run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('hello world');
})
app.listen(port, ()=>{
    console.log('trying for ema john');
})
