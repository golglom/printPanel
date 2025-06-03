import Client from '../models/Client.js';

export const getClients = async (req, res) => {

  try {
    const clients = await Client.find().populate('orders.product');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const addClient = async (req, res) => {

  const client = new Client(req.body);
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}


export const updateClient = async (req, res) => {

  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query' }
    );
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

export const getClientOrders = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    client.orders.push(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
