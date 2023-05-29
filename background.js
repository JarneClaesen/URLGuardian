async function checkForAtSymbol(details) {
    const data = await browser.storage.local.get(['redirectedUrl', 'proceed']);

    // If the user has chosen to proceed, don't intercept the request
    if (data.proceed) {
        // Reset the proceed flag for future requests
        await browser.storage.local.set({ 'proceed': false });
        return;
    }

    if ((details.url.includes('@')) && (details.url.endsWith('.zip') || details.url.endsWith('.mov'))) {
        await browser.storage.local.set({ 'redirectedUrl': details.url });
        return { redirectUrl: browser.runtime.getURL("warning.html") };
    }
}

browser.webRequest.onBeforeRequest.addListener(
    checkForAtSymbol,
    { urls: ["<all_urls>"] },
    ["blocking"]
);