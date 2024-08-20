import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/ButtonComponent';
// import axios from 'axios';
import { CarouselOrientation } from '@/components/CarouselOrientation';
import { FooterComponent } from '@/components/FooterComponent';
import { ProductCarousel } from '@/components/ProductCarousel';
import { deleteProduct, getAllProducts, initDB } from '@/utils/db';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import ConfirmModal from '@/components/ConfirmModal';
import { increaseItemQuantity, openCart, removeFromCart } from '../features/cart/cartSlice'
import {useDispatch} from 'react-redux'
import Breadcrumbs from '@/components/Breadcrumbs';

type ReviewProps = {
  id: string;
  user: string;
  rating: number;
  review: string;
  date: string;
};

interface Product {
  id: number
  name: string
  description: string
  price: number
  thumbnail: string
  image: [string]
  availability: number
  reviews: ReviewProps[]
  category: [string]
  subcategory: string
}

const ProductDetails = () => {

  const [cartStatus, setCartStatus] = useState("Add to Cart")

  const [products, setProducts] = useState<Product[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()



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

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);

  
  const product = products.find((product) => product.id == id);

  const { user } = useAuth0();


  if (!product) {
    return <div>Product not found</div>;
  }


  const handleTab = (index: number) => {
    setIndex(index);
  };
  // const quantity = getItemQuantity(product.id)

  const handleAddtoCart = () => {
    setCartStatus("Go to Cart")
    dispatch(increaseItemQuantity(product.id))
  }
  const handleGoToCart = () => {
    dispatch(openCart());
  }
  const handleBuyNow = () => {
    dispatch(increaseItemQuantity(product.id))

    navigate(`/home/products/${product.id}/checkout`, { state: { totalPrice: product.price } });
  };
  const handleEdit = (action: string) => {


    navigate(`/home/admin/${product.id}/${action}`);
  };

  const handleDelete = async () => {
    const db = await initDB();
    deleteProduct(db, product.id)
    dispatch(removeFromCart(product.id))
    navigate('/home/all products');
  }




  return (
    <div className='flex flex-col min-h-screen '>
      <div className='flex-1'>
        <Navbar />
        {/* <div className='flex flex-col my-20 items-center p-10'> */}
        <div className='sm:mt-48 2xl:mt-24'>
        <Breadcrumbs/>
        <div className="max-w-7xl w-full mx-auto my-24 shadow-md px-4">
          
          <div className="flex flex-wrap justify-around py-2.5" key={product.id}>
            <div className="max-w-lg min-w-[290px] overflow-hidden m-6.25">
              <img
                src={product.image[index]}
                alt={product.name}
                className="h-72 object-contain max-h-100"
              />
            </div>

            <div className="max-w-lg min-w-[290px] m-6.25">
              <div className="flex justify-between mb-3.75">
                <h2 className="uppercase tracking-wide">{product.name}</h2>
                <span className="text-crimson font-extrabold">${product.price}</span>
              </div>
              <p className="leading-6 my-3.75">{product.description}</p>

              <div className="w-20 h-25 flex cursor-pointer my-2.5">
                {product.image.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt=""
                    className={`w-22.5 h-16 object-cover border border-gray-300 mr-1.25 rounded-lg ${idx === index ? 'opacity-100 border-lightseagreen' : 'opacity-70'
                      }`}
                    onMouseEnter={() => handleTab(idx)}
                  />
                ))}
              </div>
              <div className='py-2 px-2 space-x-1 flex'>
                <div onClick={cartStatus === "Go to Cart" ? handleGoToCart : handleAddtoCart}>
                  <ButtonComponent value={cartStatus} bg="bg-black" cl="text-white" />
                </div>
                <div onClick={handleBuyNow}>
                  <ButtonComponent value="Buy Now" bg="bg-black" cl="text-white" />
                </div>

              </div>
              {user?.nickname === "admin" &&

                <div className=' flex items-end justify-end gap-2'>
                  <div onClick={() => handleEdit("edit")} className='hover:bg-slate-100 rounded-md p-2  hover:-translate-y-1 duration-300 shadow-sm hover:shadow-lg'>
                    <PencilIcon />
                  </div>
                  <div onClick={()=>setIsModalOpen(true)} className='hover:bg-slate-100 rounded-md p-2 hover:-translate-y-1 duration-300 shadow-sm hover:shadow-lg'>
                    <Trash2Icon />
                  </div>
                </div>
              }


            </div>
          </div>
        </div>

        <div className='flex justify-center' >

          <CarouselOrientation reviews={product.reviews} />

        </div>
        <div className="mx-24">
          <h1 className='text-zinc-500 mr-2 py-8 font-serif text-2xl ' >Related Products</h1>
          <ProductCarousel category={product.subcategory} />
        </div>
        </div>
      </div>
      {/* </div> */}
      <FooterComponent />
      
          <ConfirmModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
            message="Are you sure you want to delete this product?"
          />
        
    </div>

  );
};

export default ProductDetails;
