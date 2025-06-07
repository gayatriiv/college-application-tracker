import React, { useState } from 'react';
import { Lightbulb, Filter, TrendingUp, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Suggestion } from '../../types';

export function Suggestions() {
  const { suggestions, profile, setApplications } = useApp();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'deadline'>('match');

  const filteredSuggestions = suggestions
    .filter(suggestion => typeFilter === 'all' || suggestion.type === typeFilter)
    .sort((a, b) => {
      if (sortBy === 'match') {
        return b.match - a.match;
      } else {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
    });

  const addToApplications = (suggestion: Suggestion) => {
    const newApplication = {
      id: crypto.randomUUID(),
      name: suggestion.name,
      type: suggestion.type,
      deadline: suggestion.deadline,
      status: 'not-started' as const,
      requirements: [],
      documents: [],
      notes: `Added from AI suggestions. Match score: ${suggestion.match}%\n\n${suggestion.description}`,
      checklist: [],
      priority: suggestion.match >= 90 ? 'high' as const : suggestion.match >= 70 ? 'medium' as const : 'low' as const,
      category: suggestion.category
    };

    setApplications(prev => [...prev, newApplication]);
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-green-700 bg-green-100';
    if (match >= 70) return 'text-blue-700 bg-blue-100';
    if (match >= 50) return 'text-orange-700 bg-orange-100';
    return 'text-gray-700 bg-gray-100';
  };

  const getDaysUntil = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Suggestions</h1>
        <p className="text-gray-600">Discover colleges and scholarships tailored to your profile</p>
      </div>

      {/* Profile Status */}
      {(!profile.name || !profile.location || profile.interests.length === 0) && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-orange-800 mb-1">
                Complete your profile for better suggestions
              </h3>
              <p className="text-sm text-orange-700">
                Add your location, interests, and GPA in your profile to get more personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sorting */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="college">Colleges</option>
                <option value="scholarship">Scholarships</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'match' | 'deadline')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="match">Sort by Match</option>
                <option value="deadline">Sort by Deadline</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredSuggestions.length} suggestions found
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      {filteredSuggestions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions available</h3>
          <p className="text-gray-500">
            Complete your profile to get personalized recommendations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuggestions.map((suggestion) => {
            const daysUntil = getDaysUntil(suggestion.deadline);
            const isUrgent = daysUntil <= 30;
            
            return (
              <div key={suggestion.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{suggestion.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        suggestion.type === 'college' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {suggestion.type}
                      </span>
                    </div>
                    
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(suggestion.match)}`}>
                      <TrendingUp className="w-3 h-3" />
                      {suggestion.match}% match
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {suggestion.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(suggestion.deadline).toLocaleDateString()}</span>
                    {isUrgent && <span className="text-orange-600 font-medium">(Soon!)</span>}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{suggestion.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToApplications(suggestion)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Applications
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}