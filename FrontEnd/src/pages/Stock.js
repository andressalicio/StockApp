import React, { useState, useEffect } from 'react';
import apiStockMovementServices from '../api/apiStockMovementServices';
import Action from '../utils/Actions';
import ModalInsertStockMovement from '../utils/ModalInsertStockMovement';

const COLOR_REVENUE = 'white-text green ';
const COLOR_EXPENSE = 'white-text red lighten-1';

export default function StockMovement() {  
    const [allStockMovement, setAllStockMovement] =  useState([]);
    const [selectedStock, setSelectedStock] = useState({});
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stockFilter, setStockFilter] =  useState('');
    const [filteredStocks, setFilteredStocks] = useState([]);
  
    useEffect(() => {
      const getStockMovement = async () => {
        await fetchStockMovement();
      };
  
      getStockMovement();
    }, []);  
    
    const fetchStockMovement = async () => {
      let allStockMovement = await apiStockMovementServices.getAllStockMovements();
      setAllStockMovement(allStockMovement);
      setFilteredStocks(allStockMovement);
  
    }
   
    const handleActionClick  = async (id, stockMovement) =>{
      if (stockMovement === 'edit'){
        const editing = allStockMovement.filter(stockMovement => stockMovement.id === id);
        handleOpenModalUpdate(editing[0]);
      }
  
      if (stockMovement === 'delete'){
        const deleting = allStockMovement.filter(stockMovement => stockMovement.id === id);
        handleDelete(deleting[0]);
      }
      if (id.target && id.target.id === 'create'){
        handleInsert();     
      }
  
      console.log(id);
      console.log(stockMovement);
    }
  
    const handleDelete = async (stockMovementToDelete) => {
      await apiStockMovementServices.deleteStockMovement(stockMovementToDelete);
      await fetchStockMovement();
    };
  
    const handleOpenModalUpdate = (stockMovement) => {
      setSelectedStock(stockMovement);    
      setIsModalOpen(true);
    };
  
    const handleInsert = (stockMovement) => {
      setIsModalOpenCreate(true);
    };
  
    const handleCreateData = async (formData) => {   
  
      const retorno = await apiStockMovementServices.insertStockMovement(formData);
      console.log('retorno api', retorno);
      handleClose();
      await fetchStockMovement();
    };
  
    const handleUpdateData = async (formData) => {
      const retorno = await apiStockMovementServices.updateStockMovement(formData);
      console.log('retorno api', retorno);
      handleClose();
      await fetchStockMovement();
    };
  
    const handleClose = () => {
      setIsModalOpen(false);
      setIsModalOpenCreate(false);
      setIsModalOpen(false);
    };
    
   
  
    const handleChangeFilter = (event) => {
      const newText = event.target.value;
      setStockFilter(newText);
  
      const filterLowerCase = newText.toLowerCase();
  
      const filtered = allStockMovement.filter((stockMovement) => {
        return stockMovement.item.name.toLowerCase().includes(filterLowerCase) > 0;
      });
  
      setFilteredStocks(filtered);
      
    }; 

  return (
    <div className="container">
      <h1 className= "center">Stock</h1>
      <h3 className= "center">Movement Stock Registration</h3>  

      <form action="#">
          <div className="file-field input-field">
            <div className="btn" id="create" onClick={handleActionClick}>
              <span id="create" onClick={handleActionClick}> + New Movement Stock</span>
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
            <div className="col s3">Creation Date</div>
            <div className="col s2">Name</div>
            <div className="col s3">Quantity</div>
            <div className="col s2 right-align">Actions</div>
            </div>
          
        </li>

          {
            filteredStocks.map(stockMovement =>{
              return (
                <li className='collection-item'  key={stockMovement.id}>
                  <div className="row ">
                    <div className="col s2">{stockMovement.id}</div>
                    <div className="col s3">{stockMovement.creationDate}</div>
                    <div className="col s2">{stockMovement.item.name}</div>
                    <div className="col s3">{stockMovement.quantity}</div>
                    
                    
                    <div className="col s2 right-align">                  
                      <Action
                        onActionClick={handleActionClick}
                        id={stockMovement.id}
                        type={'edit'}                      
                      />
                      <Action
                        onActionClick={handleActionClick}
                        id={stockMovement.id}                      
                        type={'delete' }
                      />
                    </div>
                    </div>
                  
                </li>
              );
            })            
          }
      </ul>   

      {isModalOpen && selectedStock && (
        <ModalInsertStockMovement 
          onSave={handleUpdateData} 
          onClose={handleClose}
          selectedStock={selectedStock}
        />
      )}
      
      {isModalOpenCreate && (
        <ModalInsertStockMovement 
          onSave={handleCreateData} 
          onClose={handleClose}
        />
      )}                         
    </div>
  ) 
}
