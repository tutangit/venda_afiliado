
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    document.getElementById('config-form').addEventListener('submit', handleConfigSubmit);
});

async function loadConfig() {
    const { data, error } = await supabase
        .from('store_config')
        .select('*')
        .limit(1)
        .single();

    if (error) {
        console.error('Erro ao carregar configurações:', error);
        return;
    }

    if (data) {
        document.getElementById('config-id').value = data.id;
        document.getElementById('nome_loja').value = data.nome_loja || '';
        document.getElementById('logo_url').value = data.logo_url || '';
        document.getElementById('banner_principal').value = data.banner_principal || '';
        document.getElementById('banner_promocao').value = data.banner_promocao || '';
        document.getElementById('cor_primaria').value = data.cor_primaria || '#FFF159';
        document.getElementById('cor_secundaria').value = data.cor_secundaria || '#333333';
        document.getElementById('rodape_texto').value = data.rodape_texto || '';
    }
}

async function handleConfigSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('config-id').value;
    const configData = {
        nome_loja: document.getElementById('nome_loja').value,
        logo_url: document.getElementById('logo_url').value,
        banner_principal: document.getElementById('banner_principal').value,
        banner_promocao: document.getElementById('banner_promocao').value,
        cor_primaria: document.getElementById('cor_primaria').value,
        cor_secundaria: document.getElementById('cor_secundaria').value,
        rodape_texto: document.getElementById('rodape_texto').value,
        updated_at: new Date().toISOString()
    };

    const { error } = await supabase
        .from('store_config')
        .update(configData)
        .eq('id', id);

    const message = document.getElementById('save-message');

    if (error) {
        message.textContent = 'Erro ao salvar: ' + error.message;
        message.style.color = 'var(--danger)';
    } else {
        message.textContent = '✓ Configurações salvas com sucesso!';
        message.style.color = 'var(--success)';
        setTimeout(() => {
            message.textContent = '';
        }, 3000);
    }
}
