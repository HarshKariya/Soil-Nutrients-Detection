function calculatePrediction() {
    const landCover = document.getElementById('landCover').value;
    const soilType = document.getElementById('soilType').value;
    const cropType = document.getElementById('cropType').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const organicMatter = parseFloat(document.getElementById('organicMatter').value);

    // Check if inputs are valid
    if (isNaN(temperature) || isNaN(organicMatter)) {
        alert("Please enter valid numbers for temperature and organic matter.");
        return;
    }

    // Example logic for nutrient levels based on input
    let nutrientRecommendation = '';
    let nitrogen = 0;
    let phosphorus = 0;
    let potassium = 0;

    // Set nutrient levels based on combination of inputs
    if (landCover === 'agriculturalLand') {
        if (soilType === 'loamy') {
            if (cropType === 'wheat') {
                nitrogen = 12;
                phosphorus = 10;
                potassium = 15;
                nutrientRecommendation = 'Nitrogen: 12 g/kg, Phosphorus: 10 g/kg, Potassium: 15 g/kg';
            } else if (cropType === 'corn') {
                nitrogen = 20;
                phosphorus = 15;
                potassium = 22;
                nutrientRecommendation = 'Nitrogen: 20 g/kg, Phosphorus: 15 g/kg, Potassium: 22 g/kg';
            } else if (cropType === 'rice') {
                nitrogen = 18;
                phosphorus = 12;
                potassium = 18;
                nutrientRecommendation = 'Nitrogen: 18 g/kg, Phosphorus: 12 g/kg, Potassium: 18 g/kg';
            } else if (cropType === 'soybean') {
                nitrogen = 10;
                phosphorus = 18;
                potassium = 20;
                nutrientRecommendation = 'Nitrogen: 10 g/kg, Phosphorus: 18 g/kg, Potassium: 20 g/kg';
            } else if (cropType === 'barley') {
                nitrogen = 14;
                phosphorus = 12;
                potassium = 16;
                nutrientRecommendation = 'Nitrogen: 14 g/kg, Phosphorus: 12 g/kg, Potassium: 16 g/kg';
            }
        } else if (soilType === 'sandy') {
            if (cropType === 'wheat') {
                nitrogen = 15;
                phosphorus = 12;
                potassium = 18;
                nutrientRecommendation = 'Nitrogen: 15 g/kg, Phosphorus: 12 g/kg, Potassium: 18 g/kg';
            } else if (cropType === 'corn') {
                nitrogen = 24;
                phosphorus = 18;
                potassium = 25;
                nutrientRecommendation = 'Nitrogen: 24 g/kg, Phosphorus: 18 g/kg, Potassium: 25 g/kg';
            } else {
                nitrogen = 16;
                phosphorus = 14;
                potassium = 18;
                nutrientRecommendation = 'Nitrogen: 16 g/kg, Phosphorus: 14 g/kg, Potassium: 18 g/kg';
            }
        } else if (soilType === 'clay') {
            if (cropType === 'wheat') {
                nitrogen = 10;
                phosphorus = 14;
                potassium = 12;
                nutrientRecommendation = 'Nitrogen: 10 g/kg, Phosphorus: 14 g/kg, Potassium: 12 g/kg';
            } else if (cropType === 'corn') {
                nitrogen = 18;
                phosphorus = 20;
                potassium = 18;
                nutrientRecommendation = 'Nitrogen: 18 g/kg, Phosphorus: 20 g/kg, Potassium: 18 g/kg';
            } else {
                nitrogen = 14;
                phosphorus = 16;
                potassium = 14;
                nutrientRecommendation = 'Nitrogen: 14 g/kg, Phosphorus: 16 g/kg, Potassium: 14 g/kg';
            }
        }
    } else if (landCover === 'forest') {
        if (soilType === 'sandy') {
            nitrogen = 8;
            phosphorus = 6;
            potassium = 10;
            nutrientRecommendation = 'Nitrogen: 8 g/kg, Phosphorus: 6 g/kg, Potassium: 10 g/kg';
        } else if (soilType === 'loamy') {
            nitrogen = 6;
            phosphorus = 5;
            potassium = 8;
            nutrientRecommendation = 'Nitrogen: 6 g/kg, Phosphorus: 5 g/kg, Potassium: 8 g/kg';
        } else if (soilType === 'clay') {
            nitrogen = 5;
            phosphorus = 7;
            potassium = 6;
            nutrientRecommendation = 'Nitrogen: 5 g/kg, Phosphorus: 7 g/kg, Potassium: 6 g/kg';
        }
    } else if (landCover === 'grassland') {
        if (soilType === 'sandy') {
            nitrogen = 10;
            phosphorus = 8;
            potassium = 12;
            nutrientRecommendation = 'Nitrogen: 10 g/kg, Phosphorus: 8 g/kg, Potassium: 12 g/kg';
        } else if (soilType === 'loamy') {
            nitrogen = 8;
            phosphorus = 7;
            potassium = 10;
            nutrientRecommendation = 'Nitrogen: 8 g/kg, Phosphorus: 7 g/kg, Potassium: 10 g/kg';
        } else if (soilType === 'clay') {
            nitrogen = 7;
            phosphorus = 9;
            potassium = 8;
            nutrientRecommendation = 'Nitrogen: 7 g/kg, Phosphorus: 9 g/kg, Potassium: 8 g/kg';
        }
    } else if (landCover === 'desert') {
        if (soilType === 'sandy') {
            nitrogen = 5;
            phosphorus = 3;
            potassium = 4;
            nutrientRecommendation = 'Nitrogen: 5 g/kg, Phosphorus: 3 g/kg, Potassium: 4 g/kg';
        } else if (soilType === 'loamy') {
            nitrogen = 4;
            phosphorus = 4;
            potassium = 5;
            nutrientRecommendation = 'Nitrogen: 4 g/kg, Phosphorus: 4 g/kg, Potassium: 5 g/kg';
        } else if (soilType === 'clay') {
            nitrogen = 3;
            phosphorus = 5;
            potassium = 3;
            nutrientRecommendation = 'Nitrogen: 3 g/kg, Phosphorus: 5 g/kg, Potassium: 3 g/kg';
        }
    } else {
        nutrientRecommendation = 'Further analysis needed for this combination of land use and soil type.';
        nitrogen = 10;
        phosphorus = 8;
        potassium = 12;
    }

    // Adjust recommendations based on temperature
    if (temperature < 10) {
        nitrogen *= 0.9;
        phosphorus *= 0.95;
        potassium *= 0.9;
        nutrientRecommendation += ' (Reduced for cold conditions)';
    } else if (temperature > 30) {
        nitrogen *= 1.1;
        phosphorus *= 1.05;
        potassium *= 1.1;
        nutrientRecommendation += ' (Increased for hot conditions)';
    }

    // Adjust recommendations based on organic matter
    if (organicMatter < 2) {
        nitrogen *= 1.15;
        phosphorus *= 1.1;
        potassium *= 1.05;
        nutrientRecommendation += ' (Adjusted for low organic matter)';
    } else if (organicMatter > 5) {
        nitrogen *= 0.9;
        phosphorus *= 0.95;
        potassium *= 1.0;
        nutrientRecommendation += ' (Adjusted for high organic matter)';
    }

    // Round the nutrient values for display
    nitrogen = Math.round(nitrogen * 10) / 10;
    phosphorus = Math.round(phosphorus * 10) / 10;
    potassium = Math.round(potassium * 10) / 10;

    // Display the prediction result
    document.getElementById('predictionResult').innerHTML = `<strong>Nutrient Recommendation:</strong> ${nutrientRecommendation}`;

    // Generate the chart with the predicted nutrients
    generateChart(nitrogen, phosphorus, potassium);

    // Display detailed recommendation based on crop type and soil
    const recommendationDetails = getDetailedRecommendation(landCover, soilType, cropType, temperature, organicMatter);
    document.getElementById('recommendationDetails').innerHTML = recommendationDetails;
}

