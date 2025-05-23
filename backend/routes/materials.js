import express from 'express';
import protect from '../middleware/protect.js';
import {getMaterials , addMaterial , updateMaterial , deleteMaterial} from '../controllers/material.controllers.js'


const materialRouter = express.Router();

// Get all
materialRouter.get('/', protect,getMaterials);

// Add 
materialRouter.post('/', protect,addMaterial);

// Update 
materialRouter.patch('/:id', protect,updateMaterial);

// Delete
materialRouter.delete('/:id', protect,deleteMaterial);

export default materialRouter;