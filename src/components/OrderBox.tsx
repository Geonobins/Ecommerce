import CheckoutItem from "./CheckoutItem";
import ProgressBar from "./ui/ProgressBar";
import ProgressBarMobile from "./ui/ProgressBarMobile";

type ProductOrder = {
  id: number;
  quantity: number;
};

type OrderBoxProps = {
  orderId: number;
  products?: ProductOrder[];
  status: string;
};

const OrderBox = ({ orderId, products, status }: OrderBoxProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
      <h2 className="text-lg font-bold">Order ID: {orderId}</h2>
      <div className="pt-8 pb-2 md:w-[70%]">
        <div className="hidden md:block">
          <ProgressBar status={status} />
        </div>
        <div className="block md:hidden">
          <ProgressBarMobile status={status} />
        </div>
      </div>
      {products && products.map((product) => (
        <CheckoutItem key={product.id} id={product.id} quantity={product.quantity} />
      ))}
    </div>
  );
};

export default OrderBox;