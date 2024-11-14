import { Op } from 'sequelize';
import sequelize from '../db.js';
import clientModel from '../models/clients.js'; // Add the .js extension


// Register a new client
export const registerClientService = async ({ name, email, job, rate, isActive }) => {
    const existingClient = await clientModel.findOne({ where: { email } });

    if (existingClient) {
        throw new Error('Email already exists');
    }

    const client = await clientModel.create({
        name,
        email,
        job,
        rate,
        isActive,
    });

    return {
        id: client.id,
        name: client.name,
        email: client.email,
        job: client.job,
        rate: client.rate,
        isActive: client.isActive,
    };
};

// Get all clients
export const getAllClientsService = async () => {
    return await clientModel.findAll();
};

// // Get client by ID
export const getClientByIdService = async (id) => {
    const client = await clientModel.findByPk(id);
    if (!client) {
        throw new Error('Client not found');
    }
    return client;
};

// // Update client details
export const updateClientService = async (id, { name, email, job, rate, isActive }) => {
    const client = await clientModel.findByPk(id);

    if (!client) {
        throw new Error('Client not found');
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.job = job || client.job;
    client.rate = rate || client.rate;
    client.isActive = isActive ?? client.isActive;
    client.updatedAt = new Date();

    await client.save();
    return client;
};

// // Delete client
export const deleteClientService = async (id) => {
    const client = await clientModel.findByPk(id);
    if (!client) {
        throw new Error('Client not found');
    }

    await client.destroy();
};

export const searchClientsService = async (search) => {
    return await clientModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { job: { [Op.iLike]: `%${search}%` } },
            ],
        },
    });
}