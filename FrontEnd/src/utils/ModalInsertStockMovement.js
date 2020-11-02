import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import apiItemServices from '../api/apiItemServices';
import apiStockMovementServices from '../api/apiStockMovementServices';
Modal.setAppElement('#root');

export default function  ModalInsert ({ onSave, onClose, selectedStock }) { 
  const [id, setId] = useState(null);  
  const [quantity, setQuantity] = useState('');

  const [selectedItem, setSelectedItem] = useState({});
  const [allItems, setAllItems] =  useState([]);
  const [allOrders, setAllOrders] =  useState([]);

  useEffect(() => {
    if (selectedStock){
      setId(selectedStock.id);      
      setSelectedItem(selectedStock.item);
      setQuantity(selectedStock.quantity);
      
      fetchMovements();
    }

    fetchItems();
    

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchItems = async () => {
    let allItems = await apiItemServices.getAllItems();
    setAllItems(allItems);    

  }

  const fetchMovements = async () => {
    let allOrders = await apiStockMovementServices.getAllMovements(selectedStock);
    setAllOrders(allOrders); 
    console.log(allOrders);
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };  

  const handleStockChange= (event) => {
    if (event.target.id === 'inputQuantity'){
      setQuantity(event.target.value);
    }
  };

  const handleModalClose = () => {
    onClose(null);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();   

    const formData = {
      id: id,
      creationDate: "",
      item: selectedItem,
      quantity:quantity
    };


    onSave(formData);
  };

  const handleChangeItem = async (event) => {
    const itemId = event.target.value;
    const itemAux = allItems.find(item => {
      return item.id == itemId
    })

    setSelectedItem(itemAux);
    console.log(itemAux)
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
          <h3 style={styles.title} className= "center">Stock Movement</h3>
          
        
          <form onSubmit={handleFormSubmit} >                   
        
            
            <div className="input-field col s12 m6 l3">
              <input id="inputQuantity" type="number" value={quantity} min={0} onChange={handleStockChange} required/>
              <label className="active" htmlFor="inputQuantity">
                Quantity:
              </label>
            </div>           

            <div className="input-field col s12 m6 l3">
              <select className="browser-default " name="inputItem" onChange={handleChangeItem} value={selectedItem.id}d>
                <option  selected hidden value="" disabled>Select an item</option>
                {
                  allItems.map(item =>{
                    return <option key={item.id} value={item.id} >{item.name}</option>;  
                  })
                }
              </select>      
              <label className="active" htmlFor="inputItem">
                Item:
              </label>                       
            </div>

            {
              allOrders.length > 0 && (<table>
                <thead>
                  <tr>
                      <th>Order Id</th>
                      <th>Item Name</th>
                      <th>Quantity used</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    allOrders.map(movement =>{
                      return (
                        <tr key={movement.id}>
                          <td>{movement.orders.id}</td>
                          <td>{movement.stockMovement.item.name}</td>
                          <td>{movement.quantity}</td>
                        </tr>
                    );  
                    })
                  }
                  
                  
                </tbody>
              </table>)
            }
            


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