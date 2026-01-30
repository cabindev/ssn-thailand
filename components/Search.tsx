'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import {
  getCreativeActivities,
  getTraditions,
  getEthnicGroups,
  getPublicPolicies,
} from '@/lib/api';

// Custom debounce function
function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  return debounced;
}

// Types
interface AutocompleteResult {
  id: string | number;
  name: string;
  type: 'tradition' | 'publicPolicy' | 'ethnicGroup' | 'creativeActivity';
}

// Type labels for display
const TYPE_LABELS: Record<string, string> = {
  tradition: 'งานบุญประเพณี',
  publicPolicy: 'นโยบายสาธารณะ',
  ethnicGroup: 'กลุ่มชาติพันธุ์',
  creativeActivity: 'กิจกรรมสร้างสรรค์',
};

// Routes for navigation
const ROUTES: Record<string, string> = {
  tradition: '/traditions',
  publicPolicy: '/public-policies',
  ethnicGroup: '/ethnic-groups',
  creativeActivity: '/creative-activities',
};

// Type colors for visual distinction
const TYPE_COLORS: Record<string, string> = {
  tradition: 'bg-orange-100 text-orange-700',
  publicPolicy: 'bg-blue-100 text-blue-700',
  ethnicGroup: 'bg-green-100 text-green-700',
  creativeActivity: 'bg-purple-100 text-purple-700',
};

export default function Search() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Calculate relevance score for sorting
  const calculateRelevance = (name: string, query: string): number => {
    const nameLower = name.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact match = highest score
    if (nameLower === queryLower) return 100;

    // Starts with query = high score
    if (nameLower.startsWith(queryLower)) return 80;

    // Contains query as a word = good score
    if (nameLower.includes(` ${queryLower}`) || nameLower.includes(`${queryLower} `)) return 70;

    // Contains query anywhere = moderate score
    if (nameLower.includes(queryLower)) return 60;

    // Check each word in query
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
    let wordMatchScore = 0;
    for (const word of queryWords) {
      if (nameLower.includes(word)) {
        wordMatchScore += 20;
      }
    }
    if (wordMatchScore > 0) return wordMatchScore;

    return 0;
  };

  // Fetch autocomplete results
  const fetchAutocomplete = async (searchQuery: string) => {
    if (searchQuery.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // Parallel search across all 4 data types with higher limit
      const [activities, traditions, ethnicGroups, policies] = await Promise.all([
        getCreativeActivities({ search: searchQuery, limit: 10 }),
        getTraditions({ search: searchQuery, limit: 10 }),
        getEthnicGroups({ search: searchQuery, limit: 10 }),
        getPublicPolicies({ search: searchQuery, limit: 10 }),
      ]);

      // Combine results with type labels and relevance scores
      const results: (AutocompleteResult & { relevance: number })[] = [
        ...(activities.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          type: 'creativeActivity' as const,
          relevance: calculateRelevance(item.name, searchQuery),
        })),
        ...(traditions.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          type: 'tradition' as const,
          relevance: calculateRelevance(item.name, searchQuery),
        })),
        ...(ethnicGroups.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          type: 'ethnicGroup' as const,
          relevance: calculateRelevance(item.name, searchQuery),
        })),
        ...(policies.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          type: 'publicPolicy' as const,
          relevance: calculateRelevance(item.name, searchQuery),
        })),
      ];

      // Sort by relevance score (descending), then alphabetically
      const sortedResults = results
        .sort((a, b) => {
          if (b.relevance !== a.relevance) {
            return b.relevance - a.relevance;
          }
          return a.name.localeCompare(b.name, 'th');
        })
        .map(({ relevance, ...rest }) => rest); // Remove relevance from final result

      setSuggestions(sortedResults.slice(0, 10));
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search (300ms delay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      fetchAutocomplete(searchQuery);
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    debouncedSearch(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: AutocompleteResult) => {
    router.push(`${ROUTES[suggestion.type]}/${suggestion.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="ค้นหาข้อมูล..."
          className="w-full pl-12 pr-12 py-3 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white shadow-xl rounded-2xl mt-2 z-50 border border-gray-100 max-h-[280px] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.type}-${suggestion.id}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                index === selectedIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
              } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-2xl' : ''}`}
            >
              <span className="text-gray-800 truncate flex-1">
                {suggestion.name}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ml-2 whitespace-nowrap ${TYPE_COLORS[suggestion.type]}`}
              >
                {TYPE_LABELS[suggestion.type]}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* No results message */}
      {showSuggestions && query && !isLoading && suggestions.length === 0 && (
        <div className="absolute w-full bg-white shadow-xl rounded-2xl mt-2 z-50 p-4 text-center text-gray-500 border border-gray-100">
          ไม่พบผลลัพธ์สำหรับ &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
