import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // If there's only 1 page, don't show pagination
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => {
                // Remove "Next &raquo;" and "&laquo; Previous" from labels
                let label = link.label;
                if (label === "&laquo; Previous") label = "«";
                if (label === "Next &raquo;") label = "»";

                if (link.url === null) {
                    return (
                        <span
                            key={key}
                            className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded bg-gray-100 opacity-50"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-3 py-1 text-sm rounded focus:outline-none ${
                            link.active
                                ? "border border-blue-500 bg-blue-500 text-white"
                                : "border border-gray-300 hover:bg-gray-100"
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
