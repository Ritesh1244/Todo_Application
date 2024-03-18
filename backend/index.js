const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000;

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(411).json({
      mssg: "You have Sent the Wrong Input",
    });
  }

  const { title, description } = createPayload; // Destructure title and description from createPayload
// mongo db 
  try {
    await todo.create({
      title: title,
      description: description,
      completed: false,
    });

    res.status(201).json({
      mssg: "Todo Created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mssg: "Internal Server Error",
    });
  }
});

app.get("/todos", async function (req, res) {
  try {
    const todos = await todo.find({});
    res.json({
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mssg: "Internal Server Error",
    });
  }
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsePayload = createTodo.safeparse(updatePayload);
  if (!parsePayload.success) {
    res.status(411).json({
      mssg: "You have Sent the Wrong Input",
    });
    return;
  }
  try {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );

    res.json({
      msg: "Mark as Completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mssg: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
