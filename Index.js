const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 7000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
require("dotenv").config();

// mongoDB conection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sovrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("FriendsGroupeOfCompany");
    const companyCollection = database.collection("Company");

    // get company details
    app.get("/company", async (req, res) => {
      const result = await companyCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Friends group of company server runing prperly");
});

app.listen(port, () => {
  console.log("Friends group of companies server runing in PORT", port);
});
