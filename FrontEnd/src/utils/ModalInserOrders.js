import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import apiItemServices from '../api/apiItemServices';
import apiOrdersServices from '../api/apiOrdersServices';
import apiUserServices from '../api/apiUserServices';
Modal.setAppElement('#root');

export default function  ModalInsert ({ onSave, onClose, selectedOrders}) { 
  const [id, setId] = useState(null);  
  const [quantity, setQuantity] = useState('');

  const [selectedItem, setSelectedItem] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [allItems, setAllItems] =  useState([]);
  const [allUsers, setAllUsers] =  useState([]);

  const [allStockMovements, setAllStockMovements] =  useState([]);

  useEffect(() => {
    if (selectedOrders){
     
      setId(selectedOrders.id);      
      setSelectedItem(selectedOrders.item);
      setSelectedUser(selectedOrders.user)
      setQuantity(selectedOrders.quantity);

      fetchStockMovements();
    }

    fetchItems();
    fetchUsers();

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchItems = async () => {
    let allItems = await apiItemServices.getAllItems();
    setAllItems(allItems);    

  }

  const fetchUsers = async () => {
    let allUsers = await apiUserServices.getAllUsers();
    setAllUsers(allUsers);
    
  }

  const fetchStockMovements = async () => {
    let allMovements = await apiOrdersServices.getAllStockMovements(selectedOrders);
    setAllStockMovements(allMovements); 
    console.log(allMovements);
  }
  
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };  

  const handleOrderChange= (event) => {
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
      quantity:quantity,
      user:selectedUser
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

  const handleChangeUser = async (event) => {
    const userId = event.target.value;
    const userAux = allUsers.find(user => {
      return user.id == userId
    })

    setSelectedUser(userAux);
    console.log(userAux)
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
          <h3 style={styles.title} className= "center">Orders</h3>
          
        
          <form onSubmit={handleFormSubmit} >                   
        
            
            <div className="input-field col s12 m6 l3">
              <input id="inputQuantity" type="number" value={quantity} min={0} onChange={handleOrderChange} required/>
              <label className="active" htmlFor="inputQuantity">
                Quantity:
              </label>
            </div>           

            <div className="input-field col s12 m6 l3">
              <select className="browser-default " name="inputItem" onChange={handleChangeItem} value={selectedItem.id}>
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

            <div className="input-field col s12 m6 l3">
              <select className="browser-default " name="inputUser" onChange={handleChangeUser} value={selectedUser.id}>
                <option  selected hidden value="" disabled>Select an user</option>
                {
                  allUsers.map(user =>{
                    return <option key={user.id} value={user.id} >{user.name}</option>;  
                  })
                }
              </select>      
              <label className="active" htmlFor="inputItem">
                User:
              </label>                       
            </div>

            {
                allStockMovements.length > 0 && (
              <table>
                <thead>
                  <tr>
                      <th>Movement Id</th>
                      <th>Item Name</th>
                      <th>Quantity used</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    allStockMovements.map(movement =>{
                      return (
                        <tr key={movement.id}>
                          <td>{movement.stockMovement.id}</td>
                          <td>{movement.stockMovement.item.name}</td>
                          <td>{movement.quantity}</td>
                        </tr>
                    );  
                    })
                  }
                  
                  
                </tbody>
              </table>
              )
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