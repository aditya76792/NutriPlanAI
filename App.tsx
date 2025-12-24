import React, { useState } from 'react';
import { generateMealPlan } from './services/geminiService';
import { UserPreferences, MealPlanResponse } from './types';
import { InputForm } from './components/InputForm';
import { PlanDisplay } from './components/PlanDisplay';

const App: React.FC = () => {
  const [plan, setPlan] = useState<MealPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateMealPlan(prefs);
      setPlan(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
              NutriPlan AI
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
             <span>Powered by Gemini</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
             <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             {error}
          </div>
        )}

        {!plan ? (
           <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-full max-w-2xl animate-fade-in">
                 <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                      Eat Better, <span className="text-green-600">Stress Less</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg mx-auto">
                      Generate a personalized weekly meal plan and organized grocery list in seconds using AI.
                    </p>
                 </div>
                 <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
              </div>
           </div>
        ) : (
          <PlanDisplay plan={plan} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NutriPlan AI. Not medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;