const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.VITE_SECRETKEY);
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('public'));

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware

app.use(express.json());
app.use(cors());
//custom middlewares
const verifyFBToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ massage: 'unauthorized access' });
  }
  //verify the token
  try {
    const idToken = token.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.decoded_email = decoded.email;
    next();
  } catch (error) {
    return res.status(403).send({ massage: 'forbidden access' });
  }
};

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
    const userCollection = client.db('parcelDeliverDB').collection('users');
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

    //tracking
    // app.post('/tracking', (req, res) => {
    //   const { } = req.body;
    //   const log = {

    //   }
    // });

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
    // user api
    app.post('/users', async (req, res) => {
      const email = req.body.email;
      const userExists = await userCollection.findOne({ email });
      if (userExists) {
        return res
          .status(200)
          .send({ massage: 'User already exists', inserted: false });
      }
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
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
    //Successful payment route
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
    app.get('/payments/history', verifyFBToken, async (req, res) => {
      try {
        const email = req.query.email;
        console.log(email);
        const query = email ? { userEmail: email } : {};
        const options = {
          sort: { paid_at: -1 },
        };
        const history = await historyCollection.find(query, options).toArray();
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
