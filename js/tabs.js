/**
 * Tab functionality manager for the VisionXt landing page
 * This handles tab switching across all components that use tabs
 */

function initializeTabs() {
    console.log('Initializing tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0) {
        console.log('No tab buttons found, will retry later');
        setTimeout(initializeTabs, 500);
        return;
    }
    
    console.log(`Found ${tabButtons.length} tab buttons and ${tabPanes.length} tab panes`);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabGroup = this.closest('.tab-navigation').parentElement;
            const tabContent = tabGroup.querySelector('.tab-content');
            
            if (!tabContent) {
                console.error('Tab content container not found');
                return;
            }
            
            // Get all tab buttons in this group
            const groupButtons = tabGroup.querySelectorAll('.tab-button');
            
            // Remove active class from all buttons in this group
            groupButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-light-accent', 'text-primary');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.remove('bg-light-accent', 'text-primary');
            this.classList.add('bg-primary', 'text-white');
            
            // Get the tab name from data attribute
            const tabName = this.getAttribute('data-tab');
            
            // Hide all tab panes in this group
            const groupPanes = tabContent.querySelectorAll('.tab-pane');
            groupPanes.forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            const selectedPane = tabContent.querySelector(`#${tabName}`);
            if (selectedPane) {
                selectedPane.classList.remove('hidden');
                selectedPane.classList.add('active');
                
                // Trigger a small layout shift to ensure everything renders properly
                window.dispatchEvent(new Event('resize'));
                
                console.log(`Tab switched to: ${tabName}`);
            } else {
                console.error(`Tab pane #${tabName} not found`);
            }
        });
    });
    
    // Ensure the first tab is active
    const tabGroups = document.querySelectorAll('.tab-navigation');
    tabGroups.forEach(group => {
        const firstButton = group.querySelector('.tab-button');
        if (firstButton && !firstButton.classList.contains('active')) {
            firstButton.click();
        }
    });
    
    console.log('Tab initialization complete');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // We'll wait a moment to ensure all components are loaded first
    setTimeout(initializeTabs, 500);
});

// Re-initialize when all components are loaded
if (typeof window.initializeScripts === 'function') {
    const originalInitializeScripts = window.initializeScripts;
    window.initializeScripts = function() {
        originalInitializeScripts();
        initializeTabs();
    };
} else {
    window.initializeScripts = function() {
        initializeTabs();
    };
}

// Also try to initialize on window load
window.addEventListener('load', function() {
    setTimeout(initializeTabs, 1000);
});
