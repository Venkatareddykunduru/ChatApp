const express=require('express');
const router=express.Router();


// Route to show login form
router.get('/login', (req, res) => {
    res.send(`
      <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <button type="submit">Login</button>
      </form>
    `);
  });
  
  // Route to handle login form submission
  router.post('/login', (req, res) => {
    const username = req.body.username;
    res.send(`
      <script>
        localStorage.setItem('username', '${username}');
        window.location.href = '/';
      </script>
    `);
  });

  module.exports=router;