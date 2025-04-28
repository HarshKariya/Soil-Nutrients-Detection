// Initialize the charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create an empty chart to begin with
    initializeChart();
});

// Set up an empty chart initially
function initializeChart() {
    const ctx = document.getElementById('nutrientChart').getContext('2d');
    window.nutrientChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Organic Matter', 'Other Nutrients'],
            datasets: [{
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    '#3a9e5f',  // Nitrogen - primary green
                    '#6abf69',  // Phosphorus - medium green
                    '#8dd290',  // Potassium - light green
                    '#beebaa',  // Organic Matter - very light green
                    '#e6f3f2'   // Other - pale green
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 12
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue || '';
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            cutout: '65%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

// Calculate and display recommendations based on input values
function calculatePrediction() {
    // Get input values
    const landCover = document.getElementById('landCover').value;
    const soilType = document.getElementById('soilType').value;
    const cropType = document.getElementById('cropType').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const organicMatter = parseFloat(document.getElementById('organicMatter').value);
    
    // Validate inputs
    if (isNaN(temperature) || isNaN(organicMatter)) {
        alert('Please enter valid numeric values for Temperature and Organic Matter.');
        return;
    }
    
    // Mock calculation based on inputs (in a real app, this would use actual algorithms)
    // These are simplified example calculations
    let nitrogenRec, phosphorusRec, potassiumRec;
    let soilHealthScore = 0;
    
    // Calculate nutrient recommendations based on crop type and soil parameters
    switch(cropType) {
        case 'wheat':
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 100, 150);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 30, 50);
            potassiumRec = calculatePotassium(soilType, organicMatter, 40, 60);
            break;
        case 'rice':
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 120, 180);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 40, 60);
            potassiumRec = calculatePotassium(soilType, organicMatter, 60, 90);
            break;
        case 'soybean':
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 30, 60);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 50, 70);
            potassiumRec = calculatePotassium(soilType, organicMatter, 70, 100);
            break;
        case 'barley':
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 80, 120);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 30, 45);
            potassiumRec = calculatePotassium(soilType, organicMatter, 35, 55);
            break;
        case 'corn':
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 150, 200);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 45, 65);
            potassiumRec = calculatePotassium(soilType, organicMatter, 55, 85);
            break;
        default:
            nitrogenRec = calculateNitrogen(soilType, organicMatter, 100, 150);
            phosphorusRec = calculatePhosphorus(soilType, organicMatter, 40, 60);
            potassiumRec = calculatePotassium(soilType, organicMatter, 50, 70);
    }
    
    // Calculate soil health score (simplified example)
    soilHealthScore = calculateSoilHealthScore(organicMatter, soilType, temperature);
    
    // Update the chart with new data
    updateNutrientChart(nitrogenRec, phosphorusRec, potassiumRec, organicMatter);
    
    // Update soil health score meter
    updateScoreMeter(soilHealthScore);
    
    // Update recommendations
    updateRecommendations(cropType, soilType, nitrogenRec, phosphorusRec, potassiumRec, organicMatter, temperature);
}

// Helper functions for calculations
function calculateNitrogen(soilType, organicMatter, minValue, maxValue) {
    let baseValue = 0;
    
    // Adjust base value by soil type
    switch(soilType) {
        case 'sandy': baseValue = minValue * 1.2; break;
        case 'loamy': baseValue = minValue * 1.0; break;
        case 'clay': baseValue = minValue * 0.9; break;
        default: baseValue = minValue;
    }
    
    // Adjust for organic matter content
    let adjustment = 1.0 - (organicMatter / 10); // Less N needed with more organic matter
    adjustment = Math.max(0.6, Math.min(adjustment, 1.2)); // Constrain adjustment
    
    return Math.round(baseValue * adjustment);
}

function calculatePhosphorus(soilType, organicMatter, minValue, maxValue) {
    let baseValue = 0;
    
    // Adjust base value by soil type
    switch(soilType) {
        case 'sandy': baseValue = minValue * 1.1; break;
        case 'loamy': baseValue = minValue * 1.0; break;
        case 'clay': baseValue = minValue * 1.2; break; // Clay often binds P
        default: baseValue = minValue;
    }
    
    // Slight adjustment for organic matter
    let adjustment = 1.0 - (organicMatter / 20);
    adjustment = Math.max(0.8, Math.min(adjustment, 1.1));
    
    return Math.round(baseValue * adjustment);
}

