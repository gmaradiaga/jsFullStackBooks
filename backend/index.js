if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(request, file, callback) {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false })); // Interpreta los datos que se envían desde un formulario en el frontend, como un JSON
app.use(express.json()); // Soporta peticiones JSON que enviará y recibirá JSONs

// Routes
app.use('/api/books', require('./routes/books'));

// Static Files (especifica las carpetas qu contienen html, css, js, imágenes que deben ser públicas y se pueden enviar al navegador)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});
