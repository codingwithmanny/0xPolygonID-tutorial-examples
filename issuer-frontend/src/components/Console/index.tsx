// Imports
// ========================================================


// Helpers
// ========================================================
/**
 * Helper function to decide the color of the status
 * @param statusCode
 * @returns 
 */
const statusColor = (statusCode: number) => {
    if (statusCode < 300) {
        return 'bg-green-500';
    } else if (statusCode < 400) {
        return 'bg-yellow-500';
    }
    return 'bg-red-500';
};

// Component
// ========================================================
const Console = ({ className = '', debugs = [], setDebugs }: { className?: string; debugs: any[], setDebugs: (value: any[]) => void }) => {
    return <aside className={className}>
        <div className="overflow-scroll absolute top-0 bottom-0">
            <div className="pb-8 pt-12">
                <code className="text-zinc-200 text-sm"><pre className="whitespace-pre-wrap">{debugs.map((debug, key) => <div key={`request-${key}`} className="pb-5 pt-4 px-6 border-b border-zinc-700 even:bg-black even:bg-opacity-20">
                    <div className="block">
                        <label className="text-xs text-zinc-500 block mb-2">URL</label>
                        <span className="text-zinc-300 inline-block w-full overflow-scroll text-sm rounded">{debug?.url}</span>
                    </div>
                    <label className="text-xs text-zinc-500 block mb-2">Response</label>
                    <div className="relative">
                        <div className="bg-zinc-900 px-4 py-4 rounded text-zinc-300 overflow-scroll">{JSON.stringify(debug?.data, null, ' ')}</div>
                        <span className="bg-black absolute block top-0 right-0 text-white leading-6 w-auto font-semibold pl-5 pr-2 text-xs rounded-tr rounded-bl">
                            <em className={`${statusColor(debug?.status)} w-[6px] h-[6px] rounded-full block mr-[6px] absolute left-2 bottom-0 top-0 m-auto`}></em>
                            {debug?.status}
                        </span>
                    </div>
                </div>)}</pre></code>
            </div>
        </div>
        <p className="absolute px-4 top-3 left-6 rounded bg-black bg-opacity-80 leading-8 text-xs text-zinc-300 font-semibold">DEBUG</p>
        <button onClick={() => setDebugs([])} className="h-7 px-4 rounded-full text-xs font-medium bg-white text-zinc-800 absolute top-3 right-6">Clear</button>
    </aside>
};

// Exports
// ========================================================
export default Console;