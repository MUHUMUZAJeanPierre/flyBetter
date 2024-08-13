import express from 'express';
 
const contactRoute = express.Router();

import {listContact, createContact, deleteContact} from '../controllers/contactControllers.js';

contactRoute.post('/create', createContact);
contactRoute.get('/list', listContact);
contactRoute.delete('/delete/:id', deleteContact);

export default contactRoute;