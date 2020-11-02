import axios from 'axios';

async function getAllItems(){
  const res = await axios.get(`http://localhost:8080/api/v1/stock/item`);

  const items = res.data.map((item)=> {
    const {name} = item;

    return {
      ...item,
      nameLowerCase: name.toLowerCase(),   
      
      isDeleted: false,
    };
  });

  return items;
}

async function insertItem (item) {
  const res = await axios.post('http://localhost:8080/api/v1/stock/item', item);
  return res.data;
}

async function updateItem (item) {
  console.warn('updating', item);
  const res = await axios.put(`http://localhost:8080/api/v1/stock/item/${item.id}`, item);
  return res.data;
}

async function deleteItem (item) {
  try {
    const res = await axios.delete(`http://localhost:8080/api/v1/stock/item/${item.id}`);
    return res.data;
  } catch (error) {
    alert('Its not possible to delete the selected item!')
  }
  
}

export default { getAllItems, insertItem, updateItem, deleteItem };



  