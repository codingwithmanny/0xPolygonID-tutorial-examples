// Imports
// ========================================================
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import api from "../../api";
import Console from "../../components/Console";
import Sidebar from "../../components/Sidebar";

// Helpers
// ========================================================


// Page Component
// ========================================================
const DebugPage = () => {
    // State / Props
    const existingHeaders = JSON.parse(localStorage.getItem('headers') || `[{ key: '', value: '' }]`);
    const [headers, setHeaders] = useState<{ [key: string]: any; }[]>(existingHeaders);
    const [debugs, setDebugs] = useState<any[]>([]);

    // Requests
    const ORG = {
        create: useMutation({
            mutationFn: api.org.create,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
        signIn: useMutation({
            mutationFn: api.org.signin,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
        get: useMutation({
            mutationFn: api.org.get,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
    };

    /**
     * 
     */
    const ISSUER = {
        create: useMutation({
            mutationFn: api.issuer.create,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
        get: useMutation({
            mutationFn: api.issuer.get,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
        update: useMutation({
            mutationFn: api.issuer.update,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        }),
        delete: useMutation({
            mutationFn: api.issuer.delete,
            onSuccess: async (data: any) => {
                console.log({ data });

                const json = await data.json();
                setDebugs((d) => [...d, {
                    url: data?.url,
                    status: data.status,
                    data: json
                }])
            }
        })
        // get: useQuery(['issuer-get'], () => api.issuer.get({ headers, id: state.issuerID }), {
        //     enabled: false,
        //     onSuccess: async (data: any) => {
        //         console.log({ data });

        //         const json = await data.json();
        //         setDebugs((d) => [...d, {
        //             url: data?.url,
        //             status: data.status,
        //             data: json
        //         }])
        //     }
        // })
    };

    // Functions

    // Hooks
    useEffect(() => {
        localStorage.setItem('headers', JSON.stringify(headers));
    }, [headers]);

    // Render
    return <div className="absolute inset-0 overflow-scroll">
        <Sidebar />

        <main className="w-[calc(45%-32px)] absolute top-0 bottom-0 overflow-scroll left-[16.66666%]">
            <div className="p-8">
                <h1 className="text-xl font-semibold mb-4">Debug Issuer API</h1>

                <h2 className="text-lg text-zinc-500 mb-4">Organizations</h2>

                <h3 id="orgs-create" className="mb-4">Create Organization</h3>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ORG.create.mutate({
                        payload: {
                            email: event.currentTarget.email.value,
                            password: event.currentTarget.password.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Email</label>
                        <input name="email" disabled={ORG.create.isLoading} className="h-10 px-3 rounded border-zinc-300 border block w-full" required type="email" placeholder="email@address.com" />
                    </div>

                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Password</label>
                        <input name="password" disabled={ORG.create.isLoading} className="h-10 px-3 rounded border-zinc-300 border block w-full" required type="password" placeholder="••••••••" />
                    </div>

                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="orgs-sign-in" className="mb-4">Organization Sign-In</h3>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ORG.signIn.mutate({
                        payload: {
                            email: event.currentTarget.email.value,
                            password: event.currentTarget.password.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Email</label>
                        <input name="email" disabled={ORG.create.isLoading} className="h-10 px-3 rounded border-zinc-300 border block w-full" required type="email" placeholder="email@address.com" />
                    </div>

                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Password</label>
                        <input name="password" disabled={ORG.create.isLoading} className="h-10 px-3 rounded border-zinc-300 border block w-full" required type="password" placeholder="••••••••" />
                    </div>

                    <div className="block mb-6">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="orgs-get" className="mb-4">Get Organization</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ORG.get.mutate({
                        headers,
                        payload: {
                            orgID: event.currentTarget.orgID.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="orgID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <hr className="mb-8" />

                <h2 className="text-lg text-zinc-500 mb-4">Issuer</h2>

                <h3 id="issuer-create" className="mb-4">Create Issuer</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.create.mutate({
                        headers,
                        payload: {
                            displayName: event.currentTarget.displayName.value,
                            logo: event.currentTarget.logo.value,
                            legalName: event.currentTarget.legalName.value,
                            region: event.currentTarget.region.value,
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Display Name</label>
                        <input required name="displayName" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: My Polygon ID Issuer" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Logo (optional)</label>
                        <input name="logo" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAArwAAA..." />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Legal Name (optional)</label>
                        <input name="legalName" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: Polygon" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Region (optional)</label>
                        <input name="region" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: USA" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="issuer-get" className="mb-4">Get Issuer</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.get.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="issuer-update" className="mb-4">Update Issuer</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.update.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value,
                            displayName: event.currentTarget.displayName.value,
                            logo: event.currentTarget.logo.value,
                            legalName: event.currentTarget.legalName.value,
                            region: event.currentTarget.region.value,
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Display Name</label>
                        <input name="displayName" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: My Polygon ID Issuer" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Logo (optional)</label>
                        <input name="logo" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAArwAAA..." />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Legal Name (optional)</label>
                        <input name="legalName" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: Polygon" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Region (optional)</label>
                        <input name="region" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: USA" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="issuer-delete" className="mb-4">Delete Issuer</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.delete.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <hr className="mb-8" />

                <h2 className="text-lg text-zinc-500 mb-4">Schema</h2>

                <h3 id="schema-create" className="mb-4">Create Schema</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.create.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value,
                            schema: event.currentTarget.schema.value,
                            mandatoryExpiration: event.currentTarget.mandatoryExpiration.value,
                            attributes: event.currentTarget.inputAttributes.value,
                            technicalName: event.currentTarget.technicalName.value,
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Schema</label>
                        <input required name="schema" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: My Polygon ID Schema" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Mandatory Expiration</label>
                        {/* <input required name="schema" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: My Polygon ID Schema" /> */}
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Attributes</label>
                        <input name="inputAttributes[].name" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: Attribute Name 1" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Technical Name (optional)</label>
                        <input name="technicalName" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: Polygon123" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="schema-all" className="mb-4">Get All Schemas</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.get.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value,
                            schemaID: event.currentTarget.schemaID.value
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Schema ID</label>
                        <input required name="schemaID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="fc132ebd-8d90-422a-b951-ab103f1954b5" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="schema-get" className="mb-4">Get Schema</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.get.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value,
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

                <h3 id="schema-update" className="mb-4">Update Schema</h3>

                <Headers className="mb-3 bg-zinc-200 rounded" headers={headers} setHeaders={setHeaders} />

                <form onSubmit={(event) => {
                    event.preventDefault();
                    ISSUER.update.mutate({
                        headers,
                        payload: {
                            issuerID: event.currentTarget.issuerID.value,
                            query: event.currentTarget.query.value,
                            active: event.currentTarget.active.value,
                        }
                    });
                }}>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Issuer ID</label>
                        <input required name="issuerID" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: a799c642-bfda-469a-b34c-33fb53155793" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Query</label>
                        <input name="query" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: query=role" />
                    </div>
                    <div className="block mb-4">
                        <label className="block mb-2 text-sm text-zinc-500">Active</label>
                        <input name="active" disabled={false} className="h-10 px-3 rounded border-zinc-300 border block w-full" type="text" placeholder="Ex: true|false" />
                    </div>
                    <div className="block mb-4">
                        <button disabled={ORG.create.isLoading} className="h-10 rounded-full bg-zinc-800 text-white px-8">Submit</button>
                    </div>
                </form>

            </div>
        </main>

        <Console className="w-2/5 absolute top-0 bottom-0 right-0 bg-zinc-800" debugs={debugs} setDebugs={(value: any[]) => { setDebugs(value); }} />
    </div>
};

// Exports
// ========================================================
export default DebugPage;