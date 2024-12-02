document.addEventListener('DOMContentLoaded', () => {
    // take the time at the moment the page is loaded, display it as the "current session"
    const dateTimeString = new Date().toLocaleString();
    const [datePart, timePart] = dateTimeString.split(', ');
    document.getElementById('current-session').innerHTML = `Current Session:<br>${datePart}<br>${timePart}`;

    // real time clock display: update the time every second
    setInterval(() => {
        const dateTimeString = new Date().toLocaleString();
        const [datePart, timePart] = dateTimeString.split(', ');
        document.getElementById('real-time-clock').innerHTML = `Current Time:<br>${datePart}<br>${timePart}`;
    }, 1000);
});