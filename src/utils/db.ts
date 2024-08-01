// db.js
import { openDB } from 'idb';

const DB_NAME = 'MyAppDB';
const STORE_NAME = 'products';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  return db;
};

export const getAllProducts = async (db:any) => {
  return await db.getAll(STORE_NAME);
};

export const addProducts = async (db: any, products: any) => {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME); // Get the object store
  products.forEach((product: any) => store.put(product)); // Use the store to put the product
  await tx.done; // Wait for the transaction to complete
};