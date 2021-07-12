const router = require("express").Router();

const feedbackValidation = require("../validation").feedbackValidation;
const Feedback = require("../models").feedbackModel;

router.use((req, res, next) => {
  console.log("A request is coming into feedback route");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "feedback API is working.",
  };
  return res.json(msgObj);
});

router.get("/", (req, res) => {
  Feedback.find({})
    .then(feedback => {
      res.status(200).send(feedback);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/", async (req, res) => {
  const { error } = feedbackValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200).send("Thanks for your feedback!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
