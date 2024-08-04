
import { FooterComponent } from '@/components/FooterComponent';
import Navbar from '@/components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { UserIcon } from '@heroicons/react/24/outline';
import { Sidebar } from 'flowbite-react'
import { ListOrderedIcon } from 'lucide-react';


const ProfilesPage = () => {

    const {user} = useAuth0()
    return (
        <div>
        <div className='flex-1'>
        <Navbar/>
        <div className="flex justify-center items-center h-screen ">
            <div className="min-w-[80%] min-h-[80%]   flex md:min-w-[100%]">
                <div>

                    <Sidebar aria-label="Default sidebar example" className="h-full">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item href="#" icon={UserIcon}>
                                    Profile
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={ListOrderedIcon}  labelColor="dark">
                                    Actions
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>
                <div className='bg-slate-200 max-h-max min-w-[90%] flex items-center justify-center'>
                    <div className='text-gray-500'>
                        <p className='text-xl '>{user?.name}</p>
                        <p className='tex'>{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>

        </div >
        <FooterComponent />
        </div>
    );
}

export default ProfilesPage
