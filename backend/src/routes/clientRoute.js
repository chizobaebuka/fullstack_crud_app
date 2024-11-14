import express from 'express';
import { 
    deleteClient,
    getAllClients,
    getClientById,
    registerClient,
    searchClients,
    updateClient, 
    // getAllClients, 
    // getClientById, 
    // updateClient, 
    // deleteClient 
} from '../controllers/clientController.js'; // Adjust the path as necessary

const clientRouter = express.Router();

// Register a new client
clientRouter.post('/add', registerClient);
clientRouter.get('/search', searchClients);
clientRouter.get('/', getAllClients);
clientRouter.get('/:id', getClientById);
clientRouter.put('/:id', updateClient);
clientRouter.delete('/:id', deleteClient);

export default clientRouter;
