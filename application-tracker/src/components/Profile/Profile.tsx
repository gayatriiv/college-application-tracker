import React, { useState } from 'react';
import { User, Save, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Profile() {
  const { profile, setProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [newInterest, setNewInterest] = useState('');
  const [newCollegeType, setNewCollegeType] = useState('');
  const [newScholarshipType, setNewScholarshipType] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addCollegeType = () => {
    if (newCollegeType.trim() && !formData.preferences.collegeTypes.includes(newCollegeType.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          collegeTypes: [...prev.preferences.collegeTypes, newCollegeType.trim()]
        }
      }));
      setNewCollegeType('');
    }
  };

  const removeCollegeType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        collegeTypes: prev.preferences.collegeTypes.filter(t => t !== type)
      }
    }));
  };

  const addScholarshipType = () => {
    if (newScholarshipType.trim() && !formData.preferences.scholarshipTypes.includes(newScholarshipType.trim())) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          scholarshipTypes: [...prev.preferences.scholarshipTypes, newScholarshipType.trim()]
        }
      }));
      setNewScholarshipType('');
    }
  };

  const removeScholarshipType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        scholarshipTypes: prev.preferences.scholarshipTypes.filter(t => t !== type)
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your profile and preferences for better AI suggestions</p>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., New York, NY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.gpa}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpa: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 3.75"
                  />
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add an interest..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
              
              <div className="space-y-6">
                {/* College Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred College Types
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {formData.preferences.collegeTypes.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {type}
                          <button
                            type="button"
                            onClick={() => removeCollegeType(type)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCollegeType}
                        onChange={(e) => setNewCollegeType(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Public, Private, Liberal Arts..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCollegeType())}
                      />
                      <button
                        type="button"
                        onClick={addCollegeType}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scholarship Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Scholarship Types
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {formData.preferences.scholarshipTypes.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {type}
                          <button
                            type="button"
                            onClick={() => removeScholarshipType(type)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newScholarshipType}
                        onChange={(e) => setNewScholarshipType(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Merit-based, Need-based, STEM..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addScholarshipType())}
                      />
                      <button
                        type="button"
                        onClick={addScholarshipType}
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-6">
            {/* Basic Information Display */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900">{profile.name || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{profile.email || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-900">{profile.location || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">GPA</p>
                  <p className="text-gray-900">{profile.gpa || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Interests Display */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
              {profile.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No interests specified</p>
              )}
            </div>

            {/* Preferences Display */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">College Types</p>
                  {profile.preferences.collegeTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.collegeTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No preferences specified</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Scholarship Types</p>
                  {profile.preferences.scholarshipTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.scholarshipTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No preferences specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}