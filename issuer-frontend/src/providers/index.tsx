// Imports
// ========================================================
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Config
// ========================================================
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

// Main Provider
// ========================================================
const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return <div>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </BrowserRouter>
    </div>
};

// Exports
// ========================================================
export default RootProvider;