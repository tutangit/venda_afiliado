
let product = null;
let storeConfig = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadStoreConfig();
    await loadProductBySlug();
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
    const logoEl = document.getElementById('store-logo');
    if (storeConfig.logo_url) {
        logoEl.innerHTML = `<img src="${storeConfig.logo_url}" alt="${escapeHTML(storeConfig.nome_loja)}" style="height: 40px;">`;
    } else {
        logoEl.textContent = storeConfig.nome_loja || 'GWN Compras';
    }

    document.getElementById('footer-text').textContent = storeConfig.rodape_texto || '© 2024 GWN Compras';

    if (storeConfig.cor_primaria) {
        document.documentElement.style.setProperty('--primary-color', storeConfig.cor_primaria);
    }
    if (storeConfig.cor_secundaria) {
        document.documentElement.style.setProperty('--secondary-color', storeConfig.cor_secundaria);
    }
}

async function loadProductBySlug() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        showError('Produto não encontrado. Slug não informado.');
        return;
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        showError('Produto não encontrado.');
        console.error(error);
        return;
    }

    product = data;
    renderProduct();
    updateSEO();
    generateJSONLD();
}

function renderProduct() {
    const container = document.getElementById('product-container');
    const images = product.imagens && product.imagens.length > 0
        ? product.imagens
        : ['https://via.placeholder.com/500'];

    const parcelas = product.parcelas || 12;
    const installmentValue = (product.preco / parcelas).toFixed(2);

    container.innerHTML = `
        <div class="detail-layout">
            <div class="gallery">
                <img src="${images[0]}" alt="${escapeHTML(product.titulo)}" class="main-image" id="main-image">
                <div class="thumbnails">
                    ${images.map((img, idx) => `
                        <img src="${img}" 
                             alt="${escapeHTML(product.titulo)}" 
                             class="thumbnail ${idx === 0 ? 'active' : ''}" 
                             onclick="changeMainImage('${img}', ${idx})">
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-info">
                <h1>${escapeHTML(product.titulo)}</h1>
                <p class="detail-price">${formatCurrency(product.preco)}</p>
                <p class="detail-installments">em ${parcelas}x de ${formatCurrency(installmentValue)} sem juros</p>
                
                ${product.estoque > 0
            ? `<p style="color: var(--success); margin-bottom: 1rem;">✓ Estoque disponível</p>`
            : `<p style="color: var(--danger); margin-bottom: 1rem;">✗ Produto esgotado</p>`
        }
                
                <button class="btn-buy" onclick="buyProduct()">
                    COMPRAR NO MERCADO LIVRE
                </button>
                
                ${product.descricao ? `
                    <div class="detail-description">
                        <h2>Descrição</h2>
                        <p>${escapeHTML(product.descricao)}</p>
                    </div>
                ` : ''}
                
                ${renderProductSpecs()}
            </div>
        </div>
    `;
}

function renderProductSpecs() {
    const specs = [];

    if (product.marca) specs.push(`<strong>Marca:</strong> ${escapeHTML(product.marca)}`);
    if (product.modelo) specs.push(`<strong>Modelo:</strong> ${escapeHTML(product.modelo)}`);
    if (product.sku) specs.push(`<strong>SKU:</strong> ${escapeHTML(product.sku)}`);
    if (product.peso) specs.push(`<strong>Peso:</strong> ${product.peso}kg`);

    if (specs.length === 0) return '';

    return `
        <div class="detail-description">
            <h2>Especificações</h2>
            <p>${specs.join('<br>')}</p>
        </div>
    `;
}

function changeMainImage(imgUrl, idx) {
    document.getElementById('main-image').src = imgUrl;

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === idx);
    });
}

function buyProduct() {
    if (product && product.afiliado_link) {
        window.open(product.afiliado_link, '_blank');
    }
}

function showError(message) {
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <h2>${escapeHTML(message)}</h2>
            <p><a href="index.html" style="color: var(--primary-color);">Voltar para a página inicial</a></p>
        </div>
    `;
}

function updateSEO() {
    const pageUrl = window.location.href;
    const imageUrl = product.imagens && product.imagens.length > 0
        ? product.imagens[0]
        : '';
    const description = product.descricao
        ? product.descricao.substring(0, 160)
        : `Compre ${product.titulo} com o melhor preço`;

    // Update title
    document.getElementById('page-title').textContent = `${product.titulo} - ${storeConfig.nome_loja || 'GWN Compras'}`;

    // Update meta description
    document.getElementById('meta-description').setAttribute('content', description);

    // Update canonical
    document.getElementById('canonical-url').setAttribute('href', pageUrl);

    // Update Open Graph
    document.getElementById('og-title').setAttribute('content', product.titulo);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('og-image').setAttribute('content', imageUrl);
    document.getElementById('og-url').setAttribute('content', pageUrl);

    // Update Twitter Card
    document.getElementById('twitter-title').setAttribute('content', product.titulo);
    document.getElementById('twitter-description').setAttribute('content', description);
    document.getElementById('twitter-image').setAttribute('content', imageUrl);
}

function generateJSONLD() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.titulo,
        "image": product.imagens || [],
        "description": product.descricao || product.titulo,
        "sku": product.sku || product.id,
        "brand": {
            "@type": "Brand",
            "name": product.marca || storeConfig.nome_loja || "GWN Compras"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "BRL",
            "price": product.preco,
            "availability": product.estoque > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": storeConfig.nome_loja || "GWN Compras"
            }
        }
    };

    document.getElementById('product-schema').textContent = JSON.stringify(schema, null, 2);
}
