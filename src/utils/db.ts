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

export const addProducts = async (db: any, products: any, key?: any) => {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  for (const product of products) {
    try {
      
      if (key) {
        console.log("key",key)
        await store.put(product, key);
      } else {
        await store.put(product);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }

  await tx.done;
};

export const deleteProduct = async (db: any, id: any) => {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  try {
    await store.delete(id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }

  await tx.done;
  
};

export const decreaseProductAvailability = async (db: any, id: any, quantity: number) => {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const product = await store.get(id);

  if (product && product.availability >= quantity) {
    product.availability -= quantity; // Decrease the stock by quantity
    await store.put(product); // Update the product with the new stock
  } else {
    console.error('Product out of stock or insufficient quantity');
    throw new Error('Product out of stock');
  }

  await tx.done;
};