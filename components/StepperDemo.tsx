
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const steps = [
    { id: 1, title: 'Personal Info', description: 'Enter your details' },
    { id: 2, title: 'Account Setup', description: 'Create your credentials' },
    { id: 3, title: 'Review', description: 'Check your information' },
    { id: 4, title: 'Complete', description: 'Success!' },
];

const StepperDemo: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {orientation === 'horizontal' ? (
                            <div className="w-full max-w-2xl mx-auto">
                                {/* Horizontal Stepper Header */}
                                <div className="relative flex items-center justify-between w-full mb-8">
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                                    <div 
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-sky-600 -z-10 transition-all duration-300" 
                                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                    ></div>
                                    
                                    {steps.map((step) => {
                                        const isCompleted = step.id < currentStep;
                                        const isCurrent = step.id === currentStep;
                                        
                                        return (
                                            <div key={step.id} className="flex flex-col items-center bg-white dark:bg-slate-950 px-2 transition-colors">
                                                <div 
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                                                        isCompleted || isCurrent 
                                                        ? 'border-sky-600 bg-sky-600 text-white' 
                                                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        step.id
                                                    )}
                                                </div>
                                                <div className="absolute top-10 w-32 text-center hidden sm:block">
                                                    <p className={`text-xs font-semibold ${isCurrent ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`}>{step.title}</p>
                                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{step.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row h-full min-h-[300px]">
                                <div className="flex flex-col items-start mr-8 relative">
                                      {/* Vertical Line */}
                                     <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                                     <div 
                                        className="absolute left-4 top-4 w-0.5 bg-sky-600 -z-10 transition-all duration-300" 
                                        style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 85}%` }}
                                    ></div>

                                     {steps.map((step, idx) => {
                                        const isCompleted = step.id < currentStep;
                                        const isCurrent = step.id === currentStep;
                                        return (
                                            <div key={step.id} className="flex items-center mb-8 bg-white dark:bg-slate-950 py-2 pr-2 transition-colors z-10">
                                                 <div 
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 mr-4 flex-shrink-0 ${
                                                        isCompleted || isCurrent 
                                                        ? 'border-sky-600 bg-sky-600 text-white' 
                                                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        step.id
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-semibold ${isCurrent ? 'text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`}>{step.title}</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500">{step.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className={`bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center ${orientation === 'horizontal' ? 'mt-12 min-h-[200px]' : 'h-full'}`}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                Step {currentStep}: {steps[currentStep - 1].title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                {currentStep === steps.length 
                                    ? "All done! Your account has been created." 
                                    : "Fill in the required information to proceed to the next step."}
                            </p>
                            {/* Controls */}
                            <div className="flex justify-center gap-4 mt-6 w-full">
                                <button 
                                    onClick={prevStep} 
                                    disabled={currentStep === 1}
                                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Previous
                                </button>
                                <button 
                                    onClick={nextStep} 
                                    disabled={currentStep === steps.length}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-500 transition-colors shadow-sm"
                                >
                                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4 h-fit">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Configuration</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Orientation</label>
                             <div className="flex space-x-2 bg-white dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => setOrientation('horizontal')}
                                    className={`flex-1 px-3 py-1.5 text-sm rounded transition-colors ${orientation === 'horizontal' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Horizontal
                                </button>
                                <button
                                    onClick={() => setOrientation('vertical')}
                                    className={`flex-1 px-3 py-1.5 text-sm rounded transition-colors ${orientation === 'vertical' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Vertical
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="MUI Stepper / Custom"
                officialName="mui/material-ui"
                githubUrl="https://mui.com/material-ui/react-stepper/"
                description="Steppers convey progress through numbered steps. They divide a complex task into smaller parts, making it easier to manage and complete."
                features={[
                    "Visualizes linear workflow.",
                    "Supports horizontal and vertical orientation.",
                    "Optional/Skippable steps.",
                    "Validation logic hookups between steps."
                ]}
                installation="npm install @mui/material"
                usage={`import Stepper from '@mui/material/Stepper';\nimport Step from '@mui/material/Step';\nimport StepLabel from '@mui/material/StepLabel';\n\n<Stepper activeStep={activeStep}>\n  {steps.map((label) => (\n    <Step key={label}><StepLabel>{label}</StepLabel></Step>\n  ))}\n</Stepper>`}
            />
        </div>
    );
};

export default StepperDemo;
