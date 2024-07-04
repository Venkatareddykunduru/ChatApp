const express=require('express');
const { route } = require('./login');
const fs = require('fs');
const router=express.Router();
// Route to show message form
router.get('/', (req, res) => {
    const messages = fs.readFileSync('messages.json', 'utf8').split('\n').filter(line => line).map(JSON.parse);
    let messagesHtml = '';
    messages.forEach(msg => {
      messagesHtml += `<p><strong>${msg.username}:</strong> ${msg.message}</p>`;
    });
    
    res.send(`
      <h1>Group Chat</h1>
      ${messagesHtml}
      <form action="/send-message" method="POST">
        <input type="hidden" id="username" name="username">
        <label for="message">Message:</label>
        <input type="text" id="message" name="message" required><br><br>
        <button type="submit">Send Message</button>
      </form>
      <script>
        document.getElementById('username').value = localStorage.getItem('username');
      </script>
    `);
  });
  
  // Route to handle message form submission
  router.post('/send-message', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const message = req.body.message;
    const messageObject = { username, message };
    fs.appendFileSync('messages.json', JSON.stringify(messageObject) + '\n');
    res.redirect('/');
  });
  

  module.exports=router;