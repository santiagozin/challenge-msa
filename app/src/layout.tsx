import React, { ReactNode } from 'react';
import Navbar from '@/components/custom/navbar';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex w-full'>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
