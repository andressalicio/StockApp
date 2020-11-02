import React, { useState, useEffect } from 'react';
import apiUserServices from '../api/apiUserServices';
import Action from '../utils/Actions';
import ModalInsertUser from '../utils/ModalInsertUser';

const COLOR_REVENUE = 'white-text green ';
const COLOR_EXPENSE = 'white-text red lighten-1';

export default function Users() {  
  const [allUsers, setAllUsers] =  useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFilter, setUserFilter] =  useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers();
    };

    getUsers();
  }, []);  
  
  const fetchUsers = async () => {
    let allUsers = await apiUserServices.getAllUsers();
    setAllUsers(allUsers);
    setFilteredUsers(allUsers);

  }

  const handleActionClick  = async (id, user) =>{
    if (user === 'edit'){
      const editing = allUsers.filter(user => user.id === id);
      handleOpenModalUpdate(editing[0]);
    }

    if (user === 'delete'){
      const deleting = allUsers.filter(user => user.id === id);
      handleDelete(deleting[0]);
    }
    if (id.target && id.target.id === 'create'){
      handleInsert();     
    }

    console.log(id);
    console.log(user);
  }

  const handleDelete = async (userToDelete) => {
    await apiUserServices.deleteUser(userToDelete);
    await fetchUsers();
  };

  const handleOpenModalUpdate = (user) => {
    setSelectedUser(user);    
    setIsModalOpen(true);
  };

  const handleInsert = (user) => {
    setIsModalOpenCreate(true);
  };

  const handleCreateData = async (formData) => {   

    const retorno = await apiUserServices.insertUser(formData);
    console.log('retorno api', retorno);
    handleClose();
    await fetchUsers();
  };

  const handleUpdateData = async (formData) => {
    const retorno = await apiUserServices.updateUser(formData);
    console.log('retorno api', retorno);
    handleClose();
    await fetchUsers();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalOpenCreate(false);
    setIsModalOpen(false);
  };
  
 

  const handleChangeFilter = (event) => {
    const newText = event.target.value;
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filtered = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(filterLowerCase) > 0;
    });

    setFilteredUsers(filtered);
    
  }; 
  return (
    <div className="container">

      <h1 className= "center">Users</h1>
      <h3 className= "center">User Registration </h3>    

      <form action="#">
          <div className="file-field input-field">
            <div className="btn" id="create" onClick={handleActionClick}>
              <span id="create" onClick={handleActionClick}> + New User</span>
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
            <div className="col s4">Name</div>  
            <div className="col s4">E-mail</div>            
            <div className="col s2 right-align">Actions</div>
          </div>            
          </li>    
          {
            filteredUsers.map(user =>{
              return (
                <li className='collection-item'  key={user.id}>
                  <div className="row ">
                  <div className="col s2">{user.id}</div>
                    <div className="col s4">{user.name}</div>
                    <div className="col s4">{user.email}</div>

                    <div className="col s2 right-align">                  
                      <Action
                        onActionClick={handleActionClick}
                        id={user.id}
                        type={'edit'}                      
                      />
                      <Action
                        onActionClick={handleActionClick}
                        id={user.id}                      
                        type={'delete' }
                      />
                    </div>
                    </div>                  
                </li>
              );
            })            
          }
      </ul> 

      {isModalOpen && selectedUser && (
        <ModalInsertUser 
          onSave={handleUpdateData} 
          onClose={handleClose}
          selectedUser={selectedUser}
        />
      )}
      
      {isModalOpenCreate && (
        <ModalInsertUser 
          onSave={handleCreateData} 
          onClose={handleClose}
        />
      )}        
    </div>
  ) 
}

