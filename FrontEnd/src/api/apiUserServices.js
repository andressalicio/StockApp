import axios from 'axios';

async function getAllUsers(){
  const res = await axios.get(`http://localhost:8080/api/v1/stock/user`);

  const users = res.data.map((user)=> {
    const {name, email} = user;

    return {
      ...user,
      nameLowerCase: name.toLowerCase(),
      emailLowerCase: email.toLowerCase(),
      isDeleted: false,
    };
  });

  return users;
}

async function insertUser (user) {
  const res = await axios.post('http://localhost:8080/api/v1/stock/user', user);
  return res.data;
}

async function updateUser (user) {
  console.warn('updating', user);
  const res = await axios.put(`http://localhost:8080/api/v1/stock/user/${user.id}`, user);
  return res.data;
}

async function deleteUser (user) {
  try {
    const res = await axios.delete(`http://localhost:8080/api/v1/stock/user/${user.id}`);
    return res.data;
  } catch (error) {
    alert('Its not possible to delete the selected user!')
  }
  
}

export default { getAllUsers, insertUser, updateUser, deleteUser };



  