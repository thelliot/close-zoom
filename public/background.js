/// <reference types="chrome" />

chrome.tabs.onActivated.addListener((activeTab) => deleteZoomTab(activeTab))
chrome.tabs.onCreated.addListener((activeTab) => deleteZoomTab(activeTab))

async function deleteZoomTab(activeTab) {
  try {
    const tab = await chrome.tabs.get(activeTab.tabId)

    if (tab.status === 'loading') {
      return setTimeout(() => deleteZoomTab(activeTab), 50)
    }

    if (
      tab &&
      !!tab.url.includes('zoom.us/j/') &&
      !!tab.url.includes('#success')
    ) {
      await chrome.tabs.remove(tab.id)
    }
  } catch (error) {
    if (
      error ==
      'Error: Tabs cannot be edited right now (user may be dragging a tab).'
    ) {
      setTimeout(() => deleteZoomTab(activeTab), 50)
    }
  }
}
