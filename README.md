# 🛒 GWN-Compras - E-commerce de Afiliados Mercado Livre

Sistema completo de e-commerce de afiliados com painel administrativo e integração com Supabase.

## 📋 Estrutura do Projeto

```
GWN-compras/
├── index.html              # Página inicial pública
├── detalhes.html           # Página de detalhes do produto
├── admin-login.html        # Login administrativo
├── admin-dashboard.html    # Painel de produtos
├── admin-config.html       # Configurações da loja
├── setup.sql              # Script SQL para Supabase
├── css/
│   ├── style.css          # Estilos principais
│   └── admin.css          # Estilos do admin
└── js/
    ├── supabase-client.js # Cliente Supabase
    ├── utils.js           # Funções utilitárias
    ├── auth.js            # Autenticação
    ├── index.js           # Lógica da vitrine
    ├── details.js         # Lógica de detalhes
    ├── admin-dashboard.js # CRUD de produtos
    └── admin-config.js    # Configurações
```

## 🚀 Configuração Inicial

### 1. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. Vá em **SQL Editor** e execute o arquivo `setup.sql`
3. Copie suas credenciais:
   - **Project URL**: Settings > API > Project URL
   - **Anon Key**: Settings > API > Project API keys > anon public

### 2. Configurar Credenciais

Edite o arquivo `js/supabase-client.js` e substitua:

```javascript
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_AQUI';
```

### 3. Criar Usuário Admin

No Supabase, vá em **Authentication > Users** e crie um novo usuário:
- Email: `admin@gwn.com` (ou outro de sua preferência)
- Senha: escolha uma senha segura

## 📊 Tabelas do Banco de Dados

### `products`
Armazena todos os produtos do catálogo com:
- Informações básicas (título, preço, estoque)
- Link de afiliado do Mercado Livre
- Imagens (array de URLs)
- Especificações técnicas
- Slug único para SEO

### `store_config`
Configurações globais da loja:
- Nome e logo
- Banners
- Cores personalizadas
- Texto do rodapé

## 🎯 Funcionalidades

### Área Pública (Sem Login)
- ✅ Vitrine de produtos com filtros por categoria
- ✅ Busca em tempo real
- ✅ Página de detalhes com galeria de imagens
- ✅ SEO completo (meta tags, Open Graph, JSON-LD)
- ✅ Redirecionamento para link de afiliado
- ✅ Design responsivo

### Painel Administrativo (Requer Login)
- ✅ CRUD completo de produtos
- ✅ Geração automática de slug
- ✅ Upload de múltiplas imagens via URL
- ✅ Configuração de cores e banners
- ✅ Personalização da loja

## 🔐 Segurança

- **RLS (Row Level Security)** habilitado
- Leitura pública para produtos e configurações
- Escrita restrita apenas para usuários autenticados
- Proteção de rotas administrativas

## 🌐 SEO Profissional

Cada página de produto gera automaticamente:

### Meta Tags
- `<title>` dinâmico
- `<meta name="description">`
- `<link rel="canonical">`

### Open Graph (Facebook, WhatsApp)
- `og:title`, `og:description`, `og:image`, `og:url`

### Twitter Card
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "BRL"
  }
}
```

## 📱 Como Usar

### Para Administradores

1. Acesse `admin-login.html`
2. Faça login com suas credenciais
3. No **Dashboard**, adicione produtos:
   - Preencha título (slug será gerado automaticamente)
   - Adicione preço e estoque
   - Cole o link de afiliado do Mercado Livre
   - Adicione URLs de imagens (separadas por vírgula)
4. Em **Configurações**, personalize:
   - Nome da loja
   - Logo e banners
   - Cores do tema
   - Texto do rodapé

### Para Visitantes

1. Acesse `index.html`
2. Navegue pelos produtos
3. Use filtros de categoria ou busca
4. Clique em um produto para ver detalhes
5. Clique em "COMPRAR NO MERCADO LIVRE" para ser redirecionado

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `css/style.css`:
```css
:root {
    --primary-color: #FFF159;
    --secondary-color: #333333;
    /* ... */
}
```

Ou use o painel administrativo em **Configurações**.

## 🚀 Deploy

### Opção 1: Vercel
```bash
npm install -g vercel
vercel
```

### Opção 2: Netlify
Arraste a pasta do projeto para [app.netlify.com/drop](https://app.netlify.com/drop)

### Opção 3: GitHub Pages
1. Crie um repositório no GitHub
2. Faça push do código
3. Ative GitHub Pages nas configurações

## 📝 Exemplo de Produto

```javascript
{
  "titulo": "iPhone 14 Pro 256GB Apple",
  "slug": "iphone-14-pro-256gb-apple",
  "preco": 7999.00,
  "estoque": 10,
  "categoria": "Eletrônicos",
  "marca": "Apple",
  "afiliado_link": "https://mercadolivre.com.br/...",
  "imagens": [
    "https://exemplo.com/img1.jpg",
    "https://exemplo.com/img2.jpg"
  ],
  "descricao": "iPhone 14 Pro com tela Super Retina XDR..."
}
```

## 🐛 Troubleshooting

### Produtos não aparecem
- Verifique se executou o `setup.sql`
- Confirme as credenciais em `supabase-client.js`
- Abra o Console do navegador (F12) para ver erros

### Não consigo fazer login
- Verifique se criou o usuário no Supabase Authentication
- Confirme email e senha

### Imagens não carregam
- Certifique-se de usar URLs públicas
- Teste a URL diretamente no navegador

## 📞 Suporte

Para dúvidas ou problemas, verifique:
- Console do navegador (F12)
- Logs do Supabase
- Documentação: [supabase.com/docs](https://supabase.com/docs)

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ para afiliados do Mercado Livre**
