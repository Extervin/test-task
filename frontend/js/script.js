const API_BASE = 'http://localhost:8000/api/v1';
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const brandsListEl = document.getElementById('brandsList');
const countryDisplayEl = document.getElementById('countryDisplay');

document.addEventListener('DOMContentLoaded', () => {
    loadBrands();
});

async function loadBrands() {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE}/brands`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayBrands(data.data, data.country);
        } else {
            throw new Error('API returned unsuccessful response');
        }
        
    } catch (error) {
        console.error('Error loading brands:', error);
        showError();
    }
}

function displayBrands(brands, country) {
    hideLoading();

    const countryName = getCountryName(country);
    countryDisplayEl.textContent = `Showing casinos for: ${countryName}`;

    brandsListEl.innerHTML = '';
    
    if (brands.length === 0) {
        brandsListEl.innerHTML = `
            <div class="no-brands">
                <h3>No casinos found for your region</h3>
                <p>Check back later for more options!</p>
            </div>
        `;
        return;
    }

    brands.forEach(brand => {
        const brandCard = createBrandCard(brand);
        brandsListEl.appendChild(brandCard);
    });
}

function createBrandCard(brand) {
    const card = document.createElement('div');
    card.className = 'brand-card';
    
    const stars = generateStars(brand.rating);
    
    card.innerHTML = `
        <img src="${brand.brand_image}" alt="${brand.brand_name}" class="brand-image" 
             onerror="this.src='https://via.placeholder.com/80/cccccc/666666?text=No+Image'">
        <div class="brand-info">
            <h3 class="brand-name">${brand.brand_name}</h3>
            <div class="brand-rating">
                <div class="stars">${stars}</div>
                <div class="rating-number">${brand.rating}/5</div>
            </div>
            <button class="visit-btn" onclick="visitCasino('${brand.brand_name}')">
                Visit Casino
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const maxStars = 5;
    let starsHTML = '';
    
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<span class="star">★</span>';
        } else {
            starsHTML += '<span class="star empty">★</span>';
        }
    }
    
    return starsHTML;
}

function getCountryName(countryCode) {
    const countries = {
        'default': 'Default Region',
        'bg': 'Bulgaria',
        'us': 'United States',
        'fr': 'France',
        'de': 'Germany',
        'uk': 'United Kingdom'
    };
    
    return countries[countryCode] || `Unknown (${countryCode})`;
}

function visitCasino(brandName) {
    // In a real app this would redirect to the casino
    alert(`Redirecting to ${brandName}... (This is just a demo)`);
    console.log(`clicked to ${brandName}`);
}

function showLoading() {
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    brandsListEl.innerHTML = '';
}

function hideLoading() {
    loadingEl.style.display = 'none';
}

function showError() {
    hideLoading();
    errorEl.style.display = 'block';
    brandsListEl.innerHTML = '';
}

function testCountry(countryCode) {
    console.log(`Testing country: ${countryCode}`);
    
    fetch(`${API_BASE}/brands/country/${countryCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayBrands(data.data, data.country);
            }
        })
        .catch(error => {
            console.error('Error testing country:', error);
        });
}

console.log('Available test functions:');
console.log('- testCountry("bg") - Test Bulgarian casinos');
console.log('- testCountry("us") - Test US casinos');
console.log('- testCountry("default") - Test default casinos');