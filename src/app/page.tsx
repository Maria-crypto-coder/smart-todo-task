import { SignedIn, SignedOut } from '@clerk/nextjs';
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Organiza tus tareas de manera inteligente
                </p>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
                <TodoList />
              </div>
            </div>
          </main>

          <footer className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-500">
            <p>Hecho con Next.js + TypeScript + Tailwind CSS + Clerk</p>
          </footer>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Smart TODO App
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
                Gestiona tus tareas de forma inteligente y organizada
              </p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Organiza tus tareas</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Crea, edita y completa tareas fácilmente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Filtra y busca</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Encuentra lo que necesitas rápidamente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Seguro y privado</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Tus datos están protegidos</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                Inicia sesión o regístrate para comenzar
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
