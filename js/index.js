
let allProducts = [];
let storeConfig = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadStoreConfig();
    await loadProducts();
    setupSearch();
});

async function loadStoreConfig() {
    const { data, error } = await supabase
        .from('store_config')
        .select('*')
        .limit(1)
        .single();

    if (!error && data) {
        storeConfig = data;
        applyStoreConfig();
    }
}

function applyStoreConfig() {
    // Update page title
    document.getElementById('page-title').textContent = storeConfig.nome_loja || 'GWN Compras';

    // Update logo
    const logoEl = document.getElementById('store-logo');
    if (storeConfig.logo_url) {
        logoEl.innerHTML = `<img src="${storeConfig.logo_url}" alt="${storeConfig.nome_loja}" style="height: 40px;">`;
    } else {
        logoEl.textContent = storeConfig.nome_loja || 'GWN Compras';
    }

    // Update banner
    if (storeConfig.banner_principal) {
        document.getElementById('main-banner').innerHTML = `<img src="${storeConfig.banner_principal}" alt="Banner">`;
    }

    // Update footer
    document.getElementById('footer-text').textContent = storeConfig.rodape_texto || '© 2024 GWN Compras';

    // Update colors
    if (storeConfig.cor_primaria) {
        document.documentElement.style.setProperty('--primary-color', storeConfig.cor_primaria);
    }
    if (storeConfig.cor_secundaria) {
        document.documentElement.style.setProperty('--secondary-color', storeConfig.cor_secundaria);
    }
}

async function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '<p>Carregando produtos...</p>';

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
        console.error(error);
        return;
    }

    allProducts = data;
    renderProducts(data);
    renderCategories(data);
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');

    if (products.length === 0) {
        grid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    grid.innerHTML = products.map(product => {
        const imageUrl = product.imagens && product.imagens.length > 0
            ? product.imagens[0]
            : 'https://via.placeholder.com/250';

        const parcelas = product.parcelas || 12;
        const installmentValue = (product.preco / parcelas).toFixed(2);

        return `
            <div class="product-card">
                <a href="detalhes.html?slug=${escapeHTML(product.slug)}" class="product-link">
                    <img src="${imageUrl}" alt="${escapeHTML(product.titulo)}" class="product-image">
                </a>
                <div class="product-info">
                    <a href="detalhes.html?slug=${escapeHTML(product.slug)}" class="product-title-link">
                        <h3 class="product-title">${escapeHTML(product.titulo)}</h3>
                    </a>
                    <p class="product-price">${formatCurrency(product.preco)}</p>
                    <p class="product-installments">em ${parcelas}x ${formatCurrency(installmentValue)}</p>
                    
                    <div class="product-actions">
                        <a href="detalhes.html?slug=${escapeHTML(product.slug)}" class="btn-details" title="Ver detalhes">
                            <i class="ph ph-eye"></i>
                        </a>
                        <a href="${escapeHTML(product.afiliado_link)}" target="_blank" class="btn-buy-ml">
                            Comprar no Mercado Livre
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderCategories(products) {
    const categories = [...new Set(products.map(p => p.categoria).filter(c => c))];
    const container = document.getElementById('categories');

    // Add event listener to the existing "Todos" button
    const todosBtn = container.querySelector('[data-category="all"]');
    if (todosBtn) {
        todosBtn.addEventListener('click', filterByCategory);
    }

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.addEventListener('click', filterByCategory);
        container.appendChild(btn);
    });
}

function filterByCategory(e) {
    const category = e.target.dataset.category;

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filter products
    if (category === 'all') {
        renderProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.categoria === category);
        renderProducts(filtered);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase();

        if (query === '') {
            renderProducts(allProducts);
        } else {
            const filtered = allProducts.filter(p =>
                p.titulo.toLowerCase().includes(query) ||
                (p.descricao && p.descricao.toLowerCase().includes(query))
            );
            renderProducts(filtered);
        }
    }, 300));
}