function calculatePotassium(soilType, organicMatter, minValue, maxValue) {
    let baseValue = 0;
    
    // Adjust base value by soil type
    switch(soilType) {
        case 'sandy': baseValue = maxValue * 1.1; break; // Sandy soils often need more K
        case 'loamy': baseValue = minValue * 1.1; break;
        case 'clay': baseValue = minValue * 0.9; break; // Clay often holds K
        default: baseValue = minValue;
    }
    
    // Minimal adjustment for organic matter
    let adjustment = 1.0 - (organicMatter / 25);
    adjustment = Math.max(0.9, Math.min(adjustment, 1.1));
    
    return Math.round(baseValue * adjustment);
}

function calculateSoilHealthScore(organicMatter, soilType, temperature) {
    // This is a simplified calculation
    let baseScore = 60; // Start with a base score
    
    // Add points for organic matter (0-10% scale)
    if (organicMatter < 2) {
        baseScore += organicMatter * 2; // Up to +4 points
    } else if (organicMatter < 5) {
        baseScore += 4 + (organicMatter - 2) * 3; // Up to +13 points
    } else {
        baseScore += 13 + (Math.min(organicMatter, 10) - 5) * 2; // Up to +23 points
    }
    
    // Adjust for soil type
    switch(soilType) {
        case 'loamy': baseScore += 10; break;  // Ideal
        case 'sandy': baseScore += 5; break;   // Less ideal
        case 'clay': baseScore += 7; break;    // Moderate
    }
    
    // Temperature factor (ideally between 15-25°C)
    if (temperature >= 15 && temperature <= 25) {
        baseScore += 7; // Ideal range
    } else if (temperature > 25 && temperature <= 30) {
        baseScore += 4; // Good but not ideal
    } else if (temperature >= 10 && temperature < 15) {
        baseScore += 3; // Good but not ideal
    } else {
        baseScore += 0; // Less suitable
    }
    
    // Ensure score is between 0-100
    return Math.min(100, Math.max(0, Math.round(baseScore)));
}

// Update the chart with new data
function updateNutrientChart(nitrogen, phosphorus, potassium, organicMatter) {
    // Calculate percentages for display
    const total = nitrogen + phosphorus + potassium + Math.round(organicMatter * 5) + 10;
    const nitrogenPct = Math.round((nitrogen / total) * 100);
    const phosphorusPct = Math.round((phosphorus / total) * 100);
    const potassiumPct = Math.round((potassium / total) * 100);
    const organicPct = Math.round((organicMatter * 5 / total) * 100);
    const otherPct = 100 - nitrogenPct - phosphorusPct - potassiumPct - organicPct;
    
    // Update chart data
    window.nutrientChart.data.datasets[0].data = [
        nitrogenPct,
        phosphorusPct,
        potassiumPct,
        organicPct,
        otherPct
    ];
    
    // Animate the chart
    window.nutrientChart.update();
}

// Update the soil health score meter
function updateScoreMeter(score) {
    // Update the meter fill
    const meterFill = document.querySelector('.meter-fill');
    meterFill.style.width = `${score}%`;
    
    // Update the score value
    const scoreValue = document.getElementById('scoreValue');
    scoreValue.textContent = score;
    
    // Add color based on score
    if (score >= 80) {
        meterFill.style.background = 'linear-gradient(90deg, #3a9e5f, #43c86a)';
        scoreValue.style.color = '#3a9e5f';
    } else if (score >= 60) {
        meterFill.style.background = 'linear-gradient(90deg, #7cb342, #8bc34a)';
        scoreValue.style.color = '#7cb342';
    } else if (score >= 40) {
        meterFill.style.background = 'linear-gradient(90deg, #ffa726, #ffb74d)';
        scoreValue.style.color = '#ffa726';
    } else {
        meterFill.style.background = 'linear-gradient(90deg, #e53935, #f44336)';
        scoreValue.style.color = '#e53935';
    }
}

