const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const loginhandler=require('./routes/login');
const messagehandler=require('./routes/message');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginhandler);
app.use(messagehandler);

app.use((req,res,next)=>{
  res.status(404).send('<h1>Page not Found</h1>');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
