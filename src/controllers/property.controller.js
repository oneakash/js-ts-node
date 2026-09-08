const mostPopular = require("../data/most_popular.json");
const highestPrice = require("../data/highest_price.json");
const lowestPrice = require("../data/lowest_price.json");

const getProperties = (req, res) => {
  const {
    "most-popular": mostPopularParam,
    "highest-price": highestPriceParam,
    "lowest-price": lowestPriceParam,
    limit,
  } = req.query;

  let dataset;

  // Select the dataset
  if (mostPopularParam === "true") {
    dataset = mostPopular;
  } else if (highestPriceParam === "true") {
    dataset = highestPrice;
  } else if (lowestPriceParam === "true") {
    dataset = lowestPrice;
  } else {
    return res.status(400).json({
      message:
        "Please provide one of: most-popular=true, highest-price=true, lowest-price=true",
    });
  }

  // Get the actual property array
  let properties = dataset.Result.Items;

  // Safety check
  if (!Array.isArray(properties)) {
    return res.status(500).json({
      message: "Property dataset is not in the expected format",
    });
  }

  // Apply limit
  if (limit !== undefined) {
    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({
        message: "limit must be a positive integer",
      });
    }

    properties = properties.slice(0, parsedLimit);
  }

  // Return properties
  return res.status(200).json(properties);
};

module.exports = {
  getProperties,
};