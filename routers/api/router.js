// routers/api/router.js
const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// TL1 - admin commands
// TL1 - alarm commands
// TL1 - cxc commands
// TL1 - nms commands
router.use('/net', require('./tl1/nms/api_net'));
// TL1 - opc commands
// TL1 - operation commands
// TL1 - pm commands
// TL1 - provision commands
router.use('/sys', require('./tl1/provision/api_sys'));
// TL1 - switch commands
// TL1 - test commands

// Swagger-UI
const swaggerDefinition = {
    info: { // API informations (required)
        title: 'API Docs', // Title (required)
        version: '1.0.0', // Version (required)
    },
    basePath: '/api',
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
