alert('Welcome to the Soil Nutrient Prediction Tool! Please fill in the details below to get personalized recommendations for your crop and soil type.');
let nutrientChart = null;
const cropsByState = {
    punjab: ["Wheat", "Rice", "Cotton", "Maize", "Sugarcane"],
    haryana: ["Wheat", "Rice", "Cotton", "Sugarcane", "Mustard"],
    rajasthan: ["Millet", "Pulses", "Maize", "Cotton", "Oilseeds"],
    madhyaPradesh: ["Soybean", "Wheat", "Pulses", "Cotton", "Rice"],
    maharashtra: ["Cotton", "Jowar", "Sugarcane", "Soybean", "Rice"],
    karnataka: ["Rice", "Ragi", "Jowar", "Cotton", "Sugarcane"],
    andhraPradesh: ["Rice", "Cotton", "Chillies", "Sugarcane", "Groundnut"],
    tamilNadu: ["Rice", "Sugarcane", "Banana", "Coconut", "Cotton"],
    kerala: ["Coconut", "Rice", "Rubber", "Spices", "Banana"],
    westBengal: ["Rice", "Jute", "Potatoes", "Tea", "Vegetables"],
    uttarPradesh: ["Wheat", "Sugarcane", "Rice", "Potato", "Pulses"],
    gujarat: ["Cotton", "Groundnut", "Wheat", "Rice", "Bajra"]
};

// Regional agricultural practices information
const regionalInfo = {
    punjab: {
        description: "Punjab is known for its intensive agriculture with wheat-rice crop rotation. The region has fertile alluvial soil and extensive irrigation networks.",
        crops: ["Wheat", "Rice", "Cotton", "Maize", "Sugarcane"],
        practices: [
            "Mechanized farming is widely practiced",
            "Extensive use of canal and tube well irrigation",
            "Crop residue management is a focus area to reduce stubble burning",
            "Modern agricultural practices and high input use"
        ]
    },
    haryana: {
        description: "Haryana has fertile soil and good irrigation facilities. It follows intensive cultivation practices similar to Punjab.",
        crops: ["Wheat", "Rice", "Cotton", "Sugarcane", "Mustard"],
        practices: [
            "Progressive farming techniques with high mechanization",
            "Conservation agriculture is being adopted",
            "Water-saving technologies like sprinkler irrigation",
            "Diversification towards horticulture and vegetables"
        ]
    },
    rajasthan: {
        description: "Rajasthan has diverse agricultural zones with arid and semi-arid conditions. Drought-resistant crops are popular in many parts.",
        crops: ["Millet", "Pulses", "Maize", "Cotton", "Oilseeds"],
        practices: [
            "Dryland farming techniques",
            "Water conservation methods like khadins",
            "Traditional rainwater harvesting systems",
            "Drought-resistant crop varieties are preferred"
        ]
    },
    madhyaPradesh: {
        description: "Madhya Pradesh is a major producer of soybeans and pulses. The state has diverse agricultural conditions.",
        crops: ["Soybean", "Wheat", "Pulses", "Cotton", "Rice"],
        practices: [
            "Organic farming is gaining popularity",
            "Soil and water conservation practices",
            "Integrated farming systems",
            "Promotion of natural farming methods"
        ]
    },
    maharashtra: {
        description: "Maharashtra has varied agricultural zones with rain-fed agriculture in many parts. Drought management is a key focus.",
        crops: ["Cotton", "Jowar", "Sugarcane", "Soybean", "Rice"],
        practices: [
            "Watershed development programs",
            "Drip irrigation in sugarcane cultivation",
            "Farm ponds for water conservation",
            "Climate-resilient agricultural practices"
        ]
    },
    karnataka: {
        description: "Karnataka has diverse agro-climatic zones ranging from coastal to arid regions. Both food and commercial crops are important.",
        crops: ["Rice", "Ragi", "Jowar", "Cotton", "Sugarcane"],
        practices: [
            "Integrated farming with horticulture and livestock",
            "Traditional millet cultivation in dry zones",
            "Precision farming in progressive areas",
            "Organic farming practices in certain regions"
        ]
    },
    andhraPradesh: {
        description: "Andhra Pradesh is known for rice cultivation and commercial crops. It has progressive agricultural practices.",
        crops: ["Rice", "Cotton", "Chillies", "Sugarcane", "Groundnut"],
        practices: [
            "System of Rice Intensification (SRI)",
            "Poly cropping and intercropping",
            "Micro-irrigation systems",
            "Zero budget natural farming initiatives"
        ]
    },
    tamilNadu: {
        description: "Tamil Nadu has diverse farming systems from delta regions to rainfed areas. Water management is crucial.",
        crops: ["Rice", "Sugarcane", "Banana", "Coconut", "Cotton"],
        practices: [
            "Tank irrigation systems",
            "Integrated pest management",
            "Precision farming techniques",
            "Traditional water conservation methods"
        ]
    },
    kerala: {
        description: "Kerala specializes in plantation crops and spices. The state follows many sustainable agricultural practices.",
        crops: ["Coconut", "Rice", "Rubber", "Spices", "Banana"],
        practices: [
            "Mixed and multi-tier cropping systems",
            "Organic farming for spices and vegetables",
            "Homestead farming traditions",
            "Agroforestry systems"
        ]
    },
    westBengal: {
        description: "West Bengal has fertile soil with abundant water resources. Rice is the main crop with multiple growing seasons.",
        crops: ["Rice", "Jute", "Potatoes", "Tea", "Vegetables"],
        practices: [
            "Multi-cropping systems",
            "Fish-paddy integrated farming",
            "Organic tea cultivation in northern regions",
            "Traditional rice cultivation methods"
        ]
    },
    uttarPradesh: {
        description: "Uttar Pradesh is a major agricultural state with diverse crops. The western region is more productive with better irrigation.",
        crops: ["Wheat", "Sugarcane", "Rice", "Potato", "Pulses"],
        practices: [
            "Crop rotation systems",
            "Sugarcane intercropping",
            "Canal irrigation networks",
            "Integration of livestock with farming"
        ]
    },
    gujarat: {
        description: "Gujarat has varied agricultural conditions from arid to coastal. Water management is crucial in many regions.",
        crops: ["Cotton", "Groundnut", "Wheat", "Rice", "Bajra"],
        practices: [
            "Micro-irrigation techniques",
            "Soil and water conservation",
            "Organic cotton cultivation in some areas",
            "Community-managed irrigation systems"
        ]
    }
};

