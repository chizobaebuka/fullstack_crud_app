import { useState } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]); // add this

  const handleOpen = (mode, client) => {
    setIsOpen(true);
    if (client) {
      setClientData(client);
    }
    setModalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients/add', newClientData);
        console.log('Client added:', response.data);
        setTableData((prevData) => [...prevData, response.data.data]);
      } catch (error) {
        console.error('Error adding client:', error);
      }
      console.log('modal mode Add');
    } else {
      console.log('Updating client with ID:', clientData.id);
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data.data : client))
        );
      } catch (error) {
        console.error('Error updating client:', error);
      }
    }
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList
        handleOpen={handleOpen}
        searchTerm={searchTerm}
        setTableData={setTableData}
        tableData={tableData}
      />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
