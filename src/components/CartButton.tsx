type CartButtonProps={
  src:string;
  quantity:number;
}
const CartButton = (props: CartButtonProps) => {
  return (
    <div>
      <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500 relative">
        <img src={props.src} alt="Cart" className="w-6" />
        {
          props.quantity > 0 &&
          <div className="rounded-full bg-red-700 flex items-center justify-center w-5 h-5 text-white text-xs absolute -translate-y-2/3 translate-x-5">
            {props.quantity}
          </div>
        }
      </button>
    </div>
  )
}

export default CartButton;
