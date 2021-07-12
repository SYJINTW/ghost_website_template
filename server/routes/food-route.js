const router = require("express").Router();

const foodValidation = require("../validation").foodValidation;
const Food = require("../models").foodModel;

router.use((req, res, next) => {
  console.log("A request is coming into food route");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "food API is working.",
  };
  return res.json(msgObj);
});

router.get("/", (req, res) => {
  Food.find({})
    .then(food => {
      res.status(200).send(food);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", async (req, res) => {
  const { error } = foodValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const food = new Food(req.body);
    await food.save();
    res.status(200).send("New food successfully posted");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
