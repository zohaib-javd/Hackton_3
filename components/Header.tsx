"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/app/(store)/store";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleCreatePasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log("Passkey created:", response);
    } catch (error) {
      console.error("Error creating passkey:", error);
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 bg-white shadow-md">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="CAStore">
          <Image src="/logo.jpg" alt="CAStore Logo" width={150} height={30} className="h-12 w-auto sm:h-16" />
        </Link>

        {/* Search Bar */}
        <form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full max-w-4xl bg-gray-100 text-gray-800 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* User & Cart Section */}
        <div className="flex items-center space-x-4">
          {/* Basket */}
          <Link href="/basket" className="relative flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <TrolleyIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
            <span>My Basket</span>
          </Link>

          {/* User Authentication & Orders */}
          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders" className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {user?.passkeys?.length === 0 && (
              <button
                onClick={handleCreatePasskey}
                className="bg-white border border-blue-300 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded"
              >
                Create Passkey Now
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;