// Imports
// ========================================================

// Config
// ========================================================
const API_URL = `${import.meta.env.VITE_POLYGONID_API_URL}`;
const fetchConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

/**
 * 
 * @param headers 
 * @returns 
 */
const headerArrayToObject = (headers: { [key: string]: any }[]) => {
    if (headers.length === 0) return {};
    return headers.reduce((a, b) => ({ [b.key]: b.value }), {});
};

// Requests
// ========================================================
const api = {
    org: {
        create: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/orgs/account-management`,
            {
                ...fetchConfig,
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        signin: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/orgs/sign-in`,
            {
                ...fetchConfig,
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        activate: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/orgs/activate`,
            {
                ...fetchConfig,
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        get: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/orgs/${payload?.payload?.orgID}`,
            {
                ...fetchConfig,
                method: 'GET',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
            }
        ),
    },
    issuer: {
        create: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers`,
            {
                ...fetchConfig,
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        update: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload?.issuerID}`,
            {
                ...fetchConfig,
                method: 'PATCH',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        get: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload?.payload?.issuerID}`,
            {
                ...fetchConfig,
                method: 'GET',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
            }
        ),
        patch: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload.issuerID}`,
            {
                ...fetchConfig,
                method: 'PATH',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        delete: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload?.payload?.issuerID}`,
            {
                ...fetchConfig,
                method: 'DELETE',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
            }
        ),
    },
    schema: {
        create: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload.schemaID}/schemas`,
            {
                ...fetchConfig,
                method: 'POST',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        update: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload.schemaID}/schemas/${payload.payload.schemaID}`,
            {
                ...fetchConfig,
                method: 'PATCH',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        all: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload.schemaID}/schemas`,
            {
                ...fetchConfig,
                method: 'GET',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
        get: ({ headers, ...payload }: { headers?: { [key: string]: any }[]; payload: any }) => fetch(
            `${API_URL}/issuers/${payload.payload.issuerID}/schemas/${payload.payload.schemaID}`,
            {
                ...fetchConfig,
                method: 'GET',
                headers: {
                    ...fetchConfig.headers,
                    ...headerArrayToObject(headers || [])
                },
                body: JSON.stringify(payload?.payload)
            }
        ),
    }
}

// Exports
// ========================================================
export default api;