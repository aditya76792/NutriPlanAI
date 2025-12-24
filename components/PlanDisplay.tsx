import React, { useState } from 'react';
import { MealPlanResponse, DayPlan, GroceryCategory, Meal } from '../types';

interface PlanDisplayProps {
  plan: MealPlanResponse;
  onReset: () => void;
}

const MealCard: React.FC<{ meal: Meal; type: string; color: string }> = ({ meal, type, color }) => (
  <div className={`p-4 rounded-xl bg-white border-l-4 ${color} shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-start mb-1">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{type}</span>
      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{meal.calories} kcal</span>
    </div>
    <h4 className="font-bold text-gray-800 mb-1 leading-tight">{meal.name}</h4>
    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{meal.description}</p>
    <div className="flex items-center text-xs text-gray-500">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {meal.prepTime}
    </div>
  </div>
);

const DayColumn: React.FC<{ day: DayPlan }> = ({ day }) => (
  <div className="min-w-[280px] w-full md:w-[300px] flex flex-col gap-3">
    <div className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm py-2 border-b border-gray-200 mb-2">
      <h3 className="text-xl font-bold text-gray-800">{day.dayName}</h3>
    </div>
    <MealCard meal={day.breakfast} type="Breakfast" color="border-orange-400" />
    <MealCard meal={day.lunch} type="Lunch" color="border-green-400" />
    <MealCard meal={day.dinner} type="Dinner" color="border-blue-400" />
    <MealCard meal={day.snack} type="Snack" color="border-purple-400" />
  </div>
);

const GroceryList: React.FC<{ list: GroceryCategory[] }> = ({ list }) => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleItem = (item: string) => {
        const newSet = new Set(checkedItems);
        if (newSet.has(item)) {
            newSet.delete(item);
        } else {
            newSet.add(item);
        }
        setCheckedItems(newSet);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-fit sticky top-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                Grocery List
            </h3>
            <div className="space-y-6">
                {list.map((category, idx) => (
                    <div key={idx}>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{category.categoryName}</h4>
                        <ul className="space-y-2">
                            {category.items.map((item, itemIdx) => {
                                const isChecked = checkedItems.has(item);
                                return (
                                    <li 
                                        key={itemIdx} 
                                        onClick={() => toggleItem(item)}
                                        className={`flex items-start gap-3 cursor-pointer group select-none transition-all ${isChecked ? 'opacity-50' : 'opacity-100'}`}
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 group-hover:border-green-500'}`}>
                                            {isChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                        </div>
                                        <span className={`text-gray-700 ${isChecked ? 'line-through' : ''}`}>{item}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                 <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Print List
                 </button>
            </div>
        </div>
    );
};

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'groceries'>('plan');

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Your Weekly Plan</h2>
            <p className="text-gray-500 mt-1 max-w-xl">{plan.summary}</p>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors text-sm"
        >
          Create New Plan
        </button>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden flex space-x-2 mb-6 p-1 bg-gray-200 rounded-lg">
        <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'plan' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('plan')}
        >
            Meal Plan
        </button>
        <button 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'groceries' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('groceries')}
        >
            Grocery List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Meal Plan Section */}
        <div className={`lg:col-span-3 ${activeTab === 'groceries' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-6 snap-x">
                {plan.weeklyPlan.map((day, index) => (
                    <div key={index} className="snap-center">
                        <DayColumn day={day} />
                    </div>
                ))}
            </div>
        </div>

        {/* Grocery List Section */}
        <div className={`lg:col-span-1 ${activeTab === 'plan' ? 'hidden lg:block' : 'block'}`}>
            <GroceryList list={plan.groceryList} />
        </div>
      </div>
    </div>
  );
};