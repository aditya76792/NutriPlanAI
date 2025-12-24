import React, { useState } from 'react';
import { DietType, UserPreferences } from '../types';

interface InputFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    dietType: DietType.Omnivore,
    allergies: '',
    ingredients: '',
    servings: 1,
    caloriesPerDay: 2000,
    goal: 'Eat Healthy',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'servings' || name === 'caloriesPerDay' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Plan Your Week</h2>
        <p className="text-gray-500">Tell us what you like, we'll handle the rest.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diet Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Diet Preference</label>
            <div className="relative">
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none transition-all"
              >
                {Object.values(DietType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Goal */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Primary Goal</label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. Lose weight, Quick meals"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Available Ingredients (Optional)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Chicken breast, rice, spinach, half a carton of eggs..."
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all h-24 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">We'll try to use these up first!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Allergies */}
          <div className="flex flex-col md:col-span-1">
             <label className="text-sm font-semibold text-gray-700 mb-2">Allergies</label>
             <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Peanuts, Shellfish..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Servings */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">People</label>
            <input
              type="number"
              min="1"
              max="20"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Calories */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Target Calories</label>
            <input
              type="number"
              step="100"
              name="caloriesPerDay"
              value={formData.caloriesPerDay}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-200 
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed scale-95' 
              : 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/30 active:scale-[0.98]'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Chef's Plan...
            </span>
          ) : (
            'Generate Meal Plan'
          )}
        </button>
      </form>
    </div>
  );
};