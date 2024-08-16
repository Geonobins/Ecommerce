import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import Sidebar from '../components/Sidebar';
import ActionsTable from '@/components/ActionsTable';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FilterIcon } from 'lucide-react';
import { useState } from 'react';
import { TableFilter } from '@/components/TableFilter';

const Actions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(["id", "name", "category", "price", "availability"]);

    const handleCloseFilter = () => {
        setIsOpen(false);
    };
    const handleOpenFilter = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <div className='flex-1 '>
                <Navbar />
                <div className='mt-24 ml-4 flex max-h-full '>
                    <Sidebar />
                    <div className='flex flex-col max-w-[60%] md:min-w-[90%] h-full items-center justify-center text-gray ' >
                        <Breadcrumbs/>
                        <div className='h-[800px] max-w-[80%] flex flex-col items-center my-16 min-w-[80%] '>
                            <ActionsTable visibleColumns={visibleColumns} />
                        </div>
                    </div>
                    <div className='flex mt-12'>
                        <FilterIcon className='text-slate-400 ' onClick={handleOpenFilter}/>
                    </div>
                </div>
            </div>
            <FooterComponent />
            <TableFilter 
                isOpen={isOpen} 
                handleCloseFilter={handleCloseFilter}
                visibleColumns={visibleColumns} 
                setVisibleColumns={setVisibleColumns} 
            />
        </div>
    );
};

export default Actions;
