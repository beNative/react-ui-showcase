import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`${
            checked ? 'bg-sky-600' : 'bg-slate-600'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
    >
        <span
            className={`${
                checked ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);

const ControlsDemo: React.FC = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(true);
    const [radioValue, setRadioValue] = useState('option2');

    return (
        <div>
            <LivePreview>
                <div className="space-y-8">
                    {/* Slider */}
                    <div>
                        <label htmlFor="slider" className="block text-sm font-medium text-slate-300">Slider Control</label>
                        <div className="flex items-center space-x-4 mt-2">
                            <input
                                id="slider"
                                type="range"
                                min="0"
                                max="100"
                                value={sliderValue}
                                onChange={(e) => setSliderValue(Number(e.target.value))}
                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
                            />
                            <span className="text-sm font-semibold text-sky-400 w-10 text-center">{sliderValue}</span>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div>
                         <h3 className="text-sm font-medium text-slate-300">Toggle Switches</h3>
                         <div className="flex space-x-8 mt-3">
                             <div className="flex items-center space-x-2">
                                 <ToggleSwitch checked={toggle1} onChange={setToggle1} />
                                 <span className="text-slate-400">Notifications</span>
                             </div>
                             <div className="flex items-center space-x-2">
                                 <ToggleSwitch checked={toggle2} onChange={setToggle2} />
                                 <span className="text-slate-400">Dark Mode</span>
                             </div>
                         </div>
                    </div>
                    
                    {/* Radio Buttons */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-300">Radio Group</h3>
                        <div className="flex space-x-8 mt-3">
                            {['option1', 'option2', 'option3'].map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="options"
                                        value={option}
                                        checked={radioValue === option}
                                        onChange={(e) => setRadioValue(e.target.value)}
                                        className="h-4 w-4 border-slate-500 text-sky-600 focus:ring-sky-500 bg-slate-700"
                                    />
                                    <span className="text-slate-400 capitalize">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="Headless UI / Radix UI"
                officialName="tailwindlabs/headlessui"
                githubUrl="https://github.com/tailwindlabs/headlessui"
                description="Modern UI controls are often built using 'headless' libraries. These provide the logic, state management, and accessibility for components like dropdowns, toggles, and modals, while leaving the styling completely up to the developer (e.g., with Tailwind CSS)."
                features={[
                    "Unstyled, accessible UI primitives",
                    "Full control over styling and markup",
                    "Manages complex state and interactions",
                    "Promotes composition and reusability"
                ]}
                installation="npm install @headlessui/react"
                usage={`import { Switch } from '@headlessui/react';\n\n<Switch checked={enabled} onChange={setEnabled}>...</Switch>`}
            />
        </div>
    );
};

export default ControlsDemo;