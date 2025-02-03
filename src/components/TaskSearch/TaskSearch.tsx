import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

type TaskSearchProps = {
    onSearch: (term: string) => void;
};

export function TaskSearch({ onSearch }: TaskSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="relative flex items-center flex-1">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
                type="text"
                placeholder="Rechercher des tâches..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5
                         bg-transparent
                         text-gray-900 dark:text-gray-100
                         border-0 border-b border-gray-100 dark:border-gray-700
                         focus:border-blue-500 dark:focus:border-blue-400
                         focus:ring-0 focus:outline-none transition-all duration-200"
            />
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
