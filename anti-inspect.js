// Prevent right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Prevent keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C)
document.addEventListener('keydown', event => {
    // F12
    if (event.key === 'F12' || event.keyCode === 123) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i' || event.keyCode === 73)) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'j' || event.keyCode === 74)) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u' || event.keyCode === 85)) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (event.ctrlKey && event.shiftKey && (event.key === 'C' || event.key === 'c' || event.keyCode === 67)) {
        event.preventDefault();
        return false;
    }
});
