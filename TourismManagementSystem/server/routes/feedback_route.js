const express = require("express");
const router = express.Router();

const {
  feedbackCreate,
  feedbackRead,
  feedbackDelete,
} = require("../controllers/feedback_controller");

router.post("/createFeedback", feedbackCreate);
router.get("/readFeedback", feedbackRead);
router.delete("/deleteFeedback/:id", feedbackDelete);

module.exports = router;