// Update the recommendations section
function updateRecommendations(cropType, soilType, nitrogen, phosphorus, potassium, organicMatter, temperature) {
    const recommendationDiv = document.getElementById('recommendationDetails');
    let cropTypeFormatted = cropType.charAt(0).toUpperCase() + cropType.slice(1);
    let soilTypeFormatted = soilType.charAt(0).toUpperCase() + soilType.slice(1);
    
    // Generate recommendations HTML
    let recommendationsHTML = `
        <h3>Soil Analysis Results</h3>
        <p>Based on your inputs for ${cropTypeFormatted} growing in ${soilTypeFormatted} soil, we recommend the following nutrient application:</p>
        
        <ul class="nutrient-list">
            <li><strong>Nitrogen (N):</strong> ${nitrogen} kg/ha
                <div class="recommendation-details">
                    ${getNitrogenRecommendationText(cropType, soilType, nitrogen, organicMatter)}
                </div>
            </li>
            <li><strong>Phosphorus (P):</strong> ${phosphorus} kg/ha
                <div class="recommendation-details">
                    ${getPhosphorusRecommendationText(cropType, soilType, phosphorus)}
                </div>
            </li>
            <li><strong>Potassium (K):</strong> ${potassium} kg/ha
                <div class="recommendation-details">
                    ${getPotassiumRecommendationText(cropType, soilType, potassium)}
                </div>
            </li>
            <li><strong>Organic Matter:</strong> ${organicMatter}%
                <div class="recommendation-details">
                    ${getOrganicMatterRecommendationText(organicMatter)}
                </div>
            </li>
        </ul>
        
        <h3>Application Schedule</h3>
        <p>Recommended application timing for ${cropTypeFormatted}:</p>
        ${getApplicationSchedule(cropType, temperature)}
        
        <h3>Additional Recommendations</h3>
        <ul>
            ${getAdditionalRecommendations(cropType, soilType, organicMatter, temperature)}
        </ul>
    `;
    
    // Update the recommendations div
    recommendationDiv.innerHTML = recommendationsHTML;
    
    // Add some animation for better UX
    recommendationDiv.style.opacity = '0';
    setTimeout(() => {
        recommendationDiv.style.opacity = '1';
        recommendationDiv.style.transition = 'opacity 0.5s ease-in';
    }, 100);
}

// Helper functions for text recommendations
function getNitrogenRecommendationText(cropType, soilType, nitrogen, organicMatter) {
    if (organicMatter > 5) {
        return `Your soil has good organic matter content, which provides natural nitrogen. Consider reducing synthetic nitrogen by 10-15%.`;
    } else if (nitrogen > 120) {
        return `Apply in split doses: 50% at planting, 25% during early growth, and 25% before flowering for maximum efficiency.`;
    } else {
        return `Apply the majority (70%) at planting time, with the remainder as a top dressing during the growing season.`;
    }
}

function getPhosphorusRecommendationText(cropType, soilType, phosphorus) {
    if (soilType === 'clay') {
        return `Clay soils can bind phosphorus. Consider band application near the root zone rather than broadcasting.`;
    } else if (soilType === 'sandy') {
        return `In sandy soils, apply phosphorus closer to planting time to reduce leaching. Consider using slow-release forms.`;
    } else {
        return `For loamy soils, standard phosphorus application methods are effective. Apply pre-planting and incorporate into soil.`;
    }
}

function getPotassiumRecommendationText(cropType, soilType, potassium) {
    if (soilType === 'sandy') {
        return `Sandy soils may require split applications of potassium to prevent leaching. Consider 60% pre-plant and 40% during growing season.`;
    } else if (potassium > 80) {
        return `At this higher application rate, monitor for potential nutrient imbalances, particularly with magnesium uptake.`;
    } else {
        return `Apply potassium before planting and incorporate into the soil for best availability throughout the growing season.`;
    }
}

function getOrganicMatterRecommendationText(organicMatter) {
    if (organicMatter < 2) {
        return `Your soil has low organic matter. Consider adding compost, manure, or growing cover crops to improve soil structure and nutrient retention.`;
    } else if (organicMatter < 4) {
        return `Moderate organic matter level. Maintain with periodic additions of organic amendments and minimal tillage practices.`;
    } else {
        return `Good organic matter content. Continue your current soil management practices and consider reduced tillage to preserve organic matter.`;
    }
}

