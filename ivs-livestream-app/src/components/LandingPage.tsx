import React from 'react';
import '../LandingPage.css'; // Custom styles for complex parts

const LandingPage: React.FC = () => {
    const toggleTheme = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <main className="flex h-screen justify-center items-stretch bg-white dark:bg-black">
            <div className="relative flex flex-col justify-between w-full">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="jumbo absolute -inset-10 opacity-50"></div>
                </div>
                <h1 className="relative flex items-center text-5xl font-bold text-gray-800 dark:text-white">
                    charm
                    <span className="ml-1 bg-current p-2 rounded-xl text-[0.7em] leading-none">
                        <span className="text-white dark:text-black">Live</span>
                    </span>
                </h1>
                <div className="mt-4">
                    <button onClick={toggleTheme} className="px-3 py-1 border border-stone-200 text-stone-800 dark:text-white bg-white/40 dark:bg-black/40 rounded-full shadow-sm text-sm backdrop-blur-lg hover:border-stone-300 dark:border-stone-500 dark:hover:border-stone-400 transition-colors">
                        Toggle Theme
                    </button>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;
