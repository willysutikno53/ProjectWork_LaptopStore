// Laptop Products Data
const laptops = [
    {
        id: 1,
        title: "GAMING LAPTOP",
        brand: "ASUS ROG",
        category: "gaming",
        specs: ["Intel Core i9-13900HX", "RTX 4070 8GB", "32GB DDR5", "1TB SSD"],
        price: "Rp 35.999.000",
        priceNum: 35999000,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
    },
    {
        id: 2,
        title: "BUSINESS ULTRABOOK",
        brand: "Lenovo ThinkPad",
        category: "bisnis",
        specs: ["Intel Core i7-1355U", "Intel Iris Xe", "16GB RAM", "512GB SSD"],
        price: "Rp 18.500.000",
        priceNum: 18500000,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
    },
    {
        id: 3,
        title: "CREATOR LAPTOP",
        brand: "Dell XPS 15",
        category: "creator",
        specs: ["Intel Core i7-13700H", "RTX 4050 6GB", "32GB RAM", "1TB SSD"],
        price: "Rp 32.999.000",
        priceNum: 32999000,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
    },
    {
        id: 4,
        title: "PORTABLE ULTRABOOK",
        brand: "MacBook Air M2",
        category: "ultrabook",
        specs: ["Apple M2 Chip", "8-Core GPU", "16GB Unified", "512GB SSD"],
        price: "Rp 19.999.000",
        priceNum: 19999000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
        id: 5,
        title: "WORKSTATION PRO",
        brand: "HP ZBook Studio",
        category: "creator",
        specs: ["Intel Core i9-13900H", "RTX 4000 Ada", "64GB RAM", "2TB SSD"],
        price: "Rp 52.999.000",
        priceNum: 52999000,
        image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400"
    },
    {
        id: 6,
        title: "BUDGET GAMING",
        brand: "Acer Nitro 5",
        category: "gaming",
        specs: ["AMD Ryzen 5 7535HS", "RTX 3050 4GB", "16GB RAM", "512GB SSD"],
        price: "Rp 12.999.000",
        priceNum: 12999000,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"
    },
    {
        id: 7,
        title: "PREMIUM ULTRABOOK",
        brand: "Microsoft Surface",
        category: "ultrabook",
        specs: ["Intel Core i7-1255U", "Intel Iris Xe", "16GB RAM", "512GB SSD"],
        price: "Rp 24.500.000",
        priceNum: 24500000,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400"
    },
    {
        id: 8,
        title: "MULTIMEDIA LAPTOP",
        brand: "HP Pavilion Plus",
        category: "multimedia",
        specs: ["Intel Core i7-13700H", "RTX 3050 6GB", "16GB RAM", "512GB SSD"],
        price: "Rp 15.999.000",
        priceNum: 15999000,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    }
];

// Shopping Cart
let cart = [];

// Load cart from memory
function loadCart() {
    const savedCart = cart;
    if (savedCart) {
        cart = savedCart;
        updateCartCount();
    }
}

