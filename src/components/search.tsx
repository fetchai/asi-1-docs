"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useState, useRef, useEffect } from "react";
import Modal from "./modal";
import Link from "next/link";
import { Shortcut } from "./icon/shared-icons";
import {
    InstantSearch,
    Configure,
    SearchBox,
    Hits,
    useHits,
    Index,
    Highlight as AlgoliaHighlight
} from "react-instantsearch";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const agentverseIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_AGENTVERSE;
const fetchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_FETCH;
const inputId = "search-input";

export function Search() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const inputRef = useRef(null);

    const openModal = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setModalIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <InstantSearch searchClient={searchClient} indexName={agentverseIndex} routing insights>
            <div className="flex items-center gap-3 bg-[#EDEDED] input-inner-nav input-hover search-bar px-2 rounded-md">
                <input
                    id={inputId}
                    type="search"
                    placeholder="Search in documentation"
                    className="nx-bg-white nx-w-full input-inner-nav"
                    onClick={openModal}
                    autoComplete="off"
                    ref={inputRef}
                />
                <div className="p-1">
                    <Shortcut />
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <div className="nextra-search nx-opacity-100 nx-relative">
                    <SearchBox className="search-box" placeholder="Search in documentation" autoFocus />

                    <div className="h-[660px] algolia-results overflow-y-auto">
                        <section>
                            <h2 className="px-4 py-2 text-lg font-semibold text-gray-700">Agentverse Docs</h2>
                            <Index indexName={agentverseIndex}>
                                <Configure hitsPerPage={10} />
                                <Results />
                            </Index>
                        </section>
                        <section className="mt-6">
                            <h2 className="px-4 py-2 text-lg font-semibold text-gray-700">Fetch Docs</h2>
                            <Index indexName={fetchIndex}>
                                <Configure hitsPerPage={10} />
                                <Results />
                            </Index>
                        </section>
                    </div>
                </div>
            </Modal>
        </InstantSearch>
    );
}

const Results = () => {
    const { hits } = useHits();

    if (!hits.length) {
        return (
            <div className="flex flex-col items-center justify-center py-4 text-gray-500">
                <p>No results found.</p>
            </div>
        );
    }

    return (
        <div>
            <Hits hitComponent={SearchResult} />
        </div>
    );
};

const SearchResult = ({ hit }) => {
    const truncateContent = (content) =>
        content?.length > 150 ? `${content.substring(0, 150)}...` : content;

    const getTypeIcon = () => {
        if (hit.type === 'api') {
            return <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">API</span>;
        } else if (hit.type === 'guide') {
            return <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">Guide</span>;
        }
        return null;
    };

    return (
        <Link href={hit.path} className="block p-4 border-b border-slate-100">
            <div className="flex items-start justify-between mb-1">
                <div className="font-medium text-blue-600 hover:underline">
                    <AlgoliaHighlight attribute="title" hit={hit} />
                </div>
                <div>{getTypeIcon()}</div>
            </div>
            <p className="mb-2 text-xs text-gray-500">{hit.path}</p>
            <p className="text-sm text-gray-700">{truncateContent(hit.content)}</p>
        </Link>
    );
};

export default Search;
