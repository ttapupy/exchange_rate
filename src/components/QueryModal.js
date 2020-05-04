import React from 'react';
import Modal from 'react-modal';


const QueryModal = ({ handleClose, show }) => {
  const showHide = show ? "modal display-block" : "modal display-none";
 
  return (
    <div className={showHide}>
      <Modal className="modal-main" isOpen={show} onRequestClose={handleClose} >
      <h3>vajon mi?</h3>
        <button onClick={handleClose}>close</button>
      </Modal>
    </div>
  );

};


export default QueryModal;
