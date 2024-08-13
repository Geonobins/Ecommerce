import { getAllProducts, initDB } from "@/utils/db";
import { useEffect, useState } from "react";
import Table from "./ui/Table";

type Product = {
    id: string;
    name: string;
    category: string[];
    price: string;
    availability: number;
    
  };
const DashboardTable = () => {

    const [products, setProducts] = useState<Product[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const db = await initDB();
      const stored = await getAllProducts(db);
      setProducts(stored);
    };

    fetchData();
  }, []);
    const tableStructure = [
        { name: "id" },
        { name: "name" },
        { name: "price" },
        { name: "availability" },
      ];
      
      const tableData = products.map(product => ({
        id: product.id,
        name: product.name,
        
        price: "$"+product.price,
        availability: product.availability
      })).filter((product)=> product.availability < 100);

    
  return (
    <div className="flex items-center h-[400px] overflow-hidden max-w-[80%]">
      <Table tableStructure={tableStructure} tableData={tableData} emphasis="availability" maxvalue={100}/>

      
    </div>
  )
}

export default DashboardTable
