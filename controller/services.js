const { getDb } = require("../db/db");

const getServices = async (req, res) => {
  const servicesCollection = await getDb().collection("services");
  const result = await servicesCollection.find().toArray();
  res.send(result);
};

module.exports = { getServices };
