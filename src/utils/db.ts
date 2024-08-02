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