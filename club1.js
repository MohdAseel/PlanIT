document.addEventListener('DOMContentLoaded', () => {
    const eventContainer = document.getElementById('event-container');

    // Function to create a new event card
    function createEventCard() {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h2>Event Name</h2>
            <p>Date: DD/MMM</p>
            <p>Time: HH:MM</p>
            <p>Description: .......</p>
            <div class="buttons">
                <button class="add-event">Add Event</button>
                <button class="learn-more">Learn More</button>
            </div>
        `;
        return card;
    }

    // Function to load events initially and when scrolling down
    function loadEvents(count) {
        for (let i = 0; i < count; i++) {
            const eventCard = createEventCard();
            eventContainer.appendChild(eventCard);
        }
    }

    // Load 3 events initially
    loadEvents(9);

    // Load more events on scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Load 3 more events when reaching the bottom
            loadEvents(3);
        }
    });
});
