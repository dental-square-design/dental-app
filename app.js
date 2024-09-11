// Function to toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeIcon = document.querySelector('.theme-btn i');

    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Function to show the desired section and hide others
function showSection(sectionId) {
    // Array of all sections in the new order
    const sections = ['home-section', 'appointment-section', 'updates-section', 'contact-section'];

    // Hide all sections with a fade-out effect
    sections.forEach(section => {
        const element = document.getElementById(section);
        element.style.opacity = 0; // Start fade out
        setTimeout(() => {
            element.style.display = 'none';
        }, 300); // Wait for fade-out duration
    });

    // Show the selected section with a fade-in effect
    const targetElement = document.getElementById(sectionId);
    setTimeout(() => {
        targetElement.style.display = 'block';
        setTimeout(() => {
            targetElement.style.opacity = 1; // Fade in
        }, 50);
    }, 300); // Wait for fade-out before fade-in
}

// Function to set valid date range for the appointment form (excluding Sundays)
function setAppointmentDateOptions() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    let daysAdded = 0;
    let optionsHTML = '';

    // Loop to find the next 7 days excluding Sundays
    while (daysAdded < 7) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + daysAdded);

        // Skip Sundays (0 = Sunday)
        if (currentDate.getDay() !== 0) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            optionsHTML += `<option value="${formattedDate}">${currentDate.toDateString()}</option>`;
        } else {
            // Skip incrementing daysAdded if it's a Sunday
            daysAdded++;
            continue;
        }

        daysAdded++;
    }

    // Set options dynamically
    dateInput.innerHTML = optionsHTML;
}

// Function to set time options for the appointment form (9:00 AM to 6:00 PM with 30-minute gaps)
function setAppointmentTimeOptions() {
    const timeInput = document.getElementById('time');
    let optionsHTML = '';
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedTime = new Date(0, 0, 0, hour, minute).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            optionsHTML += `<option value="${formattedTime}">${formattedTime}</option>`;
        }
    }

    // Set time options dynamically
    timeInput.innerHTML = optionsHTML;
}

// Event listener for form submission
document.getElementById('appointment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value; // New time input
    const message = document.getElementById('message').value;

    // Basic validation
    if (name && contact && email && date && time) {
        alert('Thank you for booking an appointment! We will contact you shortly.');
        document.getElementById('appointment-form').reset(); // Reset form fields
        setAppointmentDateOptions(); // Reset date options after form submission
        setAppointmentTimeOptions(); // Reset time options after form submission
    } else {
        alert('Please fill in all required fields.');
    }
});

// Show home section by default on page load and set appointment date and time options
document.addEventListener('DOMContentLoaded', () => {
    showSection('home-section');
    setAppointmentDateOptions();
    setAppointmentTimeOptions(); // Initialize time options
});
