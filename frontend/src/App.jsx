import { useState } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import Navbar from './components/Navbar'
import TableList from './components/TableList'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = () => {
    if(modalMode === 'add') {
      console.log(`modal mode is ${Add}`);
    } else {
      console.log(`modal mode is ${Edit}`);
    }
  }

  return (
    <>
      <Navbar onOpen={() => { handleOpen('add') }} />
      <TableList handleOpen={handleOpen}/>
      <ModalForm 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onSubmit={handleSubmit}
        mode={modalMode}
      />
    </>
  )
}

export default App
