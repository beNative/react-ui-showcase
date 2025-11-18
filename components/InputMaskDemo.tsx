
import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

// Simple mask implementation for demo purposes
// In production, use a robust library like react-input-mask or react-imask
const InputMaskDemo: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [cc, setCc] = useState('');
    const [date, setDate] = useState('');

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        let formatted = '';
        if (numbers.length > 0) formatted += '(' + numbers.substring(0, 3);
        if (numbers.length > 3) formatted += ') ' + numbers.substring(3, 6);
        if (numbers.length > 6) formatted += '-' + numbers.substring(6, 10);
        return formatted;
    };

    const formatCC = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substr(i, 4));
        }
        return parts.length > 1 ? parts.join(' ') : value;
    };
    
    const formatDate = (value: string) => {
        const v = value.replace(/\D/g, '').slice(0, 8);
        if (v.length >= 5) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
        } else if (v.length >= 3) {
             return `${v.slice(0, 2)}/${v.slice(2)}`;
        }
        return v;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allow backspace
        if (e.target.value.length < phone.length) {
             setPhone(e.target.value);
             return;
        }
        setPhone(formatPhone(e.target.value));
    };

    const handleCCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (e.target.value.length < cc.length) {
             setCc(e.target.value);
             return;
        }
        setCc(formatCC(e.target.value));
    };

     const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (e.target.value.length < date.length) {
             setDate(e.target.value);
             return;
        }
        setDate(formatDate(e.target.value));
    };

    return (
        <div>
            <LivePreview>
                <div className="w-full max-w-sm mx-auto space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="(555) 555-5555"
                            maxLength={14}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none placeholder-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Credit Card</label>
                        <input
                            type="text"
                            value={cc}
                            onChange={handleCCChange}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none placeholder-slate-500"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Date (MM/DD/YYYY)</label>
                        <input
                            type="text"
                            value={date}
                            onChange={handleDateChange}
                            placeholder="MM/DD/YYYY"
                            maxLength={10}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none placeholder-slate-500"
                        />
                    </div>
                </div>
            </LivePreview>
            <TechnicalOverview
                library="react-input-mask / react-imask"
                officialName="sanniassin/react-input-mask"
                githubUrl="https://github.com/sanniassin/react-input-mask"
                description="Input masks force user input to conform to a specific format, improving data quality and user experience for fields like phone numbers, dates, and currency."
                features={[
                    "Validates input as the user types.",
                    "Supports fixed and variable mask patterns.",
                    "Custom mask characters and definitions.",
                    "Seamless integration with form libraries."
                ]}
                installation="npm install react-input-mask"
                usage={`import InputMask from 'react-input-mask';\n\n<InputMask mask="(999) 999-9999" value={value} onChange={onChange} />`}
            />
        </div>
    );
};

export default InputMaskDemo;