// Save cart to memory
function saveCart() {
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Add to cart
function addToCart(laptopId) {
    const laptop = laptops.find(l => l.id === laptopId);
    const existingItem = cart.find(item => item.id === laptopId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: laptop.id,
            title: laptop.title,
            brand: laptop.brand,
            price: laptop.price,
            priceNum: laptop.priceNum,
            image: laptop.image,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('✓ Produk ditambahkan ke keranjang!');
}

// Remove from cart
function removeFromCart(laptopId) {
    cart = cart.filter(item => item.id !== laptopId);
    saveCart();
    renderCart();
}

// Update quantity
function updateQuantity(laptopId, change) {
    const item = cart.find(item => item.id === laptopId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(laptopId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Format currency
function formatCurrency(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

// Render cart items
function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty">Keranjang belanja Anda kosong</div>';
        document.getElementById('cartTotal').textContent = 'Rp 0';
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price}</div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Hapus</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0);
    document.getElementById('cartTotal').textContent = formatCurrency(total);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);

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
                <button class="btn-add-cart" onclick="addToCart(${laptop.id})">
                    🛒 Tambah ke Keranjang
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Laptops by Category
function filterLaptops(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

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

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

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

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        filteredLaptops = laptops.filter(laptop => 
            laptop.title.toLowerCase().includes(query) ||
            laptop.brand.toLowerCase().includes(query) ||
            laptop.specs.some(spec => spec.toLowerCase().includes(query))
        );
        
        document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        
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

document.getElementById('prevTestimonial').addEventListener('click', () => updateTestimonial('prev'));
document.getElementById('nextTestimonial').addEventListener('click', () => updateTestimonial('next'));

setInterval(() => {
    updateTestimonial('next');
}, 5000);

// Modal Functions
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');

const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnCart = document.getElementById('btnCart');
const btnCheckout = document.getElementById('btnCheckout');

const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const closeCart = document.getElementById('closeCart');
const closeCheckout = document.getElementById('closeCheckout');

btnLogin.addEventListener('click', () => {
    loginModal.classList.add('active');
});

btnRegister.addEventListener('click', () => {
    registerModal.classList.add('active');
});

btnCart.addEventListener('click', () => {
    renderCart();
    cartModal.classList.add('active');
});

btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return;
    }
    cartModal.classList.remove('active');
    renderCheckout();
    checkoutModal.classList.add('active');
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

closeRegister.addEventListener('click', () => {
    registerModal.classList.remove('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Render Checkout
function renderCheckout() {
    const checkoutItemsDiv = document.getElementById('checkoutItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0);
    const shipping = subtotal > 5000000 ? 0 : 50000;
    const total = subtotal + shipping;
    
    checkoutItemsDiv.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <div class="checkout-item-name">${item.brand} ${item.title}</div>
                <div class="checkout-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div>${formatCurrency(item.priceNum * item.quantity)}</div>
        </div>
    `).join('');
    
    document.getElementById('checkoutSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'GRATIS' : formatCurrency(shipping);
    document.getElementById('checkoutTotal').textContent = formatCurrency(total);
}

// Payment Method Change
document.getElementById('paymentMethod').addEventListener('change', (e) => {
    const cardDetailsGroup = document.getElementById('cardDetailsGroup');
    if (e.target.value === 'credit_card') {
        cardDetailsGroup.style.display = 'block';
        document.getElementById('cardNumber').required = true;
        document.getElementById('cardExpiry').required = true;
        document.getElementById('cardCvv').required = true;
    } else {
        cardDetailsGroup.style.display = 'none';
        document.getElementById('cardNumber').required = false;
        document.getElementById('cardExpiry').required = false;
        document.getElementById('cardCvv').required = false;
    }
});

// Format card number
document.getElementById('cardNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Format expiry date
document.getElementById('cardExpiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});

// Checkout Form Submission
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!paymentMethod) {
        alert('Silakan pilih metode pembayaran!');
        return;
    }
    
    // Simulate payment processing
    const loadingDiv = document.createElement('div');
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-size: 1.5em;
    `;
    loadingDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="margin-bottom: 20px;">⏳</div>
            <div>Memproses pembayaran...</div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
    
    setTimeout(() => {
        loadingDiv.remove();
        checkoutModal.classList.remove('active');
        
        // Generate order ID
        const orderId = 'ORD' + Date.now();
        document.getElementById('orderId').textContent = orderId;
        
        // Show success modal
        successModal.classList.add('active');
        
        // Clear cart
        cart = [];
        saveCart();
        
        // Reset form
        document.getElementById('checkoutForm').reset();
    }, 2000);
});

// Close Success Modal
document.getElementById('btnCloseSuccess').addEventListener('click', () => {
    successModal.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
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
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                filterLaptops(category);
            }, 500);
        });
    });

    // Slider buttons
    document.getElementById('prevBtn').addEventListener('click', () => slideLaptops('prev'));
    document.getElementById('nextBtn').addEventListener('click', () => slideLaptops('next'));
});

// Console welcome message
console.log('%c💻 Welcome to LAPTOP STORE!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cTemukan laptop impian Anda dengan fitur lengkap!', 'color: #666; font-size: 14px;');