// 1. The Database: An object holding our regional facts
const regionData = {
    "region-ncr": {
        name: "National Capital Region (NCR)",
        center: "Manila",
        provinces: ["Metro Manila (No provinces)"],
        description: "The capital region and economic hub of the Philippines."
    },
    "region-4a": {
        name: "CALABARZON (Region IV-A)",
        center: "Calamba",
        provinces: ["Cavite", "Laguna", "Batangas", "Rizal", "Quezon"],
        description: "Located in southern Luzon, known for its booming industrial zones, historical sites, and natural attractions."
    }
};

// 2. Select the HTML elements we need to manipulate
const mapRegions = document.querySelectorAll('#ph-map path');
const infoPanel = document.getElementById('info-panel');

// 3. Loop through every path (region) on the map
mapRegions.forEach(region => {
    
    // Add a click listener to each one
    region.addEventListener('click', function() {
        
        // Get the ID of the path that was just clicked (e.g., "region-4a")
        const clickedId = this.getAttribute('id');
        
        // Find the matching data in our regionData object
        const data = regionData[clickedId];

        // 4. If data exists, update the Info Panel HTML
        if (data) {
            infoPanel.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Regional Center:</strong> ${data.center}</p>
                <p><strong>Provinces:</strong> ${data.provinces.join(', ')}</p>
                <p>${data.description}</p>
            `;
        } else {
            // Fallback just in case a region doesn't have data yet
            infoPanel.innerHTML = `<h2>Data not available</h2><p>Check back later!</p>`;
        }
    });
});