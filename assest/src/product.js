fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const products = data;
        const productsPerPage = 9;
        let currentPage = 1;

        // Function to update product grid
        function updateProductGrid() {
            const categoryFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
                .map(input => input.value);
            const ratingFilter = document.querySelector('input[name="rating"]:checked')?.value; // Get the selected rating
            const priceFilter = document.getElementById('priceRange').value;
            
            // Get search query from both desktop and mobile search inputs
            const searchQuery = document.getElementById('desktopSearch').value.toLowerCase() || document.getElementById('mobileSearch').value.toLowerCase();

            // Filter products based on selected category, brand, rating, price range, and search query
            const filteredProducts = products.filter(product => {
                // Category Filter
                const matchCategory = categoryFilters.includes('all') || categoryFilters.includes(product.category);

                // Price Filter
                const matchPrice = product.price <= priceFilter;

                // Rating Filter
                const matchRating = !ratingFilter || product.rating >= parseInt(ratingFilter);

                // Search Filter (checking if the product name contains the search query)
                const matchSearch = product.name.toLowerCase().includes(searchQuery);

                return matchCategory && matchPrice && matchRating && matchSearch;
            });

            const start = (currentPage - 1) * productsPerPage;
            const end = start + productsPerPage;
            const productsToDisplay = filteredProducts.slice(start, end);

            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';

            productsToDisplay.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card', 'p-4', 'bg-white');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3 class="font-semibold mt-2">${product.name}</h3>
                    <p class="text-gray-700">$${product.price}</p>
                    <p class="text-gray-500 text-sm">Brand: ${product.brand}</p>
                    <p class="text-yellow-500">${'★'.repeat(product.rating)}</p>
                    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onclick="viewDetails(${product.id})">View Details</button>
                    <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                `;
                productGrid.appendChild(card);
            });

            updatePagination(filteredProducts.length);
        }

        // Function to update pagination
        function updatePagination(totalProducts) {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';

            const totalPages = Math.ceil(totalProducts / productsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.classList.add('px-4', 'py-2', 'border', 'rounded');
                button.onclick = () => {
                    currentPage = i;
                    updateProductGrid();
                };
                pagination.appendChild(button);
            }
        }

        // View details
        window.viewDetails = function(productId) {
            const product = products.find(p => p.id === productId);
            localStorage.setItem('productDetails', JSON.stringify(product));
            window.location.href = 'product-details.html';
        };

        // Add to cart functionality with login check
        window.addToCart = function(productId) {
            // Check if user is logged in by checking if there's a 'loginUsers' key in localStorage
            const loggedInUser = JSON.parse(localStorage.getItem('loginUsers'))?.[0]; // Get the first logged in user (assuming single login)
            
            if (!loggedInUser) {
                // If not logged in, alert the user and redirect them to the login page
                alert('Please login first to add items to your cart!');
                window.location.href = 'login.html'; // Redirect to login page
                return;
            }

            // If logged in, proceed with adding the product to the cart
            const product = products.find(p => p.id === productId);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex === -1) {
                // If the product isn't in the cart, add it with quantity 1
                product.quantity = 1;
                cart.push(product);
            } else {
                // If it's already in the cart, increase the quantity
                cart[existingProductIndex].quantity += 1;
            }

            // Save the updated cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optionally, you can alert the user or show a message
            alert(`${product.name} has been added to your cart!`);
        };

        // Update grid initially
        updateProductGrid();

        // Filter changes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', updateProductGrid);
        });

        // Update price value
        document.getElementById('priceRange').addEventListener('input', function() {
            document.getElementById('priceValue').textContent = `Price: $0 - $${this.value}`;
            updateProductGrid();
        });

        // Update rating filter (to refresh product grid on rating change)
        document.querySelectorAll('input[name="rating"]').forEach(ratingInput => {
            ratingInput.addEventListener('change', updateProductGrid);
        });

        // Search bar event listeners for both mobile and desktop
        document.getElementById('desktopSearch').addEventListener('input', updateProductGrid);
        document.getElementById('mobileSearch').addEventListener('input', updateProductGrid);

        // Add event listeners for the "Add to Cart" buttons
        document.getElementById('productGrid').addEventListener('click', function(event) {
            if (event.target && event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.getAttribute('data-id');
                addToCart(parseInt(productId)); // Add product to cart using its ID
            }
        });
    });



    

    


