// Mock MongoDB service for development
const mockDatabase = {
  products: [],
  users: [],
  orders: []
};

export const connectDB = async () => {
  console.log('Connected to mock database');
  return true;
};

export const getProducts = async () => {
  return mockDatabase.products;
};

export const addProduct = async (product) => {
  const newProduct = { ...product, id: Date.now().toString() };
  mockDatabase.products.push(newProduct);
  return newProduct;
};

export const getUsers = async () => {
  return mockDatabase.users;
};

export const addUser = async (user) => {
  const newUser = { ...user, id: Date.now().toString() };
  mockDatabase.users.push(newUser);
  return newUser;
};

export default {
  connectDB,
  getProducts,
  addProduct,
  getUsers,
  addUser
};