 // Example JSON Data
 const productsData = [
    {
        "image": "https://obsessionoutlet.com/wp-content/uploads/Modern-Wood-Furniture-Design-in-karachi.jpg",
        "category": "Furniture",
        "name": "Furniture",
        "description": "Stylish and functional furniture designed to elevate your space with comfort, durability, and modern appeal.",
        "rating": 4
    },
    {
        "image": "https://www.realmenrealstyle.com/wp-content/uploads/2023/08/Watch-Details.jpg",
        "category": "Watches",
        "name": "Watches",
        "description": "Elevate your style with our collection of watches, combining precision, durability, and timeless design",
        "rating": 3
    },
    {
        "image": "https://media.istockphoto.com/id/1196974664/photo/set-of-home-kitchen-appliances-in-the-room-on-the-wall-background.jpg?s=612x612&w=0&k=20&c=dUSAMg-LUh6j-4437kz30w8k7KgJiR8yrTTXhGiFh0s=",
        "category": "Appliances",
        "name": "Appliances",
        "description": "Find reliable appliances designed to simplify your daily tasks with smart technology and efficiency.",
        "rating": 5
      },
      {
        "image": "https://www.dressyzone.com/cdn/shop/files/p15195-embroidered-net-dress_580x.jpg?v=1719991651",
        "category": "Ladies Clothes",
        "name": "Ladies Clothes",
        "description": "Explore our collection of ladies' clothes, offering stylish, comfortable, and versatile pieces for every occasion.",
        "rating": 2
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/0012/7339/7332/files/12_Men_s_Cardigan_Sweaters_That_Are_Light_Enough_To_Wear_This_Summer_2048x2048.jpg?v=1673221437",
        "category": "Gents Clothes",
        "name": "Gents Clothes",
        "description": "Shop our range of men's clothing, featuring stylish, comfortable, and durable pieces for every wardrobe.",
        "rating": 3
      },
      {
        "image": "https://greencrockery.com.pk/wp-content/uploads/2024/07/81xosiCfKKS-1024x1024.jpg",
        "category": "Crockery",
        "name": "Crockery",
        "description": "Browse our collection of crockery, offering elegant and durable sets to enhance your dining experience.",
        "rating": 4
      },
      {
        "image": "https://mustafajewellery.com/wp-content/uploads/2024/08/SG-Family-1.png",
        "category": "Jewellery",
        "name": "Jewellery",
        "description": "Discover exquisite jewelry, featuring timeless designs crafted to add a touch of elegance to any occasion.",
        "rating": 5
      },
      {
        "image": "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg",
        "category": "Electronics",
        "name": "Electronics",
        "description": "Explore our range of electronics, offering cutting-edge technology and high performance for all your needs",
        "rating": 4
      },
      {
        "image": "https://www.sassandbelle.co.uk/Images/ProductCategories/kids-accessories-new-category.jpg",
        "category": "Kids",
        "name": "Kids",
        "description": "Shop our collection for kids, featuring fun, comfortable, and durable clothes, toys, and accessories for every little one.",
        "rating": 3
      },
      {
        "image": "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
        "category": "Sports",
        "name": "Sports",
        "description": "Gear up with our sports collection, offering high-performance equipment and apparel for all your athletic needs.",
        "rating": 5
      },
      {
        "image": "https://i.pinimg.com/control2/736x/cf/6d/0d/cf6d0d9ccc92297739236f35ec3c7a5e.jpg",
        "category": "Home Interiors",
        "name": "Home Interiors",
        "description": "Transform your living space with stylish and functional home interiors that reflect your personal taste and comfort.",
        "rating": 4
      },
      {
        "image": "https://i.pinimg.com/736x/5f/58/de/5f58de70b3e4376fe05ea86f3631520e.jpg",
        "category": "Tools & Equipments",
        "name": "Tools & Equipments",
        "description": "Explore a wide range of high-quality tools and equipment designed for efficiency, precision, and durability.",
        "rating": 3
      },
];

// Populate the filter categories
function populateFilters() {
    const categories = [...new Set(productsData.map(product => product.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Populate product grid
function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Clear existing cards
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'border', 'rounded-lg', 'overflow-hidden', 'shadow-lg');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64">
            <div class="p-4">
                <h3 class="text-xl font-bold">${product.name}</h3>
                <p class="text-gray-600">${product.description}</p>
                <div class="flex items-center">
                    <span class="text-yellow-500">${'★'.repeat(product.rating)}</span>
                </div>
                <a href="product.html">
  <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View More</button>
</a>

            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products based on category and rating
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const starFilter = document.getElementById('starFilter').value;

    let filteredProducts = productsData;

    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    if (starFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.rating == starFilter);
    }

    displayProducts(filteredProducts);
}

// Initialize page
function init() {
    populateFilters();
    displayProducts(productsData);
    
    // Add event listeners for filters
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('starFilter').addEventListener('change', filterProducts);
}

// Run the initialization function
init();