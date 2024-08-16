import { useEffect, useState } from "react";
import Table from "./ui/Table";
import { getAllProducts, initDB } from "@/utils/db";
import { useNavigate } from "react-router-dom";

type Product = {
    id: string;
    name: string;
    category: string[];
    price: string;
    availability: number;
};

const ActionsTable = ({ visibleColumns }: { visibleColumns: string[] }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

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
        { name: "category" },
        { name: "price" },
        { name: "availability" },
    ];

    const tableData = products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category.join(", "),
        price: "$" + product.price,
        availability: product.availability
    }));

    // Filter the table structure based on visible columns
    const filteredTableStructure = tableStructure.filter(column => visibleColumns.includes(column.name));

    const handleRowClick = (id: number) => {
        navigate(`/home/products/${id}`);
    };

    return (
        <div className="max-w-[100%] max-h-[80%] overflow-hidden">
            <Table 
                tableStructure={filteredTableStructure} 
                tableData={tableData} 
                isHover={true} 
                handleRowClick={handleRowClick} 
                emphasis="availability" 
                maxvalue={100} 
            />
        </div>
    );
};

export default ActionsTable;
