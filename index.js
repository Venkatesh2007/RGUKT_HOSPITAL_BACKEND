const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const connectMongoDb = require("./connection");

//LOCALHOST URL : "mongodb://localhost:27017/RGUKT_Hospital";
// ATLAS URl : "mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

const MONGO_URI = "mongodb+srv://saishivathatipalli:4MNRtUkpfjw6n7DK@cluster0.3i1yqsu.mongodb.net/hospitalDB?retryWrites=true&w=majority&appName=Cluster0";

connectMongoDb(MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://rgukt-hospital-frontend.vercel.app', // frontend origin
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}));
app.options('*', cors());

app.use("/", routes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello RGUKT!.." });
});

const startServer = () => {
  app.listen(8000, () => {
    console.log("server listening on 8000...");
  });
};

startServer();
