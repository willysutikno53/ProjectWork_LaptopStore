// Laptop Products Data
const laptops = [
    {
        id: 1,
        title: "GAMING LAPTOP",
        brand: "ASUS ROG",
        category: "gaming",
        specs: ["Intel Core i9-13900HX", "RTX 4070 8GB", "32GB DDR5", "1TB SSD"],
        price: "Rp 35.999.000",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
    },
    {
        id: 2,
        title: "BUSINESS ULTRABOOK",
        brand: "Lenovo ThinkPad",
        category: "bisnis",
        specs: ["Intel Core i7-1355U", "Intel Iris Xe", "16GB RAM", "512GB SSD"],
        price: "Rp 18.500.000",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
    },
    {
        id: 3,
        title: "CREATOR LAPTOP",
        brand: "Dell XPS 15",
        category: "creator",
        specs: ["Intel Core i7-13700H", "RTX 4050 6GB", "32GB RAM", "1TB SSD"],
        price: "Rp 32.999.000",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
    },
    {
        id: 4,
        title: "PORTABLE ULTRABOOK",
        brand: "MacBook Air M2",
        category: "ultrabook",
        specs: ["Apple M2 Chip", "8-Core GPU", "16GB Unified", "512GB SSD"],
        price: "Rp 19.999.000",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
        id: 5,
        title: "WORKSTATION PRO",
        brand: "HP ZBook Studio",
        category: "creator",
        specs: ["Intel Core i9-13900H", "RTX 4000 Ada", "64GB RAM", "2TB SSD"],
        price: "Rp 52.999.000",
        image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400"
    },
    {
        id: 6,
        title: "BUDGET GAMING",
        brand: "Acer Nitro 5",
        category: "gaming",
        specs: ["AMD Ryzen 5 7535HS", "RTX 3050 4GB", "16GB RAM", "512GB SSD"],
        price: "Rp 12.999.000",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
    },
    {
        id: 7,
        title: "PREMIUM ULTRABOOK",
        brand: "Microsoft Surface",
        category: "ultrabook",
        specs: ["Intel Core i7-1255U", "Intel Iris Xe", "16GB RAM", "512GB SSD"],
        price: "Rp 24.500.000",
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400"
    },
    {
        id: 8,
        title: "MULTIMEDIA LAPTOP",
        brand: "HP Pavilion Plus",
        category: "multimedia",
        specs: ["Intel Core i7-13700H", "RTX 3050 6GB", "16GB RAM", "512GB SSD"],
        price: "Rp 15.999.000",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    }
];

let currentFilter = 'all';
let filteredLaptops = [...laptops];

// Render Laptop Products
function renderLaptops(laptopsToRender = filteredLaptops) {
    const grid = document.getElementById('servicesGrid');
    
    if (laptopsToRender.length === 0) {
        grid.innerHTML = '<div class="no-results">Tidak ada laptop yang sesuai</div>';
        return;
    }

    grid.innerHTML = laptopsToRender.map(laptop => `
        <div class="service-card" data-id="${laptop.id}">
            <img src="${laptop.image}" alt="${laptop.title}" class="service-image">
            <div class="service-info">
                <div class="laptop-brand">${laptop.brand}</div>
                <h3 class="service-title">${laptop.title}</h3>
                <div class="service-tags">
                    ${laptop.specs.slice(0, 2).map(spec => 
                        `<span class="service-tag">${spec}</span>`
                    ).join('')}
                </div>
                <div class="laptop-price">${laptop.price}</div>
            </div>
        </div>
    `).join('');
}

// Filter Laptops by Category
function filterLaptops(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    // Filter laptops
    if (category === 'all') {
        filteredLaptops = [...laptops];
    } else {
        filteredLaptops = laptops.filter(laptop => laptop.category === category);
    }

    renderLaptops(filteredLaptops);
}

// Laptop Slider
let currentLaptopIndex = 0;

