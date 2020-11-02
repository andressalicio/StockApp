import React, { useState, useEffect } from 'react';
import apiOrdersServices from '../api/apiOrdersServices';
import Action from '../utils/Actions';
import ModalInsertOrders from '../utils/ModalInserOrders';

const COLOR_REVENUE = 'white-text green ';
const COLOR_EXPENSE = 'white-text red lighten-1';

export default function Orders() {  
    const [allOrders, setAllOrders] =  useState([]);

    const [selectedOrders, setSelectedOrders] = useState({});
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordersFilter, setOrdersFilter] =  useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
  
    useEffect(() => {
      const getOrders = async () => {
        await fetchOrders();
      };
  
      getOrders();
    }, []);  
    
    const fetchOrders = async () => {
      let allOrders = await apiOrdersServices.getAllOrders();
      setAllOrders(allOrders);
      setFilteredOrders(allOrders);
  
    }   
  
    const handleActionClick  = async (id, order) =>{
      if (order === 'edit'){
        const editing = allOrders.filter(order => order.id === id);
        handleOpenModalUpdate(editing[0]);
      }
  
      if (order === 'delete'){
        const deleting = allOrders.filter(order => order.id === id);
        handleDelete(deleting[0]);
      }
      if (id.target && id.target.id === 'create'){
        handleInsert();     
      }
  
      console.log(id);
      console.log(order);
    }
  
    const handleDelete = async (stockMovementToDelete) => {
      await apiOrdersServices.deleteOrders(stockMovementToDelete);
      await fetchOrders();
    };
  
    const handleOpenModalUpdate = (order) => {
      setSelectedOrders(order);  
       
      setIsModalOpen(true);
    };
  
    const handleInsert = (order) => {
      setIsModalOpenCreate(true);
    };
  
    const handleCreateData = async (formData) => {   
  
      const retorno = await apiOrdersServices.insertOrders(formData);
      console.log('retorno api', retorno);
      handleClose();
      await fetchOrders();
    };
  
    const handleUpdateData = async (formData) => {
      const retorno = await apiOrdersServices.updateOrders(formData);
      console.log('retorno api', retorno);
      handleClose();
      await fetchOrders();
    };
  
    const handleClose = () => {
      setIsModalOpen(false);
      setIsModalOpenCreate(false);
      setIsModalOpen(false);
    };
    
   
  
    const handleChangeFilter = (event) => {
      const newText = event.target.value;
      setOrdersFilter(newText);
  
      const filterLowerCase = newText.toLowerCase();
  
      const filtered = allOrders.filter((order) => {
        return order.item.name.toLowerCase().includes(filterLowerCase) > 0;
      });
  
      setFilteredOrders(filtered);
      
    }; 

  return (
    <div className="container">
      <h1 className= "center">Orders</h1>
      <h3 className= "center">Orders Registration</h3>  

      <form action="#">
          <div className="file-field input-field">
            <div className="btn" id="create" onClick={handleActionClick}>
              <span id="create" onClick={handleActionClick}> + New Order</span>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Filter by Name" onChange={handleChangeFilter}/>
            </div>  
          </div> 
      </form>

      <ul className="collection collection-sem-borda">   
      <li className='collection-item' >
          <div className="row ">
            <div className="col s2">Id</div>
            <div className="col s2">Creation Date</div>
            <div className="col s2">Name</div>
            <div className="col s2">Quantity</div>
            <div className="col s2">User</div>
            <div className="col s2 right-align">Actions</div>
            </div>
          
        </li>     
          {
            filteredOrders.map(order =>{
              return (
                <li className='collection-item'  key={order.id}>
                  <div className="row ">
                    <div className="col s2">{order.id}</div>
                    <div className="col s2">{order.creationDate}</div>
                    <div className="col s2">{order.item.name}</div>
                    <div className="col s2">{order.quantity}</div>
                    <div className="col s2">{order.user.name}</div>
                    
                    <div className="col s2 right-align">                  
                      <Action
                        onActionClick={handleActionClick}
                        id={order.id}
                        type={'edit'}                      
                      />
                      <Action
                        onActionClick={handleActionClick}
                        id={order.id}                      
                        type={'delete' }
                      />
                    </div>
                    </div>
                  
                </li>
              );
            })            
          }
      </ul> 

      {isModalOpen && selectedOrders && (
        <ModalInsertOrders
          onSave={handleUpdateData} 
          onClose={handleClose}
          selectedOrders={selectedOrders}
        />
      )}
      
      {isModalOpenCreate && (
        <ModalInsertOrders
          onSave={handleCreateData} 
          onClose={handleClose}
        />
      )}                    
    </div>
  ) 
}

