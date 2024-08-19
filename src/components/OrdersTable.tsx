import React, { useEffect, useState } from "react";
import Table from "./ui/Table";
import { Package2Icon, TruckIcon } from "lucide-react";

interface Product {
  id: string;
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

    for (const userEmail in storedOrders) {
      const userOrders = storedOrders[userEmail];

      if (Array.isArray(userOrders)) {
        userOrders.forEach((order) => {
          const products = Array.isArray(order.products)
            ? order.products
                .map((product: Product) => `${product.id} (Qty: ${product.quantity})`)
                .join(", ")
            : "No Products";

          flattenedOrders.push({
            OrderId: order.orderId || "Unknown Order",
            UserEmail: userEmail,
            Products: products,
            Status: order.status || "Unknown Status",
          });
        });
      }
    }

    setOrdersData(flattenedOrders);
  }, []);

  // Function to toggle the order status
  const handleStatusToggle = (orderId: string) => {
    const updatedOrders = ordersData.map((order) => {
      if (order.OrderId === orderId) {
        return { ...order, Status: order.Status === "Placed" ? "Shipped" : "Placed" };
      }
      return order;
    });

    setOrdersData(updatedOrders);

    // Update localStorage
    const storedOrders = JSON.parse(localStorage.getItem("Orders") || "{}");

    for (const userEmail in storedOrders) {
      const userOrders = storedOrders[userEmail];
      userOrders.forEach((order: { orderId: string; status: string; }) => {
        if (order.orderId === orderId) {
          order.status = order.status === "Placed" ? "Shipped" : "Placed";
        }
      });
    }

    localStorage.setItem("Orders", JSON.stringify(storedOrders));
  };

  const tableStructure = [
    { name: "OrderId" },
    { name: "UserEmail" },
    { name: "Products" },
    { name: "Status" },
  ];

  return (
    <div className=" max-w-[100%] max-h-[80%] overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Orders Table</h2>
      <Table
        tableStructure={tableStructure}
        tableData={ordersData}
        renderCustomContent={(columnName, row) =>
          columnName === "Status" ? (
            <div className="flex items-center gap-4">
              <span>{row.Status}</span>
              {row.Status === "Placed" ? (
                <div className="relative group ml-auto">
                  <Package2Icon
                    className="text-green-500 cursor-pointer rounded-lg hover:-translate-y-1 duration-300 hover:shadow-md"
                    onClick={() => handleStatusToggle(row.OrderId)}
                  />
                  {/* Tooltip */}
                  <span className="absolute bottom-1 right-[10%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white text-black shadow-md px-2 py-1 rounded-md transition-opacity duration-500">
                    Ship
                  </span>
                </div>
              ) : (
                <div className="relative group ml-auto">
                  <TruckIcon
                    className="text-red-500 cursor-pointer rounded-lg hover:-translate-y-1 duration-300 hover:shadow-md"
                    onClick={() => handleStatusToggle(row.OrderId)}
                  />
                  {/* Tooltip */}
                  <span className="absolute bottom-1 right-[10%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white text-black shadow-md px-2 py-1 rounded-md transition-opacity duration-500">
                    Cancel
                  </span>
                </div>
              )}
            </div>
          ) : null
        }
      />
    </div>
  );
};

export default OrdersTable;
