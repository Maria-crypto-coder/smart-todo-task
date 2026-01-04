'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { CheckSquare } from 'lucide-react';

export default function Header() {
  const { user, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart TODO
            </h1>
            {isLoaded && user && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Hola, {user.firstName || user.username}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoaded && user && (
            <div className="flex items-center gap-3">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
