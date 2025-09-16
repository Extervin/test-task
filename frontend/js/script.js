const API_BASE = 'http://localhost:8000/api/v1';
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const brandsListEl = document.getElementById('brandsList');
const countryDisplayEl = document.getElementById('countryDisplay');
const totalCasinosEl = document.getElementById('totalCasinos');
const loadingMessages = [
    'Rolling the dice for your entertainment...',
    'Consulting our crystal ball...',
    'Asking the magic 8-ball nicely...',
    'Bribing the server hamsters...',
    'Downloading more RAM...',
    'Calibrating the slot machines...'
];
document.addEventListener('DOMContentLoaded', () => {
    loadBrands();
});

async function loadBrands() {
    try {
        showLoading();
        const response = await fetch(`${API_BASE}/brands`);
        
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
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
    countryDisplayEl.innerHTML = `
        <i class="fas fa-globe-americas country-icon"></i>
        ${countryName}
    `;
    if (totalCasinosEl) {
        totalCasinosEl.textContent = brands.length;
        animateNumber(totalCasinosEl, 0, brands.length, 1000);
    }

    brandsListEl.innerHTML = '';
    
    if (brands.length === 0) {
        brandsListEl.innerHTML = `
            <div class="no-brands" style="text-align: center; padding: 60px; background: rgba(255,255,255,0.95); border-radius: 16px;">
                <i class="fas fa-desert" style="font-size: 4rem; margin-bottom: 20px; color: #ddd;"></i>
                <h3>It's a desert out here!</h3>
                <p>No casinos found for your region. Our scouts are still exploring.</p>
                <small>*They got distracted by shiny objects</small>
            </div>
        `;
        return;
    }

    const sortedBrands = brands.sort((a, b) => b.rating - a.rating);

    sortedBrands.forEach((brand, index) => {
        const brandCard = createBrandCard(brand, index + 1);
        brandCard.style.opacity = '0';
        brandCard.style.transform = 'translateY(20px)';
        brandsListEl.appendChild(brandCard);

        setTimeout(() => {
            brandCard.style.transition = 'all 0.6s ease';
            brandCard.style.opacity = '1';
            brandCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createBrandCard(brand, rank) {
    const card = document.createElement('div');
    card.className = 'brand-card';
    const stars = generateStars(brand.rating);
    const funRating = getFunRating(brand.rating);
    const visitMessage = getVisitMessage(brand.brand_name);
    const bonusText = getBonusText(rank);
    
    card.innerHTML = `
        <div class="brand-rank">#${rank}</div>
        <img src="${brand.brand_image}" alt="${brand.brand_name}" class="brand-image" 
             onerror="this.src='https://placehold.co/80/cccccc/666666?text=Oops'">
        <div class="brand-info">
            <div class="brand-details">
                <h3 class="brand-name">${brand.brand_name}</h3>
                <div class="brand-rating">
                    <div class="rating-info">
                        <div class="stars">${stars}</div>
                        <div class="rating-number">${brand.rating}/5 - ${funRating}</div>
                    </div>
                    <div class="brand-bonus">${bonusText}</div>
                </div>
            </div>
            <div class="brand-actions">
                <button class="visit-btn" onclick="visitCasino('${brand.brand_name}')">
                    <i class="fas fa-external-link-alt"></i> ${visitMessage}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getBonusText(rank) {
    const bonuses = [
        'Top Choice',
        'Great Pick', 
        'Solid Option',
        'Popular',
        'Recommended'
    ];
    if (rank <= bonuses.length) {
        return bonuses[rank - 1];
    }
    return 'Worth a Try';
}

function generateStars(rating) {
    const maxStars = 5;
    let starsHTML = '';
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star star" title="1"></i>';
        } else {
            starsHTML += '<i class="far fa-star star empty" title="0"></i>';
        }
    }
    return starsHTML;
}

function getCountryName(countryCode) {
    const countries = {
        'default': 'Default Region',
        'bg': 'Best Country In The World',
        'us': 'United States',  
    };
    return countries[countryCode] || `Unknown Location ${countryCode}`;
}

function getFunRating(rating) {
    const ratings = {
        1: 'Meh',
        2: 'Not Bad',
        3: 'Pretty Good',
        4: 'Great Stuff',
        5: 'AMAZING!'
    };
    
    return ratings[rating] || 'Unknown Quality';
}

function getVisitMessage(brandName) {
    const messages = [
        'Visit Casino',
        'Try Your Luck',
        'Feel Lucky?',
        'Go For It!',
        'Why Not?',
        'YOLO Time',
        'Adventure Awaits'
    ];

    const index = brandName.length % messages.length;
    return messages[index];
}

function visitCasino(brandName) {
    const responses = [
        `Welcome to ${brandName}! *Confetti falls everywhere*`,
        `${brandName} is calling your name!`,
        `${brandName} says "Come on down!"`,
        `${brandName} awaits!`,
        `${brandName} circus is in town!`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    alert(randomResponse);
    
    console.log(`User attempted to visit: ${brandName}`);
    console.log(`This is still just a demo, but thanks for clicking`);
}

function showLoading() {
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    brandsListEl.innerHTML = '';

    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    const loadingText = loadingEl.querySelector('p');
    if (loadingText) {
        loadingText.textContent = randomMessage;
    }
}

function hideLoading() {
    loadingEl.style.display = 'none';
}

function showError() {
    hideLoading();
    errorEl.style.display = 'block';
    brandsListEl.innerHTML = '';
}

function animateNumber(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, 16);
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