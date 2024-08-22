// ==UserScript==
// @name         FocusSearch
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Easily remove unwanted websites from search results.
// @author       Lapis Pheonix
// @homepageURL  https://github.com/LapisPhoenix/FocusSearch
// @match        *://www.google.com/search*
// @match        *://www.bing.com/search*
// @match        *://search.yahoo.com/search*
// @match        *://duckduckgo.com/?q=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add the domains you want to block here
    const blockedDomains = [
        'realpython.com',
        'medium.com',
        'fandom.com',
    ];

    // Define selectors for different search engines
    const selectors = [
        { name: 'Google', selector: 'div.g' },
        { name: 'Bing', selector: 'li.b_algo' },
        { name: 'Yahoo', selector: 'div.dd.algo' },
        { name: 'DuckDuckGo', selector: 'div.result' }  // May be broken!
    ];

    function processResults(results) {
        results.forEach(result => {
            blockedDomains.forEach(domain => {
                if (result.innerHTML.includes(domain)) {
                    result.style.display = 'none';
                }
            });
        });
    }

    function blockSites() {
        selectors.forEach(engine => {
            const results = document.querySelectorAll(engine.selector);
            processResults(results);
        });
    }

    function observeDOM() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    blockSites();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Initial block
    blockSites();

    // Observe for dynamic content
    observeDOM();
})();
