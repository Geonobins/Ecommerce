import CheckoutItem from "./CheckoutItem";

type ProductOrder = {
  id: number;
  quantity: number;
};

type OrderBoxProps = {
  orderId: number;
  products?: ProductOrder[]; // Add products prop
  status?: string;
};

const OrderBox = ({ orderId, products,status }: OrderBoxProps) => {
  
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
      <h2 className="text-lg font-bold">Order ID: {orderId}</h2>
      <p className="text-green-700">{status==="Placed" && "Order Placed"}</p>
      {products && products.map((product) => (
        <CheckoutItem key={product.id} id={product.id} quantity={product.quantity} />
      ))}
    </div>
  );
};

export default OrderBox;
