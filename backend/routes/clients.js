import express from 'express';
import protect from '../middleware/protect.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import {getClients , addClient , updateClient , getClientOrders , deleteClient} from '../controllers/client.controllers.js'

const clientRouter = express.Router();

// Get all
clientRouter.get('/', protect, getClients);

// Add 
clientRouter.post('/', protect, requireRole(['admin', 'manager']),addClient);

// Update
clientRouter.patch('/:id', protect,updateClient);

// Add 
clientRouter.post('/:id/orders', protect, requireRole(['admin', 'manager']), getClientOrders);

// Delete
clientRouter.delete('/:id', protect, requireRole(['admin']), deleteClient);


export default clientRouter;