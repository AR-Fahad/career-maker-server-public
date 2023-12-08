const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getServices = async (req, res) => {
  const filter = req.query;
  let query = {};
  if (filter?.email) {
    query = { provider_email: req.query.email };
  }
  if (filter?.search) {
    query = {
      service_name: { $regex: filter.search, $options: "i" },
    };
  }
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.find(query).toArray();
  res.send(result);
};

const getService = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.findOne(query);
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

const deleteService = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getServices,
  setService,
  updateService,
  deleteService,
  getService,
};
