const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
// The "catchall" handler: for any request that doesn't match one above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



//const express = require('express');
//const { fileAuth } = require('./auth');
//const booksRouter = require('./routes/books');

//const app = express();
//app.use(express.json());

//app.use((req, res, next) => {
  //  res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    //res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //next();
//})

//app.post('/login', (req, res) => {

  //  const { username, password } = req.body;
    // get user from file
    //const user = fileAuth(username, password);
    //if (!user) {
      //  return res.status(401).json({ message: 'Invalid username or password' });
    //}
    //res.json({ message: 'Login successful' });

//});

//app.use('/books', booksRouter);


//const PORT = process.env.PORT || 7000;
//app.listen(PORT, () => {
  //  console.log(`Server is running on port http://localhost:${PORT}`);
//});