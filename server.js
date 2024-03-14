const express = require('express');
const routes = require('./src/routes/pokemon.routes.js');
const dotenv = require("dotenv");
const PORT = process.env.PORT || 6969

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/documentation.json');
const swaggerOptions = {
    customCss: ' . swagger-ui . topbar { display: none }',
    customTitle: "Pikachu uses LIGHTNING BOLT!"
};

dotenv.config();

const app = express();

app.use(express.json());

app.use('/pokemon/api', routes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(PORT, () => {
    console.log('Le serveur est en écoute sur le port 6969');
});
