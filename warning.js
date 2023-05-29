window.onload = function() {
    document.getElementById('proceed').addEventListener('click', async () => {
        try {
            const data = await browser.storage.local.get('redirectedUrl');
            console.log('Retrieved URL:', data.redirectedUrl);
            if (data.redirectedUrl) {
                // Set a flag indicating the user has chosen to proceed
                await browser.storage.local.set({ 'proceed': true });
                browser.tabs.update({ url: data.redirectedUrl });
            }
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById('goBack').addEventListener('click', () => {
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            browser.tabs.remove(tabs[0].id);
        });
    });
};