// Nutrient requirements by crop (N-P-K and micronutrients)
const cropNutrientRequirements = {
    "Wheat": {
        nitrogen: 120,
        phosphorus: 60,
        potassium: 40,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Rice": {
        nitrogen: 100,
        phosphorus: 50,
        potassium: 50,
        sulfur: 20,
        zinc: 5,
        iron: 10
    },
    "Cotton": {
        nitrogen: 150,
        phosphorus: 60,
        potassium: 60,
        sulfur: 30,
        zinc: 5,
        iron: 10
    },
    "Maize": {
        nitrogen: 120,
        phosphorus: 60,
        potassium: 40,
        sulfur: 20,
        zinc: 10,
        iron: 5
    },
    "Sugarcane": {
        nitrogen: 250,
        phosphorus: 100,
        potassium: 120,
        sulfur: 50,
        zinc: 10,
        iron: 10
    },
    "Millet": {
        nitrogen: 60,
        phosphorus: 30,
        potassium: 20,
        sulfur: 15,
        zinc: 5,
        iron: 5
    },
    "Pulses": {
        nitrogen: 20,
        phosphorus: 50,
        potassium: 20,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Oilseeds": {
        nitrogen: 80,
        phosphorus: 40,
        potassium: 30,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Groundnut": {
        nitrogen: 30,
        phosphorus: 60,
        potassium: 30,
        sulfur: 20,
        zinc: 5,
        iron: 10
    },
    "Soybean": {
        nitrogen: 30,
        phosphorus: 60,
        potassium: 40,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Jowar": {
        nitrogen: 80,
        phosphorus: 40,
        potassium: 40,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Ragi": {
        nitrogen: 60,
        phosphorus: 30,
        potassium: 30,
        sulfur: 10,
        zinc: 5,
        iron: 5
    },
    "Chillies": {
        nitrogen: 120,
        phosphorus: 60,
        potassium: 120,
        sulfur: 20,
        zinc: 10,
        iron: 10
    },
    "Banana": {
        nitrogen: 200,
        phosphorus: 80,
        potassium: 300,
        sulfur: 50,
        zinc: 10,
        iron: 10
    },
    "Coconut": {
        nitrogen: 500,
        phosphorus: 320,
        potassium: 1200,
        sulfur: 100,
        zinc: 10,
        iron: 10
    },
    "Rubber": {
        nitrogen: 60,
        phosphorus: 40,
        potassium: 40,
        sulfur: 10,
        zinc: 5,
        iron: 5
    },
    "Spices": {
        nitrogen: 100,
        phosphorus: 50,
        potassium: 100,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Jute": {
        nitrogen: 60,
        phosphorus: 30,
        potassium: 30,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Potatoes": {
        nitrogen: 180,
        phosphorus: 100,
        potassium: 150,
        sulfur: 20,
        zinc: 5,
        iron: 5
    },
    "Tea": {
        nitrogen: 140,
        phosphorus: 30,
        potassium: 140,
        sulfur: 20,
        zinc: 5,
        iron: 10
    },
    "Vegetables": {
        nitrogen: 120,
        phosphorus: 60,
        potassium: 60,
        sulfur: 20,
        zinc: 10,
        iron: 10
    },
    "Mustard": {
        nitrogen: 80,
        phosphorus: 40,
        potassium: 40,
        sulfur: 40,
        zinc: 5,
        iron: 5
    },
    "Bajra": {
        nitrogen: 60,
        phosphorus: 30,
        potassium: 20,
        sulfur: 15,
        zinc: 5,
        iron: 5
    }
};

