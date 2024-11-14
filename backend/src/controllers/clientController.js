import {
    deleteClientService,
    getAllClientsService,
    getClientByIdService,
    registerClientService,
    searchClientsService,
    updateClientService,
} from '../services/clientService.js';

// Register a new client
export const registerClient = async (req, res) => {
    try {
        const { name, email, job, rate, isActive } = req.body;

        const clientResponse = await registerClientService({ name, email, job, rate, isActive });

        res.status(201).json({
            status: 'success',
            message: 'Client registered successfully',
            data: clientResponse,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// // Get all clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await getAllClientsService();
        res.status(200).json({
            status: 'success',
            message: 'All clients retrieved successfully',
            data: clients,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// // Get client by ID
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await getClientByIdService(id);

        res.status(200).json({
            status: 'success',
            message: 'Client retrieved successfully',
            data: client,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// // Update client details
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, job, rate, isActive } = req.body;

        const updatedClient = await updateClientService(id, { name, email, job, rate, isActive });

        res.status(200).json({
            status: 'success',
            message: 'Client updated successfully',
            data: updatedClient,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// // Delete client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteClientService(id);

        res.status(200).json({
            status: 'success',
            message: 'Client deleted successfully',
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const searchClients = async (req, res) => {
    try {
        const searchTerm = req.query.q;

        const clients = await searchClientsService(searchTerm);

        if (clients.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: `No clients found matching "${searchTerm}"`,
                data: [],
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Clients retrieved successfully',
            data: clients,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

