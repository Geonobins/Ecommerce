import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FileInput, Label, Textarea } from "flowbite-react";

const AddProductPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [images, setImages] = useState([]);

    let product;
    const handleFormSubmit = (e:any) => {
        e.preventDefault();
         product = {
            id: Math.floor(Math.random() * 1000), // or use any other unique identifier
            name: title,
            description: description,
            price: parseFloat(price),
            thumbnail: images[0] ? images[0].name : "", // Assuming 'name' contains the filename
            image: images.map(file => file.name), // Array of filenames
            category: category,
            subcategory: subcategory,
        };
        console.log(product);
        // Handle the object as needed, e.g., send it to a server
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-full">
                <div className="min-w-[100%]">
                    <center><p className="text-4xl"> Add a Product</p></center>
                    <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
                        <div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <Textarea
                                    id="message"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="description....."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Textarea>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="category" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Category</label>
                                <select
                                    className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value='Living Room' className='dark:bg-dark-2'>Living Room</option>
                                    <option value='Dining' className='dark:bg-dark-2'>Dining</option>
                                    <option value='Bedroom' className='dark:bg-dark-2'>Bedroom</option>
                                </select>
                                <span className='absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color'></span>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub-category</label>
                                <input
                                    type="text"
                                    id="subcategory"
                                    aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="sub-category"
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                />
                            </div>
                            <div id="fileUpload" className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="images" value="Images" />
                                </div>
                                <FileInput
                                    id="images"
                                    helperText="Upload pictures of the product"
                                    multiple
                                    onChange={(e) => setImages([...e.target.files])}
                                />
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                    {(product?.image)?
                    <img src={product.thumbnail} alt={product.thumbnail}/>:<>{product?.thumbnail}</>
                    }
                </div>
            </div>
        </>
    );
}

export default AddProductPage;