// Soil type characteristics
const soilTypeCharacteristics = {
    loamy: {
        description: "Loamy soil has good water retention and drainage, with balanced nutrients and excellent for most crops.",
        nutrientRetention: 0.85,
        waterHolding: 0.8,
        adjustments: {
            nitrogen: 1.0,
            phosphorus: 1.0,
            potassium: 1.0
        }
    },
    sandy: {
        description: "Sandy soil has poor water retention, good drainage, low nutrient content, and requires more frequent fertilization.",
        nutrientRetention: 0.5,
        waterHolding: 0.4,
        adjustments: {
            nitrogen: 1.3,
            phosphorus: 1.2,
            potassium: 1.2
        }
    },
    clay: {
        description: "Clay soil has excellent water retention, poor drainage, high nutrient content, but can become waterlogged.",
        nutrientRetention: 0.9,
        waterHolding: 0.9,
        adjustments: {
            nitrogen: 0.8,
            phosphorus: 1.1,
            potassium: 0.9
        }
    },
    black: {
        description: "Black soil (Regur) is rich in calcium, magnesium and iron, with good water retention and best for cotton cultivation.",
        nutrientRetention: 0.9,
        waterHolding: 0.85,
        adjustments: {
            nitrogen: 0.9,
            phosphorus: 0.9,
            potassium: 1.1
        }
    },
    red: {
        description: "Red soil is low in nutrients, medium water holding capacity, and requires proper fertilization and irrigation.",
        nutrientRetention: 0.6,
        waterHolding: 0.6,
        adjustments: {
            nitrogen: 1.2,
            phosphorus: 1.2,
            potassium: 1.1
        }
    },
    alluvial: {
        description: "Alluvial soil is very fertile, with good water retention and drainage, and suitable for most crops.",
        nutrientRetention: 0.8,
        waterHolding: 0.75,
        adjustments: {
            nitrogen: 0.9,
            phosphorus: 0.95,
            potassium: 0.95
        }
    }
};

// Function to update crop options based on selected state
function updateCropOptions() {
    const stateSelect = document.getElementById('state');
    const cropSelect = document.getElementById('cropType');
    const selectedState = stateSelect.value;

    // Clear existing options
    cropSelect.innerHTML = '<option value="">Select Crop</option>';

    // Add new options based on selected state
    if (selectedState && cropsByState[selectedState]) {
        cropsByState[selectedState].forEach(crop => {
            const option = document.createElement('option');
            option.value = crop.toLowerCase();
            option.textContent = crop;
            cropSelect.appendChild(option);
        });
    }

    // Update regional information
    updateRegionalInfo(selectedState);
}

