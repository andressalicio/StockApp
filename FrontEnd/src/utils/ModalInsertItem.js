import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function  ModalInsert ({ onSave, onClose, selectedItem }) { 
  const [id, setId] = useState(null);
  const [name, setName] = useState('');


  useEffect(() => {
    if (selectedItem){
      console.log(selectedItem);
      setId(selectedItem.id);
      setName(selectedItem.name);
   
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };  

  const handleItemChange= (event) => {
    if (event.target.id === 'inputName'){
      setName(event.target.value);
    }

  };

  const handleModalClose = () => {
    onClose(null);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();   

    const formData = {
      id: id,
      name: name,     
    };

    onSave(formData);
  };

  

  return (
    <div> 
      <Modal isOpen={true} style={customStyles} >
        <div style={styles.flexRow}>
          <span style={styles.title}></span>            
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>
            X
          </button>
        </div>
        <div className="container" style={styles.modalDialog} > 
          <h3 style={styles.title} className= "center">Item</h3>
          
        
          <form onSubmit={handleFormSubmit} >                   
        
            <div className="input-field col s12 m6 l3" >
              <input id="inputName" type="text" value={name} onChange={handleItemChange} required/>
              <label className="active" htmlFor="inputName">
                Item Name:
              </label>
            </div>                    


            <div style={styles.flexRow}>
              <button className="waves-effect waves-light btn">
                Salvar
              </button>
              
            </div>
          
          </form>
        </div>
        
      </Modal>
    </div>
  );    
}

const styles = {
  flexRow: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  tamanho: {
    width: '250px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  modalDialog: {
    width: '400px'
  },
 
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};