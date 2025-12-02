
let currentProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.getElementById('product-form').addEventListener('submit', handleFormSubmit);

    // Auto-generate slug
    document.getElementById('titulo').addEventListener('input', (e) => {
        const slugInput = document.getElementById('slug');
        if (!document.getElementById('product-id').value) { // Only if creating new
            slugInput.value = stringToSlug(e.target.value);
        }
    });
});

async function loadProducts() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        alert('Erro ao carregar produtos: ' + error.message);
        return;
    }

    currentProducts = data;
    renderProducts(data);
}

function renderProducts(products) {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');
        const imgUrl = product.imagens && product.imagens.length > 0 ? product.imagens[0] : 'https://via.placeholder.com/50';

        tr.innerHTML = `
            <td><img src="${imgUrl}" alt="${product.titulo}" class="thumb"></td>
            <td>${product.titulo}</td>
            <td>${formatCurrency(product.preco)}</td>
            <td>${product.estoque}</td>
            <td>
                <button class="btn-icon" onclick="editProduct('${product.id}')"><i class="ph ph-pencil"></i></button>
                <button class="btn-icon delete" onclick="deleteProduct('${product.id}')"><i class="ph ph-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal(mode, productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('modal-title');

    modal.style.display = 'block';

    if (mode === 'new') {
        title.textContent = 'Novo Produto';
        form.reset();
        document.getElementById('product-id').value = '';
    }
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

async function editProduct(id) {
    const product = currentProducts.find(p => p.id === id);
    if (!product) return;

    openModal('edit');
    document.getElementById('modal-title').textContent = 'Editar Produto';
    document.getElementById('product-id').value = product.id;
    document.getElementById('titulo').value = product.titulo;
    document.getElementById('slug').value = product.slug;
    document.getElementById('preco').value = product.preco;
    document.getElementById('parcelas').value = product.parcelas || 12;
    document.getElementById('estoque').value = product.estoque;
    document.getElementById('afiliado_link').value = product.afiliado_link;
    document.getElementById('categoria').value = product.categoria || '';
    document.getElementById('marca').value = product.marca || '';
    document.getElementById('descricao').value = product.descricao || '';
    document.getElementById('imagens').value = product.imagens ? product.imagens.join(', ') : '';
}

async function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        alert('Erro ao excluir: ' + error.message);
    } else {
        loadProducts();
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const titulo = document.getElementById('titulo').value;
    const slug = document.getElementById('slug').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const parcelas = parseInt(document.getElementById('parcelas').value);
    const estoque = parseInt(document.getElementById('estoque').value);
    const afiliado_link = document.getElementById('afiliado_link').value;
    const categoria = document.getElementById('categoria').value;
    const marca = document.getElementById('marca').value;
    const descricao = document.getElementById('descricao').value;
    const imagensStr = document.getElementById('imagens').value;

    const imagens = imagensStr.split(',').map(url => url.trim()).filter(url => url.length > 0);

    const productData = {
        titulo,
        slug,
        preco,
        parcelas,
        estoque,
        afiliado_link,
        categoria,
        marca,
        descricao,
        imagens
    };

    let error;

    if (id) {
        // Update
        const { error: updateError } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id);
        error = updateError;
    } else {
        // Insert
        const { error: insertError } = await supabase
            .from('products')
            .insert([productData]);
        error = insertError;
    }

    if (error) {
        alert('Erro ao salvar: ' + error.message);
    } else {
        closeModal();
        loadProducts();
    }
}

// Close modal if clicked outside
window.onclick = function (event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        closeModal();
    }
}