// Function to update regional information section
function updateRegionalInfo(state) {
    const regionalInfoDiv = document.getElementById('regionalInfo');

    if (state && regionalInfo[state]) {
        const info = regionalInfo[state];
        let html = `
            <h3>Agricultural Practices in ${state.charAt(0).toUpperCase() + state.slice(1)}</h3>
            <p>${info.description}</p>
            
            <h3>Major Crops</h3>
            <div class="region-crop-list">
        `;

        info.crops.forEach(crop => {
            html += `<span class="crop-tag"><i class="fas fa-seedling"></i> ${crop}</span>`;
        });

        html += `</div>
            <h3>Common Practices</h3>
            <ul>
        `;

        info.practices.forEach(practice => {
            html += `<li>${practice}</li>`;
        });

        html += `</ul>`;
        regionalInfoDiv.innerHTML = html;
    } else {
        regionalInfoDiv.innerHTML = `<p>Please select a state to see regional agricultural practices and recommendations.</p>`;
    }
}

// Function to calculate soil health score and recommendations
function calculatePrediction() {
    // Get form values
    const state = document.getElementById('state').value;
    const soilType = document.getElementById('soilType').value;
    const cropType = document.getElementById('cropType').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const organicMatter = parseFloat(document.getElementById('organicMatter').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);

    // Validate inputs
    if (!state || !soilType || !cropType || isNaN(temperature) || isNaN(organicMatter) || isNaN(rainfall)) {
        alert('Please fill in all the fields with valid values.');
        return;
    }

    // Get the proper crop name with correct capitalization
    const cropName = document.getElementById('cropType').options[document.getElementById('cropType').selectedIndex].text;

    // Calculate soil health score (0-100)
    const soilScore = calculateSoilHealthScore(soilType, organicMatter, temperature, rainfall);

    // Get base nutrient requirements for the selected crop
    const baseNutrients = cropNutrientRequirements[cropName];
    if (!baseNutrients) {
        alert('Nutrient data not available for the selected crop.');
        return;
    }

    // Adjust nutrients based on soil type and environmental factors
    const adjustedNutrients = calculateAdjustedNutrients(baseNutrients, soilType, temperature, rainfall, organicMatter);

    // Update chart
    updateNutrientChart(adjustedNutrients);

    // Update soil health score meter
    updateScoreMeter(soilScore);

    // Generate and display recommendations
    generateRecommendations(cropName, soilType, adjustedNutrients, soilScore, temperature, rainfall, organicMatter, state);
}

// Calculate soil health score based on inputs
function calculateSoilHealthScore(soilType, organicMatter, temperature, rainfall) {
    // Get soil characteristics
    const soilChar = soilTypeCharacteristics[soilType];

    // Base score calculation
    let score = 50;

    // Adjust for organic matter (0-10% scale)
    if (organicMatter < 0.5) {
        score -= 20;
    } else if (organicMatter < 1.5) {
        score -= 10;
    } else if (organicMatter > 3 && organicMatter <= 5) {
        score += 15;
    } else if (organicMatter > 5) {
        score += 20;
    }

    // Adjust for temperature (optimal range 20-30°C for most Indian crops)
    if (temperature < 15 || temperature > 40) {
        score -= 15;
    } else if (temperature < 20 || temperature > 35) {
        score -= 5;
    } else {
        score += 10;
    }

    // Adjust for rainfall (varies greatly by region in India)
    if (rainfall < 400) {
        score -= 20; // Very low rainfall
    } else if (rainfall < 700) {
        score -= 10; // Low rainfall
    } else if (rainfall > 1500 && rainfall <= 2500) {
        score += 5; // Good rainfall
    } else if (rainfall > 2500) {
        score -= 5; // Excessive rainfall may cause issues
    }

    // Adjust for soil type characteristics
    score += (soilChar.nutrientRetention * 10);
    score += (soilChar.waterHolding * 10);

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
}

