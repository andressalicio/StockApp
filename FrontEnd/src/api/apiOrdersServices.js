import axios from 'axios';

async function getAllOrders(){
  const res = await axios.get(`http://localhost:8080/api/v1/stock/orders`);

  const orders = res.data
  return orders;
}

async function getAllStockMovements(order){
  console.warn(order);
  const res = await axios.get(`http://localhost:8080/api/v1/stock/orders/stockMovements/${order.id}`);

  const movements = res.data
  return movements;
}

async function insertOrders (order) {
  const res = await axios.post('http://localhost:8080/api/v1/stock/orders', order);
  return res.data;
}

async function updateOrders (order) {
  console.warn('updating', order);
  const res = await axios.put(`http://localhost:8080/api/v1/stock/orders/${order.id}`, order);
  return res.data;
}

async function deleteOrders(order) {
  try {
    const res = await axios.delete(`http://localhost:8080/api/v1/stock/orders/${order.id}`);
    return res.data; 
  } catch (error) {
    alert('Its not possible to delete the selected order!');
  }
}

export default { getAllOrders, insertOrders, updateOrders, deleteOrders, getAllStockMovements };



  