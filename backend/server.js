const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