function getApplicationSchedule(cropType, temperature) {
    let schedule = '<ul class="schedule-list">';
    
    switch(cropType) {
        case 'wheat':
            schedule += `
                <li><strong>Pre-planting:</strong> Apply 70% N, 100% P, 100% K</li>
                <li><strong>Tillering stage:</strong> Apply 20% N</li>
                <li><strong>Before heading:</strong> Apply remaining 10% N</li>
            `;
            break;
        case 'rice':
            schedule += `
                <li><strong>Basal application:</strong> Apply 40% N, 100% P, 50% K</li>
                <li><strong>Tillering stage:</strong> Apply 30% N, 25% K</li>
                <li><strong>Panicle initiation:</strong> Apply 20% N, 25% K</li>
                <li><strong>Heading stage:</strong> Apply remaining 10% N</li>
            `;
            break;
        case 'soybean':
            schedule += `
                <li><strong>Pre-planting:</strong> Apply 30% N, 100% P, 50% K</li>
                <li><strong>Flowering stage:</strong> Apply remaining N and K</li>
                <li><strong>Note:</strong> Soybeans fix nitrogen, so N application can be reduced</li>
            `;
            break;
        case 'barley':
            schedule += `
                <li><strong>Pre-planting:</strong> Apply 60% N, 100% P, 100% K</li>
                <li><strong>Tillering stage:</strong> Apply 30% N</li>
                <li><strong>Stem elongation:</strong> Apply remaining 10% N</li>
            `;
            break;
        case 'corn':
            schedule += `
                <li><strong>Pre-planting:</strong> Apply 30% N, 100% P, 100% K</li>
                <li><strong>V6 stage (6 leaves):</strong> Apply 40% N</li>
                <li><strong>V12 stage:</strong> Apply remaining 30% N</li>
            `;
            break;
        default:
            schedule += `
                <li><strong>Pre-planting:</strong> Apply 50% N, 100% P, 50% K</li>
                <li><strong>Mid-season:</strong> Apply remaining nutrients based on plant growth and appearance</li>
            `;
    }
    
    // Adjust for temperature if needed
    if (temperature < 10) {
        schedule += `<li><strong>Temperature note:</strong> Due to cooler conditions (${temperature}°C), delay nitrogen applications until soil warms above 10°C for better uptake efficiency.</li>`;
    } else if (temperature > 30) {
        schedule += `<li><strong>Temperature note:</strong> Due to warmer conditions (${temperature}°C), apply nutrients in the cooler parts of the day and consider more frequent but smaller applications.</li>`;
    }
    
    schedule += '</ul>';
    return schedule;
}

function getAdditionalRecommendations(cropType, soilType, organicMatter, temperature) {
    let recommendations = '';
    
    // General recommendations
    if (organicMatter < 2) {
        recommendations += `<li>Consider incorporating cover crops into your rotation to build soil organic matter.</li>`;
    }
    
    if (soilType === 'sandy') {
        recommendations += `<li>Sandy soils are prone to leaching. Consider using slow-release fertilizers and split applications.</li>`;
    } else if (soilType === 'clay') {
        recommendations += `<li>Improve drainage in clay soils by adding organic matter and avoiding tillage when wet.</li>`;
    }
    
    // Crop specific
    switch(cropType) {
        case 'wheat':
            recommendations += `<li>Monitor for nitrogen deficiency during stem elongation - look for yellowing of older leaves.</li>`;
            break;
        case 'rice':
            recommendations += `<li>Maintain proper water management during fertilizer application to reduce nutrient runoff.</li>`;
            recommendations += `<li>Consider zinc application if deficiency symptoms appear (bronzing of leaves).</li>`;
            break;
        case 'soybean':
            recommendations += `<li>Ensure proper inoculation with rhizobium bacteria for optimal nitrogen fixation.</li>`;
            recommendations += `<li>Monitor for micronutrient deficiencies, particularly iron and manganese.</li>`;
            break;
        case 'barley':
            recommendations += `<li>Split nitrogen applications can improve protein content for malting barley.</li>`;
            break;
        case 'corn':
            recommendations += `<li>Conduct tissue testing at V6 stage to fine-tune nutrient management.</li>`;
            recommendations += `<li>Consider applying sulfur, particularly in soils with low organic matter.</li>`;
            break;
    }
    
    // Temperature specific
    if (temperature < 15) {
        recommendations += `<li>In cooler soil conditions, phosphorus uptake may be limited. Consider starter fertilizer placement near seed.</li>`;
    } else if (temperature > 28) {
        recommendations += `<li>High soil temperatures can accelerate nitrogen loss. Consider using urease or nitrification inhibitors.</li>`;
    }
    
    // If no recommendations were added
    if (recommendations === '') {
        recommendations = `<li>Continue with standard soil management practices for your region.</li>`;
    }
    
    return recommendations;
}