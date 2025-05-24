import express from 'express';
import protect from '../middleware/protect.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import {getProducts , addProduct , updateProduct , deleteProduct} from '../controllers/product.controllers.js'


const productRouter = express.Router();

// Get all 
productRouter.get('/', protect,getProducts);

// Add 
productRouter.post('/', protect, requireRole(['admin', 'manager']), addProduct);

// Update
productRouter.patch('/:id', protect, updateProduct);

// Delete
productRouter.delete('/:id', protect, requireRole(['admin']), deleteProduct);

export default productRouter;