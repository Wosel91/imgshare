const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const routes = require('../routers/index.js');
module.exports = app => {



    //settings
    app.set('port' , process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    //configuracion de hbs
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname : '.hbs',
        helpers: path.join(__dirname, './src/helpers')
       // helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');



    //middlewares
        //logger
    app.use(morgan('dev'));
        //gestor de ficheros
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));

    app.use(express.urlencoded({msExtendedCode: false}));
    app.use(express.json());



    //routes
    routes(app);

    //static files
    app.use(express.static(path.join(__dirname, '../public')));

    //errorhandlers
    if (app.get('env') === 'development') {
        app.use(errorHandler);
    }



    return app;
};