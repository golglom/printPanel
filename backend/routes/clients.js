import express from 'express';
import protect from '../middleware/protect.js';
import {getClients , addClient , updateClient , getClientOrders , deleteClient} from '../controllers/client.controllers.js'

const clientRouter = express.Router();

// Get all
clientRouter.get('/', protect, getClients);

// Add 
clientRouter.post('/', protect,addClient);

// Update
clientRouter.put('/:id', protect,updateClient);

// Add 
clientRouter.post('/:id/orders', protect, getClientOrders);

// Delete
clientRouter.delete('/:id', protect, deleteClient);


export default clientRouter;