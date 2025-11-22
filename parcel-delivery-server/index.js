const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.VITE_USER}:${process.env.VITE_PASS}@cluster0.mcpcj.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const parcelCollection = client.db('parcelDeliverDB').collection('parcels');
    // post api parcels
    app.post('/parcels', async (req, res) => {
      try {
        const parcelData = req.body;
        const result = await parcelCollection.insertOne(parcelData);
        res.send(result);
      } catch (error) {
        console.log('Error inserting parcel :', error);
        res.status(500).send({ massage: 'Faild to create parcel' });
      }
    });
    // GET parcel by ID
    app.get('/parcel/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const parcel = await parcelCollection.findOne(query);
        res.send(parcel);
      } catch (error) {
        console.log(error);
        res.status(500).send({ massage: 'Internal Server Error' });
      }
    });
    // Get parcels of a particular user (sorted by latest)
    app.get('/parcels', async (req, res) => {
      try {
        const email = req.query.email;
        const query = email ? { created_by: email } : {};
        const options = {
          sort: { createdAt: -1 },
        };
        const parcels = await parcelCollection.find(query, options).toArray();
        res.send(parcels);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    app.delete('/parcels/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await parcelCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });


    // //get api parcels
    // app.get('/parcels', async (req, res) => {
    //   const parcels = await parcelCollection.find().toArray();
    //   res.send(parcels);
    // });

    //payment 
    app.post('/create-payment-intent', async (req, res) => {
      const { payment_method_id, amount } = req.body;

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          payment_method: payment_method_id,
          amount: amount,
          currency: 'usd',
          confirm: true,
          error_on_requires_action: true, // Decline if authentication required
        });

        if (paymentIntent.status === 'succeeded') {
          res.json({ success: true });
        }
      } catch (error) {
        res.json({ error: error.message });
      }
    });

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

// Test Route
app.get('/', (req, res) => {
  res.send('Parcel Server Running...');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
