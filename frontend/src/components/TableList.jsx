import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({ handleOpen, searchTerm }) {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = searchTerm 
                    ? `http://localhost:3000/api/clients/search?q=${searchTerm}`
                    : 'http://localhost:3000/api/clients';
                
                const response = await axios.get(endpoint);
                setTableData(response.data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [searchTerm]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this client?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/clients/${id}`);
                console.log('Client deleted:', response.data);
                setTableData((prevData) => {
                    const newData = prevData.filter((client) => client.id !== id);
                    // Reassign IDs starting from 1
                    return newData.map((client, index) => ({
                        ...client,
                        id: index + 1, // Set ID to start from 1
                    }));
                });
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };
    

    return (
        <>
            { error && <div className="alert alert-danger">{error}</div> }
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {tableData.map((client) => (
                            <tr key={client.id}>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline-primary`}`}>
                                        {client.isactive ? `Active` : `Inactive`}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit', client)} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
