const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3000)
app.use(cors());
app.locals.title = 'Colors';
app.locals.colors = ['Red', 'Green', 'Blue', 'Burgundy']

const whitelist = ['http://localhost:3000/api/v1/colors', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS ese!'))
    }
  }
}

app.get('/api/v1/colors', cors(corsOptions), (request, response, next) => {
  const { colors } = app.locals;
  response.status(200).json({ colors })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
})