import express from 'express';

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Testing, World!"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});