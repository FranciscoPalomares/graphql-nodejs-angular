import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';

const PORT = 3000;

const app = express();

import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

import models from './models/index'


//mezclar todos los archivos de carpetas de types y resolvers
import path from 'path'
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas'


const typeDefs = mergeTypes(fileLoader(path.join(__dirname,'./types') ));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname,'./resolvers') ));


import graphql from 'express-graphql'


var cors = require('cors');
app.use(cors())


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});





app.use(
  '/graphql',
  graphql({
      schema: schema,
      context:{
        models
      },
      graphiql: true
  })
);



mongoose.connect('mongodb://localhost:27017/node-react-angular', { useNewUrlParser: true }).then(
  ()=>{
    console.log("Conectado a Mongo");

    app.listen(PORT, ()=>{
      console.log('Running GRAPHQL server...');
    });


  }
)