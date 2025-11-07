'use client';

import { Navbar } from '@/components/other/navbar';
import { Map } from '@/components/other/map';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <Navbar />
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <h1 className="text-3xl font-bold mb-5 text-gray-800">Live Incident Mapping</h1>        
        <div className="flex gap-6">
          <Map/>
        </div>
      </main>
    </div>
  );
}