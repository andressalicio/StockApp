import axios from 'axios';

async function getAllStockMovements(){
  const res = await axios.get(`http://localhost:8080/api/v1/stock/movement`);

  const stockMovements = res.data;
  return stockMovements;
}

async function insertStockMovement(stockMovement) {
  const res = await axios.post('http://localhost:8080/api/v1/stock/movement', stockMovement);
  return res.data;
}

async function getAllMovements(movement){
  const res = await axios.get(`http://localhost:8080/api/v1/stock/movement/stockMovements/${movement.id}`);

  const movements = res.data
  return movements;
}

async function updateStockMovement (stockMovement) {
  console.warn('updating', stockMovement);
  const res = await axios.put(`http://localhost:8080/api/v1/stock/movement/${stockMovement.id}`, stockMovement);
  return res.data;
}

async function deleteStockMovement (stockMovement) {
  try {
    const res = await axios.delete(`http://localhost:8080/api/v1/stock/movement/${stockMovement.id}`);
    return res.data;
  } catch (error) {
    alert('Its not possible to delete the selected stock movement!')
  }
  
}

export default { getAllStockMovements, insertStockMovement, updateStockMovement, deleteStockMovement, getAllMovements };



  