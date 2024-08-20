import Breadcrumbs from '@/components/Breadcrumbs'
import { FooterComponent } from '@/components/FooterComponent'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useDispatch,useSelector } from 'react-redux';
import { setLanguage } from '../features/lang/languageSlice';
import { RootState } from '../app/store';
const Settings = () => {
    const dispatch = useDispatch();

    const language = useSelector((state: RootState) => state.language.language);

    const handleLanguageChange = (event: { target: { value: any; }; }) => {
      dispatch(setLanguage(event.target.value));
    };
    return (
        <div>
            <div>
                <div className='flex-1 '>
                    <Navbar />
                    <div className='mt-24 ml-4 flex max-h-full '>
                        <Sidebar />
                        <div className='flex flex-col max-w-[60%] md:min-w-[90%]  h-full items-center justify-center text-gray ' >
                            <Breadcrumbs />
                            <div className='  h-[800px]  max-w-[80%] flex flex-col items-center my-16 min-w-[80%] '>
                                <select onChange={handleLanguageChange} value={language}>
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    {/* Add more languages as needed */}
                                </select>
                            </div>
                        </div>
                    </div>



                </div >
                <FooterComponent />

            </div>
        </div>
    )
}

export default Settings