// Calculate adjusted nutrients based on soil and environmental factors
function calculateAdjustedNutrients(baseNutrients, soilType, temperature, rainfall, organicMatter) {
    const soilChar = soilTypeCharacteristics[soilType];
    const adjustedNutrients = {};

    // Apply soil-specific adjustments
    for (const nutrient in baseNutrients) {
        let adjustmentFactor = 1.0;

        // Apply soil type adjustment if available
        if (soilChar.adjustments[nutrient]) {
            adjustmentFactor *= soilChar.adjustments[nutrient];
        }

        // Adjust based on organic matter
        if (organicMatter > 3) {
            // High organic matter reduces need for nitrogen
            if (nutrient === 'nitrogen') {
                adjustmentFactor *= 0.85;
            }
        } else if (organicMatter < 1) {
            // Low organic matter increases need for most nutrients
            adjustmentFactor *= 1.15;
        }

        // Temperature and rainfall adjustments
        if (temperature > 35 || temperature < 15) {
            // Extreme temperatures affect nutrient uptake
            adjustmentFactor *= 1.1;
        }

        if (rainfall > 2000) {
            // High rainfall may cause leaching of nutrients
            adjustmentFactor *= 1.15;
        } else if (rainfall < 500) {
            // Low rainfall may reduce nutrient availability
            adjustmentFactor *= 1.05;
        }

        // Calculate final value
        adjustedNutrients[nutrient] = Math.round(baseNutrients[nutrient] * adjustmentFactor);
    }

    return adjustedNutrients;
}

