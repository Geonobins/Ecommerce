
import { useNavigate } from 'react-router-dom';


const AddProductButton = () => {
  const navigate = useNavigate();

  const handleClick = (str: string) => {

    navigate(`/admin/${str}`)
  }
  return (
    <div
      className="w-60 p-2 min-h-96 mx-1 flex flex-col justify-between bg-white rounded-x1 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
      onClick={() => { handleClick("addproduct") }}
    >
      <div className='flex flex-col items-center justify-center'>
        <img src={"https://thumb.ac-illust.com/35/35df4f40a8e742121238c0fcd12cd384_t.jpeg"} className="max-h-40 w-full object-cover object-center rounded-xl" />
        <div className='p-2'>
          <p className="text-sm text-gray-300 mt-2 mb-2 line-clamp-2">Add a Product</p>
        </div>
      </div>
    </div>
  );
}

export default AddProductButton
