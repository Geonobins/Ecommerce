import { Trash2Icon } from "lucide-react";
import React from "react";

interface DropBoxProps {
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (name: string, type: "file" | "url") => void;
    message: string;
    images: File[];
    existingImages: string[];
}

const DropBox: React.FC<DropBoxProps> = ({ handleFile, removeImage, message, images, existingImages }) => {
    return (
        <div className="flex justify-center h-96 items-center px-3">
            <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
                <div className="m-4">
                    <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd" />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Select a photo</p>
                            </div>
                            <input type="file" onChange={handleFile} className="opacity-0" multiple name="files[]" />
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {existingImages.map((url, key) => (
                            <div key={key} className="overflow-hidden relative">
                                <button onClick={() => removeImage(url, "url")} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">
                                    <Trash2Icon />
                                </button>
                                <img className="h-20 w-20 rounded-md" src={url} alt={`existing-${key}`} />
                            </div>
                        ))}
                        {images.map((file, key) => (
                            <div key={key} className="overflow-hidden relative">
                                <button onClick={() => removeImage(file.name, "file")} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">
                                    <Trash2Icon />
                                </button>
                                <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} alt={file.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropBox;
