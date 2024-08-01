import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FileInput, Label, Textarea } from "flowbite-react";
import { v4 as uuidv4 } from 'uuid'; // Importing UUID for unique ID generation

// Define the product interface
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string[];
    category: string;
    subcategory: string;
}

const AddProductPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [subcategory, setSubcategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [submittedProduct, setSubmittedProduct] = useState<Product | null>(null);

    // Function to convert file to Base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !category || price === undefined || images.length === 0) {
            alert("All fields are required");
            return;
        }

        // Convert files to Base64
        const imageBase64Array = await Promise.all(images.map(file => fileToBase64(file)));

        const product: Product = {
            id: uuidv4(), // Using UUID for unique ID
            name: title,
            description: description,
            price: price,
            thumbnail: imageBase64Array[0] || "", // Use the first image as the thumbnail
            image: imageBase64Array,
            category: category,
            subcategory: subcategory,
        };

        // Now you can store the product in IndexedDB, or wherever you need
        setSubmittedProduct(product);
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
                                    required
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
                                    required
                                ></Textarea>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="category" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Category</label>
                                <select
                                    className='relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value='' disabled>Select Category</option>
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
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    required
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
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setImages([...e.target.files]);
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                    {submittedProduct && (
                        <div className="mt-10">
                            <h2 className="text-2xl mb-4">Submitted Product</h2>
                            <p><strong>Name:</strong> {submittedProduct.name}</p>
                            <p><strong>Description:</strong> {submittedProduct.description}</p>
                            <p><strong>Category:</strong> {submittedProduct.category}</p>
                            <p><strong>Sub-category:</strong> {submittedProduct.subcategory}</p>
                            <p><strong>Price:</strong> ${submittedProduct.price}</p>
                            <p><strong>Images:</strong></p>
                            <div className="flex space-x-4">
                                {submittedProduct.image.map((img, index) => (
                                    <img key={index} src={img} alt={`Product ${index}`} className="w-32 h-32 object-cover" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AddProductPage;
