
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CreditCardIcon } from './Icons';

const CreditCardDemo: React.FC = () => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState<'front' | 'back'>('front');

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '').substring(0, 16);
        setNumber(val.replace(/(\d{4})(?=\d)/g, '$1 '));
    };
    
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const val = e.target.value.replace(/\D/g, '').substring(0, 4);
         if(val.length >= 3) {
             setExpiry(`${val.substring(0,2)}/${val.substring(2,4)}`);
         } else {
             setExpiry(val);
         }
    };

    return (
        <div>
            <LivePreview>
                <div className="flex flex-col items-center space-y-8 perspective-1000">
                    
                    {/* Card Visual */}
                    <div className="w-80 h-48 relative duration-500 preserve-3d transition-transform" style={{ transform: focus === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        {/* Front */}
                        <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl p-6 flex flex-col justify-between text-white border border-slate-600/50">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-8 bg-yellow-500/80 rounded-md flex items-center justify-center">
                                    <div className="w-8 h-5 border border-yellow-200/50 rounded-sm"></div>
                                </div>
                                <CreditCardIcon className="w-8 h-8 opacity-80" />
                            </div>
                            <div className="font-mono text-xl tracking-widest mt-4">
                                {number || '#### #### #### ####'}
                            </div>
                            <div className="flex justify-between items-end text-xs uppercase tracking-wide text-slate-300">
                                <div>
                                    <div className="text-[10px]">Card Holder</div>
                                    <div className="font-semibold text-sm text-white truncate w-40">{name || 'FULL NAME'}</div>
                                </div>
                                <div>
                                    <div className="text-[10px]">Expires</div>
                                    <div className="font-semibold text-sm text-white">{expiry || 'MM/YY'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-gradient-to-bl from-slate-700 to-slate-900 shadow-2xl flex flex-col justify-center text-white border border-slate-600/50 overflow-hidden">
                             <div className="w-full h-10 bg-black mt-4"></div>
                             <div className="px-6 mt-4">
                                 <div className="text-[10px] uppercase text-right mr-2">CVC</div>
                                 <div className="bg-white text-black font-mono text-right pr-2 py-1 rounded text-sm h-8 flex items-center justify-end">
                                     {cvc || '###'}
                                 </div>
                             </div>
                             <div className="flex-1"></div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="w-full max-w-sm space-y-4">
                         <input
                            type="text"
                            placeholder="Card Number"
                            value={number}
                            onChange={handleNumberChange}
                            onFocus={() => setFocus('front')}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                        />
                         <input
                            type="text"
                            placeholder="Card Holder Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                             onFocus={() => setFocus('front')}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                        />
                        <div className="flex gap-4">
                             <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                maxLength={5}
                                onChange={handleExpiryChange}
                                 onFocus={() => setFocus('front')}
                                className="w-1/2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                            />
                             <input
                                type="text"
                                placeholder="CVC"
                                value={cvc}
                                maxLength={3}
                                onChange={(e) => setCvc(e.target.value)}
                                onFocus={() => setFocus('back')}
                                className="w-1/2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>
                <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .backface-hidden { backface-visibility: hidden; }
                    .rotate-y-180 { transform: rotateY(180deg); }
                `}</style>
            </LivePreview>
            <TechnicalOverview
                library="react-credit-cards-2"
                officialName="amarofashion/react-credit-cards"
                githubUrl="https://github.com/amarofashion/react-credit-cards"
                description="A beautiful credit card component that visualizes card data as the user types. It adds a layer of polish and feedback to payment forms."
                features={[
                    "Visual feedback for card type (Visa, Mastercard, etc.).",
                    "Flip animation for CVC entry.",
                    "Customizable styling.",
                    "Supports various credit card formats."
                ]}
                installation="npm install react-credit-cards-2"
                usage={`import Cards from 'react-credit-cards-2';\nimport 'react-credit-cards-2/dist/es/styles-compiled.css';\n\n<Cards\n  number={state.number}\n  expiry={state.expiry}\n  cvc={state.cvc}\n  name={state.name}\n  focused={state.focus}\n/>`}
            />
        </div>
    );
};

export default CreditCardDemo;
