import React, { useState, useEffect } from 'react';
import apiItemServices from '../api/apiItemServices';
import Action from '../utils/Actions';
import ModalInsertItem from '../utils/ModalInsertItem';

const COLOR_REVENUE = 'white-text green ';
const COLOR_EXPENSE = 'white-text red lighten-1';

export default function Items() {  
  const [allItems, setAllItems] =  useState([]);
 
  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemFilter, setItemFilter] =  useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      await fetchItems();
    };

    getItems();
  }, []);  
  
  const fetchItems = async () => {
    let allItems = await apiItemServices.getAllItems();
    setAllItems(allItems);
    setFilteredItems(allItems);

  }

  const handleActionClick  = async (id, item) =>{
    if (item === 'edit'){
      const editing = allItems.filter(item => item.id === id);
      handleOpenModalUpdate(editing[0]);
    }

    if (item === 'delete'){
      const deleting = allItems.filter(item => item.id === id);
      handleDelete(deleting[0]);
    }
    if (id.target && id.target.id === 'create'){
      handleInsert();     
    }

    console.log(id);
    console.log(item);
  }
  const handleDelete = async (itemToDelete) => {
    await apiItemServices.deleteItem(itemToDelete);
    await fetchItems();
  };

  const handleOpenModalUpdate = (item) => {
    setSelectedItem(item);    
    setIsModalOpen(true);
  };

  const handleInsert = (item) => {
    setIsModalOpenCreate(true);
  };

  const handleCreateData = async (formData) => {   

    const retorno = await apiItemServices.insertItem(formData);
    console.log('retorno api', retorno);
    handleClose();
    await fetchItems();
  };

  const handleUpdateData = async (formData) => {
    const retorno = await apiItemServices.updateItem(formData);
    console.log('retorno api', retorno);
    handleClose();
    await fetchItems();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalOpenCreate(false);
    setIsModalOpen(false);
  };
  
 

  const handleChangeFilter = (event) => {
    const newText = event.target.value;
    setItemFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filtered = allItems.filter((item) => {
      return item.name.toLowerCase().includes(filterLowerCase) > 0;
    });

    setFilteredItems(filtered);
    
  }; 

  return (
    <div className="container">
      <h1 className= "center">Items</h1>
      <h3 className= "center">Items Registration</h3>

      <form action="#">
          <div className="file-field input-field">
            <div className="btn" id="create" onClick={handleActionClick}>
              <span id="create" onClick={handleActionClick}> + New Item</span>
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
              <div className="col s8">Name</div>            
              <div className="col s2 right-align">Actions</div>
              </div>
            
          </li>     
          {
            filteredItems.map(item =>{
              return (
                <li className='collection-item'  key={item.id}>
                  <div className="row ">
                  <div className="col s2">{item.id}</div>
                    <div className="col s8">{item.name}</div>
                       
                    <div className="col s2 right-align">                  
                      <Action
                        onActionClick={handleActionClick}
                        id={item.id}
                        type={'edit'}                      
                      />
                      <Action
                        onActionClick={handleActionClick}
                        id={item.id}                      
                        type={'delete' }
                      />
                    </div>
                    </div>
                  
                </li>
              );
            })            
          }
      </ul>
      {isModalOpen && selectedItem && (
        <ModalInsertItem
          onSave={handleUpdateData} 
          onClose={handleClose}
          selectedItem={selectedItem}
        />
      )}
      
      {isModalOpenCreate && (
        <ModalInsertItem 
          onSave={handleCreateData} 
          onClose={handleClose}
        />
      )}   
                    
    </div>
  ) 
}

