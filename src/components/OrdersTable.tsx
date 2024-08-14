import React, { useEffect, useState } from "react";
import Table from "./ui/Table";

interface Product {
  id: string; // Assuming product has an 'id' property
  quantity: number;
}

interface Order {
  OrderId: string;
  UserEmail: string;
  Products: string;
  Status: string;
}

const OrdersTable: React.FC = () => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("Orders") || "{}");
    const flattenedOrders: Order[] = [];
    console.log("Stored Orders:", storedOrders);

    // Flatten the orders structure
    for (const userEmail in storedOrders) {
      const userOrders = storedOrders[userEmail];

      if (Array.isArray(userOrders)) { // Check if userOrders is an array
        userOrders.forEach((order: any) => {
          // Ensure order.products exists and is an array
          const products = Array.isArray(order.products)
            ? order.products
                .map((product: Product) => {
                  // Check if product and its id exist
                  return product.id
                    ? `${product.id} (Qty: ${product.quantity})`
                    : "Unknown Product"; // Fallback if product id is missing
                })
                .join(", ")
            : "No Products"; // Fallback if products is not an array
          console.log("orderId,", order.orderId)
          flattenedOrders.push({
            OrderId: order.orderId || "Unknown Order", // Ensure orderId exists
            UserEmail: userEmail,
            Products: products,
            Status: order.status || "Unknown Status", // Ensure status exists
          });
        });
      }
    }

    setOrdersData(flattenedOrders);
  }, []);

  const tableStructure = [
    { name: "OrderId" },
    { name: "UserEmail" },
    { name: "Products" },
    { name: "Status" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders Table</h2>
      <Table 
        tableStructure={tableStructure} 
        tableData={ordersData} 
        isHover={true} 
      />
    </div>
  );
};

export default OrdersTable;
