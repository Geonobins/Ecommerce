import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
// import axios from 'axios';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { FooterComponent } from '@/components/FooterComponent';
import { useAuth0 } from '@auth0/auth0-react';
import AddProductButton from '@/components/AddProductButton';
import { getAllProducts, initDB } from '@/utils/db';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  image: string[];
  availability: number;
  reviews: { id: number; user: string; rating: number; review: string; date: string }[];
  category: string[];
  subcategory: string;
}

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order

  const { navStatus } = useParams<{ navStatus: string | undefined | any }>();

  const { user } = useAuth0();

  // useEffect(() => {
  //   axios.get('https://jsondummy.vercel.app/api/products?type=furniture')
  //     .then((response) => {
  //       setProducts(response.data.products);
  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error);
  //     });
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const filteredProducts = sortedProducts.filter(product =>
    (navStatus === "all products" || product.category.includes(navStatus)) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className='flex flex-col min-h-screen '>
      <div className='flex-1'>
        <Navbar setSearchQuery={setSearchQuery} />

        <div className="sort-dropdown px-11">
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        <div className="flex flex-row flex-wrap gap-3 px-10 items-center justify-center">
          {user?.nickname === "admin" && <AddProductButton />}
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.thumbnail}
            />
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default ProductsPage;
