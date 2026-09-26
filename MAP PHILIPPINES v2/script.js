const regionData = {
    "region-ncr": {
        name: "National Capital Region (NCR)",
        center: "Manila",
        provinces: "Metro Manila",
        description: "The capital region and the center of culture, economy, and government in the Philippines."
    },
    "region-car": {
        name: "Cordillera Administrative Region (CAR)",
        center: "Baguio",
        provinces: "Abra, Apayao, Benguet, Ifugao, Kalinga, Mountain Province",
        description: "A landlocked region known for its mountainous terrain, indigenous cultures, and the famous Banaue Rice Terraces."
    },
    "region-1": {
        name: "Ilocos Region (Region I)",
        center: "San Fernando, La Union",
        provinces: "Ilocos Norte, Ilocos Sur, La Union, Pangasinan",
        description: "Known for its historical sites like Vigan, wind farms in Bangui, and the Hundred Islands National Park."
    },
    "region-2": {
        name: "Cagayan Valley (Region II)",
        center: "Tuguegarao",
        provinces: "Batanes, Cagayan, Isabela, Nueva Vizcaya, Quirino",
        description: "The second largest region, characterized by the vast Cagayan River and the rolling hills of Batanes."
    },
    "region-3": {
        name: "Central Luzon (Region III)",
        center: "San Fernando, Pampanga",
        provinces: "Aurora, Bataan, Bulacan, Nueva Ecija, Pampanga, Tarlac, Zambales",
        description: "Known as the Rice Granary of the Philippines, producing the largest portion of the country's rice supply."
    },
    "region-4a": {
        name: "CALABARZON (Region IV-A)",
        center: "Calamba, Laguna",
        provinces: "Batangas, Cavite, Laguna, Quezon, Rizal",
        description: "A booming industrial and agricultural region, home to historical sites, the Taal Volcano, and major educational hubs."
    },
    "region-4b": {
        name: "MIMAROPA (Region Southwestern Tagalog)",
        center: "Calapan",
        provinces: "Marinduque, Occidental Mindoro, Oriental Mindoro, Palawan, Romblon",
        description: "An archipelago region famous for Palawan's underground river, pristine beaches, and rich marine biodiversity."
    },
    "region-5": {
        name: "Bicol Region (Region V)",
        center: "Legazpi",
        provinces: "Albay, Camarines Norte, Camarines Sur, Catanduanes, Masbate, Sorsogon",
        description: "Home to the perfectly cone-shaped Mayon Volcano, spicy local cuisine, and whale shark interactions in Donsol."
    },
    "region-6": {
        name: "Western Visayas (Region VI)",
        center: "Iloilo City",
        provinces: "Aklan, Antique, Capiz, Guimaras, Iloilo",
        description: "Renowned for the white sands of Boracay, historical churches in Iloilo, and the sweet mangoes of Guimaras."
    },
    "region-nir": {
        name: "Negros Island Region (NIR)",
        center: "Bacolod & Dumaguete",
        provinces: "Negros Occidental, Negros Oriental, Siquijor",
        description: "The newly re-established region known as the Sugarbowl of the Philippines and famous for the mystic island of Siquijor."
    },
    "region-7": {
        name: "Central Visayas (Region VII)",
        center: "Cebu City",
        provinces: "Bohol, Cebu",
        description: "A major economic hub featuring the Chocolate Hills, tarsiers in Bohol, and Cebu's booming IT and tourism industries."
    },
    "region-8": {
        name: "Eastern Visayas (Region VIII)",
        center: "Tacloban",
        provinces: "Biliran, Eastern Samar, Leyte, Northern Samar, Samar, Southern Leyte",
        description: "Connected by the iconic San Juanico Bridge, this region is known for its resilient people and historical significance in WWII."
    },
    "region-9": {
        name: "Zamboanga Peninsula (Region IX)",
        center: "Pagadian",
        provinces: "Zamboanga del Norte, Zamboanga del Sur, Zamboanga Sibugay",
        description: "Characterized by its colorful vintas, rich Hispanic-influenced culture, and beautiful pink sand beaches."
    },
    "region-10": {
        name: "Northern Mindanao (Region X)",
        center: "Cagayan de Oro",
        provinces: "Bukidnon, Camiguin, Lanao del Norte, Misamis Occidental, Misamis Oriental",
        description: "The adventure capital featuring whitewater rafting in Cagayan de Oro and the cool, agricultural plateau of Bukidnon."
    },
    "region-11": {
        name: "Davao Region (Region XI)",
        center: "Davao City",
        provinces: "Davao de Oro, Davao del Norte, Davao del Sur, Davao Oriental, Davao Occidental",
        description: "Home to Mount Apo, the highest peak in the country, and the source of premium durian and pomelo."
    },
    "region-12": {
        name: "SOCCSKSARGEN (Region XII)",
        center: "Koronadal",
        provinces: "Cotabato, Sarangani, South Cotabato, Sultan Kudarat",
        description: "A major producer of tuna, pineapples, and other agricultural products, featuring Lake Sebu and the T'boli culture."
    },
    "region-13": {
        name: "Caraga (Region XIII)",
        center: "Butuan",
        provinces: "Agusan del Norte, Agusan del Sur, Dinagat Islands, Surigao del Norte, Surigao del Sur",
        description: "The surfing capital of the Philippines (Siargao) and a region rich in timber, minerals, and natural wonders."
    },
    "region-barmm": {
        name: "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
        center: "Cotabato City",
        provinces: "Basilan, Lanao del Sur, Maguindanao, Sulu, Tawi-Tawi",
        description: "A region with a distinct cultural heritage, autonomous governance, and incredible untapped beaches and lakes."
    }
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