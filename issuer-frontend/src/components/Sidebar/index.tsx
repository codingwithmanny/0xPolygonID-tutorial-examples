// Imports
// ========================================================
import React, { useState } from "react";

// Config
// ========================================================
const links = [
    {
        name: 'Health Check'
    },
    {
        href: '#health-check',
        name: 'Health Check'
    },
    {
        name: 'Organizations'
    },
    {
        name: 'Organizations',
        href: '#orgs-create'
    },
    {
        name: 'Sign-In Organization',
        href: '#orgs-signin'
    },
    {
        name: 'Get Organization',
        href: '#orgs-get'
    },
    {
        name: 'Issuers',
    },
    {
        name: 'Create Issuer',
        href: '#issuer-create'
    },
    {
        name: 'Get Issuer',
        href: '#issuer-get'
    },
    {
        name: 'Update Issuer',
        href: '#issuer-update'
    },
    {
        name: 'Delete Issuer',
        href: '#issuer-delete'
    },
    {
        name: 'Schema',
    },
    {
        name: 'Create Schema',
        href: '#schema-create'
    },
    {
        name: 'Get All Schema',
        href: '#schema-all'
    },
    {
        name: 'Get Schema',
        href: '#schema-get'
    },
    {
        name: 'Update Schema',
        href: '#schema-update'
    },
    {
        name: 'Offer',
    },
    {
        name: 'Create Offer',
        href: '#offer-create'
    },
    {
        name: 'Get All Offers By Schema',
        href: '#offer-all-schema'
    },
    {
        name: 'Get All Offers By Issuer',
        href: '#offer-all-issuer'
    },
    {
        name: 'Get Offer',
        href: '#offer-get'
    },
    {
        name: 'Delete Offer',
        href: '#offer-delete'
    },
    {
        name: 'Create Offer QRCode',
        href: '#offer-create-qr'
    },
    {
        name: 'Get Offer QRCode',
        href: '#offer-get-qr'
    },
    {
        name: 'Issue Claim From Offer',
        href: '#offer-issue-claim'
    },
    {
        name: 'Get Claim QRCode',
        href: '#offer-get-claim-qrcode'
    },
    {
        name: 'Mobile',
    },
    {
        name: 'Get Mobile Version',
        href: '#mobile-get'
    },
    {
        name: 'Update Mobile Version',
        href: '#mobile-update'
    },
];

// Component
// ========================================================
const Sidebar = () => {
    // State / Props
    const [search, setSearch] = useState('');
    const [filteredLinks, setFilteredLinks] = useState(links);

    // Functions
    /**
     * 
     * @param event 
     */
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const s = event.target.value;
        setSearch(event.target.value);
        if (!s || s.length === 0) {
            setFilteredLinks(links);
            return;
        }
        const filter = [...filteredLinks].filter(link => link.name.toLocaleLowerCase().includes(s.toLocaleLowerCase()));
        setFilteredLinks(filter);
    };

    // Render
    return <nav className="w-1/6 absolute top-0 bottom-0 left-0 bg-zinc-100 overflow-scroll">
        <div className="py-8">
            <ul>
                <li className="px-8 mb-4 text-sm font-medium text-zinc-400 items-center">
                    <label htmlFor="search" className="block mb-2 text-sm text-zinc-500">Search Links</label>
                    <input value={search} onChange={onChangeSearch} name="search" id="search" className="h-10 px-3 rounded border-zinc-300 border block w-full text-black" type="search" placeholder="Ex: Health" />
                </li>
                {filteredLinks.map((link, key) => <li key={`link-${key}`} className={`${!link?.href
                    ? 'px-8 text-sm font-medium text-zinc-400 flex h-8 items-center'
                    : 'border-b border-zinc-100'}`}>
                    {link?.href
                        ? <a className="bg-zinc-400 bg-opacity-10 hover:bg-opacity-30 transition-colors ease-in-out duration-200 text-zinc-700 font-medium flex h-12 items-center px-8" href={`${link.href}`}>{link.name}</a>
                        : link.name
                    }
                </li>)}
            </ul>
        </div>
    </nav>;
}

// Exports
// ========================================================
export default Sidebar;