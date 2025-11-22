const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// pass b parvej@#$1234
//SecretKey : sk_test_51SVs8GDMPX4VHdk4zwSTjmPrS3jrOgdm4AFUT2UwmsCVqM0nBHYTXIOym9WzLZXKU7MFpmEOg4RETPTfIQ9D7zpv00htM7PvOa
const app = express();
const port = process.env.PORT || 5000;
const stripe = require('stripe')(process.env.VITE_SECRETKEY);
app.use(express.static('public'));
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
    const historyCollection = client
      .db('parcelDeliverDB')
      .collection('paymentHistory');
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
      const amountInCents = req.body.amountInCents;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: 'usd',
          payment_method_types: ['card'],
        });
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    //payment history
    // Successful payment route
    app.post('/payments/history', async (req, res) => {
      try {
        const { parcelId, userEmail, amount, transactionId } = req.body;
        const parcelQuery = { _id: new ObjectId(parcelId) };
        const update = { $set: { payment_status: 'paid' } };
        const updateResult = await parcelCollection.updateOne(
          parcelQuery,
          update
        );
        if (updateResult.modifiedCount === 0) {
          return res.status(404).send({ message: 'Parcel not found' });
        }
        const paymentData = {
          parcelId: parcelId,
          userEmail: userEmail,
          amount: amount,
          transactionId: transactionId,
          status: 'success',
          createdAt: new Date().toISOString(),
        };
        const insertResult = await historyCollection.insertOne(paymentData);
        res.send({
          message: 'Payment recorded successfully',
          payment_history_id: insertResult.insertedId,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    //get
    app.get('/payments/history/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = email ? { userEmail: email } : {};
        const options = {
          sort: { paid_at: -1 },
        };
        const history = await paymentsCollection(query, options).toArray();
        res.send(history);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
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
