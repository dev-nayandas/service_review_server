const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pfvoz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)
async function run(){
        try{
            const serviceCollection = client.db('serviceReview').collection('services')
            app.get('/services', async (req, res)=>{
                const query = {}
                const cursor=  serviceCollection.find(query);
                const services = await cursor.toArray();
                res.send(services)
            })
        }
        finally{

        }
}
run().catch(err => console.log(err));







app.get('/', (req, res) => {
    res.send('service review is running')
})




app.listen(port, ()=>{
    console.log(`service review is running on ${port}`)
})