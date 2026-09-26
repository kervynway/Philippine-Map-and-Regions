const regionData = {
    "region-ncr": {
        name: "National Capital Region (NCR)",
        center: "Manila",
        provinces: "Metro Manila",
        description: "The capital region and the center of culture, economy, and government in the Philippines."
    },
    "region-4a": {
        name: "CALABARZON (Region IV-A)",
        center: "Calamba, Laguna",
        provinces: "Cavite, Laguna, Batangas, Rizal, Quezon",
        description: "A booming industrial and agricultural region, home to historical sites, the Taal Volcano, and major educational hubs."
    }
    // Note: Make sure you add the rest of your 18 regions here!
};

// HTML Element Selectors
const mapRegions = document.querySelectorAll('#ph-map g');
const infoPanel = document.getElementById('info-panel');
const searchInput = document.getElementById('province-search');

// --- Feature 1: Map Click Logic ---
mapRegions.forEach(regionGroup => {
    regionGroup.addEventListener('click', function() {
        const clickedId = this.getAttribute('id');
        displayRegionInfo(clickedId);
    });
});

// --- Feature 2: Smart Search Logic ---
searchInput.addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Clear search if empty
    if (searchTerm === "") return;

    // Loop through the data to find a matching province
    for (const regionId in regionData) {
        const provincesArray = regionData[regionId].provinces.toLowerCase();
        
        // If the typed text is found inside the region's province list
        if (provincesArray.includes(searchTerm)) {
            displayRegionInfo(regionId);
            
            // Optional: Visually highlight the SVG group
            // Removes highlight from all groups first
            mapRegions.forEach(g => g.classList.remove('highlighted-region'));
            // Adds highlight to the matched group
            document.getElementById(regionId).classList.add('highlighted-region');
            
            break; // Stop looping once we find a match
        }
    }
});

// --- Helper Function: Update the HTML Panel ---
function displayRegionInfo(regionId) {
    const data = regionData[regionId];

    if (data) {
        infoPanel.innerHTML = `
            <h2 class="text-primary mb-3">${data.name}</h2>
            <p><strong>Regional Center:</strong> ${data.center}</p>
            <p><strong>Provinces:</strong> ${data.provinces}</p>
            <p class="mt-3">${data.description}</p>
        `;
    } else {
        infoPanel.innerHTML = `
            <h2 class="text-danger mb-3">Data Missing</h2>
            <p>Information for this region has not been added to the database yet.</p>
        `;
    }
}