function slideLaptops(direction) {
    const displayCount = window.innerWidth <= 576 ? 1 : window.innerWidth <= 968 ? 2 : 4;
    
    if (direction === 'next') {
        currentLaptopIndex = (currentLaptopIndex + displayCount) % filteredLaptops.length;
    } else {
        currentLaptopIndex = (currentLaptopIndex - displayCount + filteredLaptops.length) % filteredLaptops.length;
    }
    
    const laptopsToShow = [];
    for (let i = 0; i < displayCount; i++) {
        laptopsToShow.push(filteredLaptops[(currentLaptopIndex + i) % filteredLaptops.length]);
    }
    
    renderLaptops(laptopsToShow);
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderLaptops();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterLaptops(btn.dataset.filter);
        });
    });

    // Category tags in hero
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.dataset.category;
            
            // Scroll to products section
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
            
            // Filter by category after a short delay
            setTimeout(() => {
                filterLaptops(category);
            }, 500);
        });
    });

    // Slider buttons
    document.getElementById('prevBtn').addEventListener('click', () => slideLaptops('prev'));
    document.getElementById('nextBtn').addEventListener('click', () => slideLaptops('next'));
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        // Filter laptops by search query
        filteredLaptops = laptops.filter(laptop => 
            laptop.title.toLowerCase().includes(query) ||
            laptop.brand.toLowerCase().includes(query) ||
            laptop.specs.some(spec => spec.toLowerCase().includes(query))
        );
        
        // Scroll to products
        document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        
        // Render filtered results
        setTimeout(() => {
            renderLaptops(filteredLaptops);
        }, 500);
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .feature, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Testimonial Data
const testimonials = [
    {
        text: "Laptop gaming yang saya beli sangat memuaskan! Performa luar biasa, harga kompetitif, dan pelayanan yang ramah. Sangat recommend untuk yang mencari laptop berkualitas.",
        author: "Budi Santoso",
        role: "Content Creator",
        image: "https://i.pravatar.cc/50?img=7",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        text: "Proses pembelian sangat mudah dan cepat. Laptop sampai dengan kondisi sempurna dan sesuai deskripsi. Pelayanan after sales juga memuaskan!",
        author: "Siti Rahayu",
        role: "Graphic Designer",
        image: "https://i.pravatar.cc/50?img=8",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        text: "Ini toko laptop terbaik yang pernah saya kunjungi. Staff yang knowledgeable, produk original, dan harga kompetitif. Highly recommended!",
        author: "Ahmad Fauzi",
        role: "Software Engineer",
        image: "https://i.pravatar.cc/50?img=9",
        rating: "⭐⭐⭐⭐⭐"
    }
];

let currentTestimonial = 0;

function updateTestimonial(direction) {
    if (direction === 'next') {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    } else {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    }
    
    const card = document.getElementById('testimonialCard');
    const testimonial = testimonials[currentTestimonial];
    
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.innerHTML = `
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}">
                <div>
                    <strong>${testimonial.author}</strong>
                    <div>${testimonial.role}</div>
                </div>
            </div>
            <div class="company-logo">${testimonial.rating}</div>
        `;
        card.style.opacity = '1';
    }, 300);
}

// Testimonial slider controls
document.getElementById('prevTestimonial').addEventListener('click', () => updateTestimonial('prev'));
document.getElementById('nextTestimonial').addEventListener('click', () => updateTestimonial('next'));

// Auto-slide testimonials every 5 seconds
setInterval(() => {
    updateTestimonial('next');
}, 5000);

// Modal Functions
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');

btnLogin.addEventListener('click', () => {
    loginModal.classList.add('active');
});

btnRegister.addEventListener('click', () => {
    registerModal.classList.add('active');
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

closeRegister.addEventListener('click', () => {
    registerModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
});

// Form Submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login functionality will be implemented!');
    loginModal.classList.remove('active');
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Register functionality will be implemented!');
    registerModal.classList.remove('active');
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Terima kasih ${name}! Pesan Anda telah diterima. Kami akan segera menghubungi Anda.`);
    e.target.reset();
});

// View All Button
document.getElementById('btnViewAll').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    filterLaptops('all');
});

// Button Click Ripple Effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .no-results {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
        font-size: 1.2em;
        color: #666;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c💻 Welcome to LAPTOP STORE!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cTemukan laptop impian Anda dengan fitur lengkap!', 'color: #666; font-size: 14px;');