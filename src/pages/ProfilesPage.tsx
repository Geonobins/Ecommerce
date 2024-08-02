import { UserIcon } from '@heroicons/react/24/outline';
import { Sidebar } from 'flowbite-react'
import { ListOrderedIcon } from 'lucide-react';


const ProfilesPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="min-w-[80%] min-h-[80%] border border-gray-300 flex">
                <div>

                    <Sidebar aria-label="Default sidebar example" className="h-full">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item href="#" icon={UserIcon}>
                                    Profile
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={ListOrderedIcon} label="Pro" labelColor="dark">
                                    Orders
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>
                <div className='bg-red-700 max-h-max min-w-[90%]'>
                    blah
                </div>
            </div>
        </div>
    );
}

export default ProfilesPage
