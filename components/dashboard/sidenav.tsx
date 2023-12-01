import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from './navlinks';

export default function SideNav() {
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2 bg-red-200'>
            <div className='flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
                <NavLinks />
            </div>
        </div>
    )
}