function generateChart(nitrogen, phosphorus, potassium) {
    const ctx = document.getElementById('nutrientChart').getContext('2d');

    // Check if there's an existing chart and destroy it
    if (window.nutrientChartInstance) {
        window.nutrientChartInstance.destroy();
    }

    // Creating the bar chart
    window.nutrientChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
            datasets: [{
                label: 'Nutrient Levels (g/kg)',
                data: [nitrogen, phosphorus, potassium],
                backgroundColor: ['#2e8b57', '#ffcc00', '#d2691e'],
                borderColor: ['#2e8b57', '#ffcc00', '#d2691e'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 25 // Maximum value for the nutrient chart
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw} g/kg`;
                        }
                    }
                }
            }
        }
    });
}

function getDetailedRecommendation(landCover, soilType, cropType, temperature, organicMatter) {
    let recommendations = '';

    if (landCover === 'agriculturalLand') {
        if (soilType === 'loamy') {
            if (cropType === 'wheat') {
                recommendations = `
                    <ul>
                        <li><strong>Nitrogen:</strong> Apply 12 g/kg of nitrogen using urea or ammonium nitrate.</li>
                        <li><strong>Phosphorus:</strong> Apply 10 g/kg of phosphorus using superphosphate or DAP.</li>
                        <li><strong>Potassium:</strong> Apply 15 g/kg of potassium using potash-based fertilizers.</li>
                        <li><strong>Organic Matter:</strong> Increase organic matter by adding compost or well-rotted manure.</li>
                        <li><strong>Irrigation:</strong> Ensure moderate water levels throughout the growing season.</li>
                        <li><strong>Soil pH:</strong> Ideal pH for wheat is between 6.0-7.0. Consider adding lime if pH is low.</li>
                    </ul>
                `;
            } else if (cropType === 'corn') {
                recommendations = `
                    <ul>
                        <li><strong>Nitrogen:</strong> Apply 20 g/kg of nitrogen, split applications during the growing season.</li>
                        <li><strong>Phosphorus:</strong> Apply 15 g/kg of phosphorus to promote root and kernel growth.</li>
                        <li><strong>Potassium:</strong> Apply 22 g/kg of potassium to improve drought resistance.</li>
                        <li><strong>Organic Matter:</strong> Clay-based organic matter amendments are recommended.</li>
                        <li><strong>Irrigation:</strong> Ensure consistent moisture, especially during pollination.</li>
                        <li><strong>Soil pH:</strong> Corn grows best at pH 5.8-7.0, adjust pH with sulfur or lime if needed.</li>
                    </ul>
                `;
            } else if (cropType === 'rice') {
                recommendations = `
                    <ul>
                        <li><strong>Nitrogen:</strong> Apply 18 g/kg of nitrogen with split applications.</li>
                        <li><strong>Phosphorus:</strong> Apply 12 g/kg of phosphorus before planting.</li>
                        <li><strong>Potassium:</strong> Apply 18 g/kg of potassium to improve grain quality.</li>
                        <li><strong>Water Management:</strong> Maintain proper water levels during growing stages.</li>
                        <li><strong>Soil pH:</strong> Rice prefers slightly acidic to neutral pH (5.5-6.5).</li>
                        <li><strong>Micronutrients:</strong> Consider zinc supplements for better yields.</li>
                    </ul>
                `;
            } else if (cropType === 'soybean') {
                recommendations = `
                    <ul>
                        <li><strong>Nitrogen:</strong> Apply 10 g/kg of nitrogen as starter; soybeans fix their own nitrogen.</li>
                        <li><strong>Phosphorus:</strong> Apply 18 g/kg of phosphorus for pod development.</li>
                        <li><strong>Potassium:</strong> Apply 20 g/kg of potassium for disease resistance.</li>
                        <li><strong>Inoculation:</strong> Use appropriate rhizobium inoculant for nitrogen fixation.</li>
                        <li><strong>Soil pH:</strong> Maintain pH between 6.0-7.0 for optimal nodulation.</li>
                        <li><strong>Micronutrients:</strong> Iron and manganese may be needed in high pH soils.</li>
                    </ul>
                `;
            } else if (cropType === 'barley') {
                recommendations = `
                    <ul>
                        <li><strong>Nitrogen:</strong> Apply 14 g/kg of nitrogen for good vegetative growth.</li>
                        <li><strong>Phosphorus:</strong> Apply 12 g/kg of phosphorus for root development.</li>
                        <li><strong>Potassium:</strong> Apply 16 g/kg of potassium for stronger stems.</li>
                        <li><strong>Soil pH:</strong> Barley prefers slightly alkaline conditions (pH 6.5-8.0).</li>
                        <li><strong>Water Management:</strong> Ensure proper drainage; barley is sensitive to waterlogging.</li>
                        <li><strong>Organic Matter:</strong> Add organic matter to improve soil structure and fertility.</li>
                    </ul>
                `;
            } else {
                recommendations = `<p>Please contact a local agricultural extension for specific recommendations for ${cropType} in loamy soil.</p>`;
            }
        } else if (soilType === 'sandy') {
            recommendations = `
                <ul>
                    <li><strong>Water Management:</strong> Increase irrigation frequency as sandy soils drain quickly.</li>
                    <li><strong>Organic Matter:</strong> Add substantial amounts of organic matter to improve water retention.</li>
                    <li><strong>Fertilizer Application:</strong> Apply fertilizers in smaller, more frequent doses to prevent leaching.</li>
                    <li><strong>Cover Crops:</strong> Consider using cover crops to improve soil structure and prevent erosion.</li>
                    <li><strong>Mulching:</strong> Apply mulch to conserve moisture and reduce soil temperature.</li>
                </ul>
            `;
        } else if (soilType === 'clay') {
            recommendations = `
                <ul>
                    <li><strong>Drainage:</strong> Improve drainage to prevent waterlogging and root diseases.</li>
                    <li><strong>Soil Structure:</strong> Add gypsum to break up clay particles and improve structure.</li>
                    <li><strong>Tillage:</strong> Avoid working clay soil when wet to prevent compaction.</li>
                    <li><strong>Organic Matter:</strong> Incorporate organic matter to improve soil structure and drainage.</li>
                    <li><strong>Irrigation:</strong> Water less frequently but with more volume to encourage deep root growth.</li>
                </ul>
            `;
        }
    } else if (landCover === 'forest') {
        recommendations = `
            <ul>
                <li><strong>Nutrient Cycling:</strong> Maintain forest floor litter for natural nutrient cycling.</li>
                <li><strong>Avoid Over-harvesting:</strong> Maintain adequate tree cover to prevent soil erosion.</li>
                <li><strong>Native Species:</strong> Prioritize native species adapted to local soil conditions.</li>
                <li><strong>Invasive Control:</strong> Control invasive species that may alter soil nutrient balance.</li>
                <li><strong>Conservation:</strong> Implement sustainable forestry practices to preserve soil health.</li>
            </ul>
        `;
    } else if (landCover === 'grassland') {
        recommendations = `
            <ul>
                <li><strong>Grazing Management:</strong> Implement rotational grazing to prevent overgrazing.</li>
                <li><strong>Native Grasses:</strong> Use native grass species adapted to local soil conditions.</li>
                <li><strong>Avoid Soil Disturbance:</strong> Minimize tillage to maintain soil structure.</li>
                <li><strong>Diverse Species:</strong> Plant diverse grass and legume mixtures to improve soil health.</li>
                <li><strong>Fire Management:</strong> Consider controlled burns if appropriate for ecosystem management.</li>
            </ul>
        `;
    } else if (landCover === 'desert') {
        recommendations = `
            <ul>
                <li><strong>Water Conservation:</strong> Use water-efficient irrigation methods like drip irrigation.</li>
                <li><strong>Wind Protection:</strong> Establish windbreaks to prevent erosion.</li>
                <li><strong>Salt Management:</strong> Monitor and manage salt accumulation in soil.</li>
                <li><strong>Drought-Resistant Species:</strong> Use native, drought-resistant plants.</li>
                <li><strong>Soil Cover:</strong> Maintain soil cover to reduce evaporation and erosion.</li>
            </ul>
        `;
    }

    // Add temperature-specific recommendations
    if (temperature < 10) {
        recommendations += `
            <p><strong>Cold Temperature Considerations:</strong></p>
            <ul>
                <li>Delay fertilizer applications until soil warms up</li>
                <li>Consider using slow-release fertilizers</li>
                <li>Protect soil with mulch to moderate temperature</li>
            </ul>
        `;
    } else if (temperature > 30) {
        recommendations += `
            <p><strong>Hot Temperature Considerations:</strong></p>
            <ul>
                <li>Apply fertilizers during cooler parts of the day</li>
                <li>Increase irrigation to prevent nutrient loss</li>
                <li>Use mulch to keep soil temperature moderate</li>
            </ul>
        `;
    }

    // Add organic matter specific recommendations
    if (organicMatter < 2) {
        recommendations += `
            <p><strong>Low Organic Matter Recommendations:</strong></p>
            <ul>
                <li>Add compost or well-rotted manure to increase organic matter</li>
                <li>Consider green manure or cover crops</li>
                <li>Minimize tillage to preserve existing organic matter</li>
            </ul>
        `;
    } else if (organicMatter > 5) {
        recommendations += `
            <p><strong>High Organic Matter Considerations:</strong></p>
            <ul>
                <li>Reduce nitrogen applications to prevent excess growth</li>
                <li>Monitor soil pH as high organic matter can affect it</li>
                <li>Focus on maintaining rather than increasing organic matter</li>
            </ul>
        `;
    }

    return recommendations || `<p>No specific recommendations available for this combination. Please consult a local soil specialist.</p>`;
}

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Pre-generate chart with default values
    generateChart(0, 0, 0);
});