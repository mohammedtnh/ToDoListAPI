const express = require("express");
const {
  taskList,
  taskCreate,
  taskUpdate,
  taskDelete,
  fetchTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.param("taskId", async (req, res, next, taskId) => {
  const foundTask = await fetchTask(taskId, next);
  if (foundTask) {
    req.task = foundTask;
    next();
  } else {
    const error = new Error("Task Not Found");
    error.status = 404;
    next(error);
  }
});

//List all tasks
router.get("/", taskList);

//Create a task
router.post("/", taskCreate);

//Update task
router.put("/:taskId", taskUpdate);

// //Delete task
router.delete("/:taskId", taskDelete);

module.exports = router;
