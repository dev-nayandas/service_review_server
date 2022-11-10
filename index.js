const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
            const reviewCollection = client.db('serviceReview').collection('reviews')



            app.get('/services', async (req, res)=>{
                const query = {}
                const cursor=  serviceCollection.find(query);
                const services = await cursor.toArray();
                res.send(services)
            });


            // app.get('/reviews', async (req, res)=>{
            //     const query = {}
            //     const cursor=  reviewCollection.find(query);
            //     const reviews = await cursor.toArray();
            //     res.send(reviews)
            // });

            app.get('/reviews', async (req, res)=>{
                let query = {}
                if (req.query.email){
                  query = {
                    email : req.query.email
                  }
                }
                
                const cursor =  reviewCollection.find(query);
                const reviews = await cursor.toArray();
                res.send(reviews)
            });

            app.get('/reviews/:id', async (req, res)=>{
                const  id =req.params.id;
                const query = {_id: ObjectId(id)};
                const cursor=  reviewCollection.find(query);
                const review = await cursor.toArray();
                res.send(review)
            });

            app.get('/services/:id', async(req, res)=>{
                const  id = req.params.id;
                const query = {_id: ObjectId(id)};
                const service = await serviceCollection.findOne(query);
                res.send(service)

            });


            app.post('/services', async (req, res) => {
                const service = req.body;
                const result = await serviceCollection.insertOne(service);
                res.send(result);
            });


            app.post('/reviews', async (req, res) => {
                const review = req.body;
                const result = await reviewCollection.insertOne(review);
                res.send(result);
            });



            app.get('/services/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const service = await serviceCollection.findOne(query);
                res.send(service);
            });
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