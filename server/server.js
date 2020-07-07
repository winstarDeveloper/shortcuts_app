const dotenv = require('dotenv');
// app.get('env')   process.env
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on Port ${port}...`);
});
