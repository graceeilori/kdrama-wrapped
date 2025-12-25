'use client';

import DeviceGuard from '@/components/DeviceGuard';

export default function CreatePage() {
    return (
        <DeviceGuard>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                            📝
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Let's Get Started</h1>
                            <p className="text-sm text-gray-500">Input your 2025 watch history</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200 text-gray-400">
                            <p>Form Inputs Coming Soon...</p>
                        </div>

                        <button className="w-full py-3 bg-black text-white rounded-xl font-medium opacity-50 cursor-not-allowed">
                            Generate Wrapped
                        </button>
                    </div>
                </div>
            </div>
        </DeviceGuard>
    );
}
