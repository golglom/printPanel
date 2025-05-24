import express from 'express';
import protect from '../middleware/protect.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import {getMaterials , addMaterial , updateMaterial , deleteMaterial} from '../controllers/material.controllers.js'


const materialRouter = express.Router();

// Get all
materialRouter.get('/', protect,getMaterials);

// Add 
materialRouter.post('/', protect, requireRole(['admin', 'manager']),addMaterial);

// Update 
materialRouter.patch('/:id', protect,updateMaterial);

// Delete
materialRouter.delete('/:id', protect, requireRole(['admin']),deleteMaterial);

export default materialRouter;