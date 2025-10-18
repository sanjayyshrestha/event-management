'use client';

import React, { useState } from 'react';
import { Menu, X, Moon, User } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav({user}:{
  user:{
    name:string
    role:string
  }
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link href='/' 
              className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
            href={'/my-bookings'} 
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </Link>

            { 
              user?.role==='ADMIN' &&   <Link
            href={'/create-event'} 
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              onClick={() => setIsOpen(false)}
            >
              Create Event
            </Link>
            }
           
            
            {/* Mobile Divider */}
            <div className="border-t border-gray-200 my-3"></div>
            
            {/* Mobile User Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </div>
              
              {/* Mobile Dark Mode Toggle */}
              {/* <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                <Moon className="w-5 h-5 text-gray-700" />
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}