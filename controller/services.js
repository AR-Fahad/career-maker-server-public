const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getServices = async (req, res) => {
  let query = {};
  if (req?.query?.email) {
    query = { provider_email: req.query.email };
  }
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.find(query).toArray();
  res.send(result);
};

const setService = async (req, res) => {
  const service = req.body;
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.insertOne(service);
  res.send(result);
};

const updateService = async (req, res) => {
  const updatedService = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatingService = {
    $set: {
      service_name: updatedService.service_name,
      img: updatedService.img,
      area: updatedService.area,
      description: updatedService.description,
      price: updatedService.price,
    },
  };
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.updateOne(query, updatingService);
  res.send(result);
};

module.exports = { getServices, setService, updateService };
