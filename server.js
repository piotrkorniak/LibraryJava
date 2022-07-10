const express = require('express');
const app = express();
app.use(express.static('./dist/Library'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/Library/'}
  );
});
app.listen(process.env.PORT || 8080);