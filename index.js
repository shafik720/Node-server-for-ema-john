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
            console.log('dummy ', req.query);
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor =  productCollection.find(query);

            let result;
            if(page || size){
                result = await cursor.skip(page * size).limit(size).toArray(); 
            }else{
                result = await cursor.toArray();
            }
            
            res.send(result);
        })


        // getting the number of total products
        app.get('/productCount',async(req,res)=>{
            // const query = {};
            // const cursor = productCollection.find(query);
            const result = await productCollection.estimatedDocumentCount();
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
