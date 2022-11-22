// Imports
// ========================================================
import { useState } from "react";

// Component
// ========================================================
const Headers = ({ className = '', headers, setHeaders }: { className?: string; headers?: { [key: string]: any }[], setHeaders: (value: any) => void }) => {
    // State / Props
    const [showHeaders, setShowHeaders] = useState(false);

    // Render
    return <div className={className}>
        <div>
            <label onClick={() => setShowHeaders(!showHeaders)} className={`block text-sm text-zinc-800 font-medium leading-10 px-4 rounded cursor-pointer hover:bg-zinc-300 ${showHeaders ? 'bg-zinc-300' : null} transition-colors ease-in-out duration-200`}>Headers</label>
        </div>
        {showHeaders ? <div className="px-4 py-4">
            {headers?.map((header, index) => <div key={`header-${index}`} className="mb-2 relative clear-both">
                <div className="float-left w-[90%]">
                    <div className="flex">
                        <label className="block mb-2 text-sm text-zinc-500 w-1/2 mr-1">Key</label>
                        <label className="block mb-2 text-sm text-zinc-500 w-1/2 ml-1">Value</label>
                    </div>
                    <div className="flex mb-3">
                        <input required value={header.key} onChange={(e) => {
                            const h = [...headers];
                            h[index].key = e.target.value;
                            setHeaders(h);
                        }} name="displayName" disabled={false} className="h-10 w-1/2 px-3 mr-1 rounded border-zinc-300 border block" type="text" placeholder="Ex: Authorization" />
                        <input required value={header.value} onChange={(e) => {
                            const h = [...headers];
                            h[index].value = e.target.value;
                            setHeaders(h);
                        }} name="displayName" disabled={false} className="h-10 w-1/2 px-3 ml-1 rounded border-zinc-300 border block" type="text" placeholder="Ex: Bearer 123" />
                    </div>
                </div>
                {index !== 0 ? <div className="absolute top-0 right-0 float-left w-[10%] pl-2 pt-7">
                    <button onClick={() => {
                        const h = [...headers.slice(0, index), ...headers.slice(index + 1)];
                        setHeaders(h);

                    }} className="h-10 w-full rounded-full bg-zinc-800 text-white px-4 flex justify-center items-center">&times;</button>
                </div> : <div className="absolute top-0 right-0 float-left w-[10%] pl-2 pt-7">
                    <span className="h-10 w-full rounded bg-zinc-300 text-white px-4 flex justify-center items-center">&nbsp;</span>
                </div>}
            </div>)}
            <div className="pt-2">
                <button onClick={() => {
                    setHeaders((h: { [key: string]: any }[]) => [...h, { key: '', value: '' }]);
                }} className="h-10 w-full rounded-full bg-zinc-800 text-white px-8">Add</button>
            </div>
        </div> : null}
    </div>
};

// Exports
// ========================================================
export default Headers;