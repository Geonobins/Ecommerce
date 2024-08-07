import ButtonComponent from './ButtonComponent';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import {useDispatch} from 'react-redux'
import { getAllProducts, initDB } from '@/utils/db';
import { decreaseItemQuantity, increaseItemQuantity, removeFromCart } from '../features/cart/cartSlice'

type CartItemProps = {
    id: number
    quantity: number
}

interface Product {
    id: number
    name: string
    description: string
    price: number
    thumbnail: string
    image: string[]
    availability: number
    reviews: { id: number, user: string, rating: number, review: string, date: string }[]
    category: string[]
    subcategory: string
}

const CartItem = ({ id, quantity }: CartItemProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.log('Fetching products...');

    //     axios.get('https://jsondummy.vercel.app/api/products?type=furniture')
    //         .then((response) => {
    //             setProducts(response.data.products);
    //             console.log('Products fetched:', response.data.products);
    //         })
    //         .catch((error) => {
    //             console.error('There was an error!', error);
    //         });
    // }, []);

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

    const item = products.find(i => i.id === id);
    if (item == null) return null;

    const handleDecrease = () => {
        dispatch(decreaseItemQuantity(id));
    }

    const handleIncrease = () => {
        dispatch(increaseItemQuantity(id));
    }

    const handleRemove = () => {
        dispatch(removeFromCart(id));
    }

    return (
        <>
            <div>
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${item.price}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {quantity}</p>
                    <div onClick={handleIncrease}>
                        <ButtonComponent value="+" bg="bg-gray-300" />
                    </div>
                    <div onClick={handleDecrease}>
                        <ButtonComponent value="-" bg="bg-gray-300" />
                    </div>
                    <div className="flex">
                        <button type="button" onClick={handleRemove} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartItem;
