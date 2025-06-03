import Material from '../models/Material.js';



export const getMaterials =  async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addMaterial =  async (req, res) => {
  const material = new Material(req.body);
  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export const updateMaterial =  async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true,
      context: 'query' });
    res.json(material);
  } catch (error) {
    
    if (error.code === 11000) {
      const champ = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${champ} déjà utilisé.` });
    }
    
    res.status(400).json({ message: error.message });
  }
}

export const deleteMaterial =  async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}