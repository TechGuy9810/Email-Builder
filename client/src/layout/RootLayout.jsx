import React from 'react'
import { ClerkProvider} from '@clerk/clerk-react';
import { Link, Outlet} from 'react-router-dom'
import {UserButton } from '@clerk/clerk-react'
import Footer from '../components/Footer';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <div>
  <header className="w-full h-[7vh] text-white bg-gradient-to-br from-gray-950 via-gray-700 to-gray-900 backdrop-blur-lg border border-gray-900 shadow-lg shadow-black/30 px-6 flex flex-row items-center justify-between sticky top-0 left-0 z-50">
    <div className="w-[40%] flex flex-row items-center justify-start h-full bg-cover">
    </div>
    <div className="w-[20%] hidden lg:flex flex-row items-center justify-around h-full">
    <Link to="/" className="text-gray-300 hover:text-white text-lg font-medium transition-colors no-underline">
        Email Builder
      </Link>
    </div>
    <div className="w-[40%] hidden lg:flex flex-row items-center justify-end h-full gap-4">
      <UserButton />
    </div>
    <div className="flex lg:hidden flex-row items-center justify-end h-full">
      <UserButton />
      {/* Uncomment below if you need an icon */}
      {/* <UserCircleIcon className="w-8 h-8 cursor-pointer" onClick={() => setShowUserDetail(!showUserDetail)} /> */}
    </div>
  </header>
  <main>
    {/* The Outlet renders the matched child route component */}
    <Outlet />
  </main>
  <Footer/>
</div>

</ClerkProvider>
  )
}
export default RootLayout;
