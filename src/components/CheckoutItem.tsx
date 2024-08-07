
import { useEffect, useState } from 'react'

// import axios from 'axios'
import { getAllProducts, initDB } from '@/utils/db'

type CheckoutItemProps = {
  id: number
  quantity: number
}


interface Product {
  id: number
  name: string
  description: string
  price: number
  thumbnail: string
  image: [string]
  availability: number
  reviews: [{ id: number, user: string, rating: number, review: string, date: string }]
  category: [string]
  subcategory: string
}

const CheckoutItem = ({ id, quantity }: CheckoutItemProps) => {

  const [products, setProducts] = useState<Product[]>([])

  // useEffect(() => {
  //   console.log('Fetching products...');

  //   axios.get('https://jsondummy.vercel.app/api/products?type=furniture')
  //     .then((response) => {
  //       setProducts(response.data.products)
  //       console.log('Products fetched:');

  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error)
  //     })
  // }, [])


  //-------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchProductsFromDB = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setProducts(productsFromDB);
    };

    fetchProductsFromDB();
  }, []);



  //--------------------------------------------------------------------------------------------------------------

  const item = products.find(i => i.id == id);
  if (item == null) return null;
  console.log("hello",id)

  return (
    <div>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={item.thumbnail} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
            <p className="mt-1 text-xs text-gray-700">{item.description}</p>
            <p className="text-sm font-bold">${item.price}</p>
            <p className="text-sm">Qty: {quantity}</p>
          </div>
          <div className="mt-4 flex  justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

            <div className="flex   space-x-4">


              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
