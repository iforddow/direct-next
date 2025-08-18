"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { apply, setAttr } from "@directus/visual-editing";

// Create the context
interface VisualEditingContextType {
    isVisualEditing: boolean;
    setIsVisualEditing: (value: boolean) => void;
    getDirectusAttr: (
        collection: string,
        item: string,
        fields: string,
        mode?: "drawer" | "popover",
    ) => { 'data-directus': string } | {};
}

export const VisualEditingContext = createContext<VisualEditingContextType | undefined>(undefined);

export function VisualEditingProvider({ children }: { children: React.ReactNode }) {
    const [isVisualEditing, setIsVisualEditing] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const accessToken = process.env.VISUAL_EDITING_TOKEN;

    /**
     * Helper function to conditionally create directus attributes
     * Returns an object with data-directus attribute if in visual editing mode, empty object otherwise
     */
    const getDirectusAttr = (
        collection: string,
        item: string,
        fields: string,
        mode: "drawer" | "popover" = "popover",
    ) => {
        if (!isVisualEditing) {
            return {};
        }

        const attrValue = setAttr({
            collection,
            item,
            fields,
            mode,
        });

        return { 'data-directus': attrValue };
    }

    const initializeVisualEditing = () => {
        if (typeof window !== "undefined") {
            // Apply the visual editing connection to Directus
            apply({
                directusUrl:
                    process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
            });

            console.log("Directus visual editing applied");
        }
    }

    // Check if visual editing is enabled on initial load and initialize if needed
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const visualEditingParam = urlParams.get("visual-editing") === "true";
        const tokenParam = urlParams.get("token");

        // Determine if visual editing should be enabled
        const shouldEnableVisualEditing = visualEditingParam && accessToken && tokenParam === accessToken;

        // Set visual editing state and initialize if enabling
        if (shouldEnableVisualEditing) {
            setIsVisualEditing(true);
            // Initialize visual editing immediately when enabled
            initializeVisualEditing();
        } else {
            setIsVisualEditing(false);
        }
    }, [pathname, searchParams, accessToken]); // Watch for URL changes

    // Update URL parameters when navigating between pages
    useEffect(() => {

        if (isVisualEditing && accessToken) {
            const url = new URL(window.location.href);

            // Ensure we're using the correct pathname
            if (url.pathname !== pathname) {
                url.pathname = pathname;
            }

            // Always ensure visual editing parameter is present
            url.searchParams.set("visual-editing", "true");
            url.searchParams.set("token", accessToken);

            // Update the current page URL
            const newUrl = url.toString();

            // Only update if the URL has actually changed
            if (window.location.href !== newUrl) {
                window.history.replaceState({}, "", newUrl);
            }

            // Notify parent window (Directus visual editor) of the URL change
            if (window.parent && window.parent !== window) {
                try {
                    // Use the standard method for updating parent URL
                    window.parent.postMessage({
                        type: 'directus-visual-editing-navigate',
                        url: newUrl,
                        pathname: pathname
                    }, '*');

                    // Also try the alternative method
                    window.parent.postMessage({
                        type: 'url-change',
                        url: newUrl
                    }, '*');

                } catch (error) {
                    console.error('Could not notify parent of URL change:', error);
                }
            }
        }
    }, [pathname, searchParams, isVisualEditing, accessToken]);

    const contextValue: VisualEditingContextType = {
        isVisualEditing,
        setIsVisualEditing,
        getDirectusAttr,
    };

    return (
        <VisualEditingContext.Provider value={contextValue}>
            {children}
        </VisualEditingContext.Provider>
    );
}