// Update the nutrient chart with calculated values
function updateNutrientChart(nutrients) {
    const ctx = document.getElementById('nutrientChart').getContext('2d');

    // Destroy previous chart if it exists
    if (nutrientChart) {
        nutrientChart.destroy();
    }

    // Prepare data for chart
    const labels = Object.keys(nutrients).map(key => {
        // Convert first character to uppercase and add rest of the string
        return key.charAt(0).toUpperCase() + key.slice(1);
    });

    const data = Object.values(nutrients);

    // Define chart colors
    const backgroundColors = [
        'rgba(58, 158, 95, 0.7)',   // Primary green
        'rgba(76, 175, 80, 0.7)',   // Secondary green
        'rgba(106, 191, 105, 0.7)', // Light green
        'rgba(141, 210, 144, 0.7)', // Lighter green
        'rgba(190, 235, 170, 0.7)', // Very light green
        'rgba(230, 243, 242, 0.7)'  // Almost white green
    ];

    // Create new chart
    nutrientChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Required Nutrients (kg/ha)',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kg per hectare'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw} kg/ha`;
                        }
                    }
                }
            }
        }
    });
}

// Update the soil health score meter
function updateScoreMeter(score) {
    const meterFill = document.querySelector('.meter-fill');
    const scoreValue = document.getElementById('scoreValue');

    // Animate the meter fill
    meterFill.style.width = `${score}%`;

    // Update the score text
    scoreValue.textContent = `${score}/100`;

    // Change color based on score
    if (score < 40) {
        meterFill.style.background = 'linear-gradient(135deg, #e53935 0%, #ef5350 100%)';
        scoreValue.style.color = '#e53935';
    } else if (score < 70) {
        meterFill.style.background = 'linear-gradient(135deg, #ff9800 0%, #ffa726 100%)';
        scoreValue.style.color = '#ff9800';
    } else {
        meterFill.style.background = 'linear-gradient(135deg, #3a9e5f 0%, #4caf50 100%)';
        scoreValue.style.color = '#3a9e5f';
    }
}

// Generate recommendations based on all factors
function generateRecommendations(cropName, soilType, adjustedNutrients, soilScore, temperature, rainfall, organicMatter, state) {
    const recommendationDiv = document.getElementById('recommendationDetails');
    const soilInfo = soilTypeCharacteristics[soilType];

    // Calculate fertilizer recommendations
    const ureaAmount = Math.round(adjustedNutrients.nitrogen * 2.17); // Convert N to Urea
    const sspAmount = Math.round(adjustedNutrients.phosphorus * 6.25); // Convert P to Single Super Phosphate
    const murateOfPotash = Math.round(adjustedNutrients.potassium * 1.67); // Convert K to Muriate of Potash

    // Determine fertilizer application schedule
    let applicationSchedule = '';
    if (cropName === 'Rice' || cropName === 'Wheat') {
        applicationSchedule = `
            <li><strong>Basal dose:</strong> Apply full dose of P and K, and 1/3rd of N at the time of sowing</li>
            <li><strong>First top dressing:</strong> Apply 1/3rd of N at tillering stage</li>
            <li><strong>Second top dressing:</strong> Apply remaining 1/3rd of N at panicle initiation stage</li>
        `;
    } else if (cropName === 'Cotton' || cropName === 'Sugarcane') {
        applicationSchedule = `
            <li><strong>Basal dose:</strong> Apply full dose of P and K, and 1/4th of N at the time of planting</li>
            <li><strong>First top dressing:</strong> Apply 1/4th of N after 30-40 days</li>
            <li><strong>Second top dressing:</strong> Apply 1/4th of N after 60-70 days</li>
            <li><strong>Third top dressing:</strong> Apply remaining 1/4th of N after 90-100 days</li>
        `;
    } else {
        applicationSchedule = `
            <li><strong>Basal dose:</strong> Apply full dose of P and K, and 1/2 of N at the time of sowing</li>
            <li><strong>Top dressing:</strong> Apply remaining N after 30-40 days of sowing</li>
        `;
    }

    // Irrigation recommendations based on rainfall and crop
    let irrigationRecommendation = '';
    if (rainfall < 500) {
        irrigationRecommendation = 'Regular irrigation is crucial. Consider drip irrigation to optimize water use.';
    } else if (rainfall < 1000) {
        irrigationRecommendation = 'Moderate irrigation based on soil moisture status is recommended.';
    } else {
        irrigationRecommendation = 'Ensure proper drainage during monsoon. Supplemental irrigation may be needed during dry spells.';
    }

    // Organic matter recommendations
    let organicRecommendation = '';
    if (organicMatter < 1) {
        organicRecommendation = 'Apply 10-15 tonnes of farmyard manure or compost per hectare to improve soil organic matter.';
    } else if (organicMatter < 2) {
        organicRecommendation = 'Apply 5-10 tonnes of farmyard manure or compost per hectare to maintain soil health.';
    } else {
        organicRecommendation = 'Continue with regular application of organic matter through crop residue management.';
    }

    // Soil amendment recommendations based on soil type
    let soilAmendmentRecommendation = '';
    switch (soilType) {
        case 'sandy':
            soilAmendmentRecommendation = 'Consider adding clay or organic matter to improve water and nutrient retention.';
            break;
        case 'clay':
            soilAmendmentRecommendation = 'Add organic matter and consider gypsum application to improve soil structure and drainage.';
            break;
        case 'red':
            soilAmendmentRecommendation = 'Apply lime if soil is acidic, along with organic matter to improve nutrient availability.';
            break;
        default:
            soilAmendmentRecommendation = 'Maintain soil health through regular organic matter application.';
    }

    // Generate HTML content for recommendations
    let html = `
        <h3>Fertilizer Recommendations for ${cropName}</h3>
        <p>Based on your soil type (${soilType}) and environmental conditions, here are the recommended nutrient applications:</p>
        
        <div class="nutrient-list">
            <li>
                <strong>Urea:</strong> ${ureaAmount} kg/ha
                <div class="recommendation-details">Source of Nitrogen (N) - essential for vegetative growth</div>
            </li>
            <li>
                <strong>Single Super Phosphate (SSP):</strong> ${sspAmount} kg/ha
                <div class="recommendation-details">Source of Phosphorus (P) - important for root development and flowering</div>
            </li>
            <li>
                <strong>Muriate of Potash (MOP):</strong> ${murateOfPotash} kg/ha
                <div class="recommendation-details">Source of Potassium (K) - enhances crop quality and disease resistance</div>
            </li>
            <li>
                <strong>Zinc Sulfate:</strong> ${Math.round(adjustedNutrients.zinc * 5)} kg/ha
                <div class="recommendation-details">Micronutrient important for enzymatic functions</div>
            </li>
            <li>
                <strong>Ferrous Sulfate:</strong> ${Math.round(adjustedNutrients.iron * 5)} kg/ha
                <div class="recommendation-details">Addresses iron deficiency, important for chlorophyll synthesis</div>
            </li>
        </div>
        
        <h3>Application Schedule</h3>
        <ul class="schedule-list">
            ${applicationSchedule}
        </ul>
        
        <h3>Additional Recommendations</h3>
        <ul>
            <li><strong>Soil Health:</strong> ${soilInfo.description}</li>
            <li><strong>Irrigation:</strong> ${irrigationRecommendation}</li>
            <li><strong>Organic Matter:</strong> ${organicRecommendation}</li>
            <li><strong>Soil Amendment:</strong> ${soilAmendmentRecommendation}</li>
        </ul>
        
        <h3>Crop-specific Advice for ${cropName}</h3>
        <p>${generateCropSpecificAdvice(cropName, temperature, rainfall, state)}</p>
    `;

    recommendationDiv.innerHTML = html;
}

// Generate crop-specific advice based on crop type and conditions
function generateCropSpecificAdvice(cropName, temperature, rainfall, state) {
    let advice = "";

    switch (cropName) {
        case "Rice":
            if (rainfall > 1500) {
                advice = "Consider using submergence-tolerant varieties. Ensure proper drainage to prevent waterlogging.";
            } else if (rainfall < 700) {
                advice = "Adopt water-saving technologies like SRI (System of Rice Intensification) or Alternate Wetting and Drying.";
            } else {
                advice = "Maintain proper water management. Use balanced fertilization and integrated pest management.";
            }

            if (state === "punjab" || state === "haryana") {
                advice += " Consider crop diversification to reduce pressure on groundwater.";
            }
            break;

        case "Wheat":
            if (temperature > 30) {
                advice = "Choose heat-tolerant varieties. Ensure timely sowing to avoid heat stress during grain filling.";
            } else if (temperature < 15) {
                advice = "Protect from frost damage by light irrigation during cold nights if feasible.";
            } else {
                advice = "Maintain timely sowing and balanced fertilization for optimal yields.";
            }
            break;

        case "Cotton":
            if (rainfall > 1200) {
                advice = "Ensure proper drainage. Consider raised bed planting and use appropriate plant protection measures.";
            } else if (rainfall < 600) {
                advice = "Use drip irrigation if possible. Apply mulching to conserve soil moisture.";
            } else {
                advice = "Follow recommended spacing and adopt integrated pest management practices.";
            }
            break;

        case "Maize":
            advice = "Ensure proper spacing and weed management. Apply balanced fertilization and timely irrigation.";
            if (rainfall < 700) {
                advice += " Consider drought-tolerant varieties.";
            }
            break;

        case "Sugarcane":
            advice = "Follow proper planting geometry. Adopt drip irrigation and trash mulching practices.";
            if (temperature > 35) {
                advice += " Provide irrigation during hot periods to prevent moisture stress.";
            }
            break;

        case "Pulses":
            advice = "Ensure proper Rhizobium inoculation. Avoid waterlogging and maintain proper plant protection.";
            if (rainfall > 1000) {
                advice += " Provide good drainage to prevent root rot diseases.";
            }
            break;

        default:
            advice = "Follow region-specific package of practices. Maintain balanced nutrition and proper water management.";
    }

    return advice;
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set default state to empty
    document.getElementById('state').value = "";

    // Update crop options
    updateCropOptions();

    // Initialize chart with empty data
    const ctx = document.getElementById('nutrientChart').getContext('2d');
    nutrientChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["N", "P", "K", "S", "Zn", "Fe"],
            datasets: [{
                label: 'Required Nutrients (kg/ha)',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(58, 158, 95, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(106, 191, 105, 0.7)',
                    'rgba(141, 210, 144, 0.7)',
                    'rgba(190, 235, 170, 0.7)',
                    'rgba(230, 243, 242, 0.7)'
                ],
                borderColor: [
                    'rgba(58, 158, 95, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(106, 191, 105, 1)',
                    'rgba(141, 210, 144, 1)',
                    'rgba(190, 235, 170, 1)',
                    'rgba(230, 243, 242, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kg per hectare'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});