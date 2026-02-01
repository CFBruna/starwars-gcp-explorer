interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-6 py-4 text-lg rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
            />
        </div>
    );
}
