/* npm run dev ---> corre el proyecto */

const express = require('express')
const morgan = require('morgan')
/* importamos el router definido en /routes/index.js 
   y lo hacemos definiendolo en la constante apiRouter
*/
const apiRouter = require('./routes');

/* Se define bodyParser para que responda a las peticiones en formato Json */
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));

/* npm install cors */
var cors = require('cors');
app.use(cors());

/* Para poder usar el bodyParser lo importamos mediante use */
app.use(bodyParser.json());
/* Se necesita para peticiones post, put delete desde postman */
app.use(bodyParser.urlencoded({extended: true}));

/* Para poder usarlo lo definimos con un app.use y le pasamos 
   la constante apiRouter
   /api va ha ser el punto de entrada para la Api
*/
app.use('/api', apiRouter);

/* Configura puerto dinámico */
app.set('port', process.env.PORT || 3000);
const controller = require('./controllers/UsuarioController');
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.listen(app.get('port'), ()=> {
    console.log('Server up');
})