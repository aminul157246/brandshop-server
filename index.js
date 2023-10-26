const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000


// brand-shop-assignment
// kNzfvKTNGsHTZdGj



//middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://brand-shop-assignment:kNzfvKTNGsHTZdGj@cluster0.6v8amsy.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://brand-shop-assignment:kNzfvKTNGsHTZdGj@cluster0.6v8amsy.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const brandShopCollection = client.db('brandShopDB').collection('brandShop')
    const brandProductCollection = client.db('brandProductDB').collection('product')
    

    app.get('/brand', async(req, res)=> {
      const cursor = brandShopCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })




    
    // app.post('/products' , async(req, res) => {
    //   const products = req.body;
    //   const result = await brandProductCollection.insertOne(products)
    //   res.send(result)
    // })


    app.get('/products', async(req, res) => {
      const cursor = brandProductCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // brand 4 cards 
    app.get('/products/:brandName' , async(req, res) => {
      const query = {brandName : req.params.brandName }
      const result = await brandProductCollection.find(query).toArray()
      res.send(result)
    })


    // card details 
    app.get('/products/brandName/:id' , async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await brandProductCollection.findOne(query)
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('CRUD  is running ......!')
})

app.listen(port, () => {
  console.log(`App is  listening on port ${port}`)
})



