import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Textarea } from "flowbite-react";
import { addProducts, getAllProducts, initDB } from "@/utils/db";
import generateNumericUUIDNumber from "@/utils/uuid";
import DropBox from "@/components/DropBox";
import { useNavigate, useParams } from "react-router-dom";
import { FooterComponent } from "@/components/FooterComponent";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string[];
    category: string;
    subcategory: string;
    reviews: string[];
    availability: number;
}

const AddProductPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [subcategory, setSubcategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [reviews, setReviews] = useState<string[]>([]);

    const navigate = useNavigate();
    const { id, action } = useParams<{ id: string; action: string }>();

    useEffect(() => {
        if (id) {
            fetchProductToEdit();
        }
    }, [id]);

    const fetchProductToEdit = async () => {
        const db = await initDB();
        const productsFromDB = await getAllProducts(db);
        const productToEdit = productsFromDB.find((product: Product) => product.id === Number(id));

        if (productToEdit) {
            setTitle(productToEdit.name);
            setDescription(productToEdit.description);
            setCategory(productToEdit.category);
            setPrice(productToEdit.price);
            setSubcategory(productToEdit.subcategory);
            setReviews(productToEdit.reviews);
            setExistingImages(productToEdit.image);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const removeImage = (name: string, type: "file" | "url") => {
        if (type === "file") {
            setImages((prevFiles) => prevFiles.filter((file) => file.name !== name));
        } else {
            setExistingImages((prevUrls) => prevUrls.filter((url) => url !== name));
        }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage("");
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const fileType = selectedFiles[i]?.type;
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

                if (validImageTypes.includes(fileType)) {
                    setImages((prevFiles) => [...prevFiles, selectedFiles[i]]);
                } else {
                    setMessage("Only images accepted");
                }
            }
        }
    };

    const handleFormSubmit = async () => {
        if (!title || !description || !category || price === undefined || (images.length === 0 && existingImages.length === 0)) {
            alert("All fields are required");
            return;
        }

        const imageBase64Array = await Promise.all(images.map(fileToBase64));
        const mergedImages = [...existingImages, ...imageBase64Array];

        const newProduct: Product = {
            id: Number(id) || generateNumericUUIDNumber(),
            name: title,
            description: description,
            price: price,
            thumbnail: mergedImages[0] || "",
            image: mergedImages,
            category: category,
            subcategory: subcategory,
            availability: 100,
            reviews: reviews
        };

        const db = await initDB();
        await addProducts(db, [newProduct]);
        navigate("/home/all products");
    };

    return (
        <div>
            <div className="flex-1 flex-col ">
            <Navbar />
            <div className="flex items-center justify-center h-full my-28 md:mx-2">
                <div className="min-w-[90%] border rounded-2xl p-6">
                    {action === "addproduct" && <center><p className="text-4xl">Add a Product</p></center>}
                    {action === "edit" && <center><p className="text-4xl">Edit Product</p></center>}
                    <div className="max-w-md mx-auto">
                        <div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input
                                    type="text"
                                    id="title"
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
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select
                                    className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Living Room" className="dark:bg-dark-2">Living Room</option>
                                    <option value="Dining" className="dark:bg-dark-2">Dining</option>
                                    <option value="Bedroom" className="dark:bg-dark-2">Bedroom</option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"></span>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input
                                    type="number"
                                    id="price"
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="sub-category"
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                />
                            </div>
                            <div>
                                <DropBox
                                    removeImage={removeImage}
                                    handleFile={handleFile}
                                    message={message}
                                    images={images}
                                    existingImages={existingImages}
                                />
                            </div>
                            <div className="w-full flex justify-center">
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-7"
                                onClick={handleFormSubmit}
                            >
                                {action === "addproduct" ? "Add Product" : "Save Changes"}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default AddProductPage;
