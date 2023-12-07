import React, { ReactNode, useState } from 'react';
import '../../App.css'; // Import your modal styles here

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (editedValues: any) => void;
  children: ReactNode;
}

const EditPeople: React.FC<ModalProps> = ({ isOpen, onClose, onEdit, children }) => {
  const [values, setValues] = useState({
    PeopleID: '',
    Username: '',
    Email: '',
    FirstName: '',
    LastName: '',
    Tel: '',
  });

  if (!isOpen) {
    return null;
  }

  const handleSaveClick = () => {
    onEdit(values);
    onClose();
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        {/* <div className='buttonsum'>
          <button className="EditButton" onClick={handleSaveClick}>
            Save
          </button>
          <button className="close-button" onClick={onClose}>
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EditPeople;
