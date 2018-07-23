// routers/api/router.js
const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// TL1
router.use('/tl1', require('./tl1/router'));

// DB

// Swagger-UI
const swaggerDefinition = {
    info: { // API informations (required)
        title: 'API Docs', // Title (required)
        version: '1.0.0', // Version (required)
    },
    basePath: '/api/tl1',
};
// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: [
        './routers/api/tl1/nms/swagger_param.yaml',
        './routers/api/tl1/provision/swagger_param.yaml',
    ],
};
const swaggerSpec = swaggerJSDoc(options);
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
