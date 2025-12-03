# 🚀 Deploy para Vercel - GWN Compras

## Guia Completo de Deploy

### 📋 Pré-requisitos

1. **Conta na Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub, GitLab ou email

2. **Vercel CLI (Opcional)**
   ```bash
   npm install -g vercel
   ```

---

## 🎯 Método 1: Deploy via Interface Web (Recomendado)

### Passo a Passo:

#### 1️⃣ **Preparar o Repositório Git**

```bash
# Verificar status do Git
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: site responsivo pronto para deploy"

# Criar repositório no GitHub (se ainda não tiver)
# Vá para: https://github.com/new
# Nome sugerido: gwn-compras

# Adicionar remote (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/gwn-compras.git

# Enviar para GitHub
git push -u origin main
```

#### 2️⃣ **Importar na Vercel**

1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório **gwn-compras**
4. Configure o projeto:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

#### 3️⃣ **Configurar Variáveis de Ambiente**

Na página de configuração do projeto, adicione:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

⚠️ **IMPORTANTE**: Pegue esses valores no seu projeto Supabase:
- Dashboard → Settings → API

#### 4️⃣ **Deploy!**

Clique em **"Deploy"** e aguarde! 🎉

---

## 🎯 Método 2: Deploy via CLI

### Passo a Passo:

```bash
# 1. Fazer login na Vercel
vercel login

# 2. Navegar até a pasta do projeto
cd "c:\Users\luan_\Documents\ECOMERCE PROFICIONAL"

# 3. Fazer deploy
vercel

# 4. Responder às perguntas:
# - Set up and deploy? Yes
# - Which scope? (sua conta)
# - Link to existing project? No
# - Project name? gwn-compras
# - In which directory is your code located? ./
# - Want to override settings? No

# 5. Deploy para produção
vercel --prod
```

---

## ⚙️ Configurar Variáveis de Ambiente via CLI

```bash
# Adicionar variáveis de ambiente
vercel env add SUPABASE_URL
# Cole a URL do Supabase quando solicitado

vercel env add SUPABASE_ANON_KEY
# Cole a chave anon quando solicitado

# Fazer novo deploy com as variáveis
vercel --prod
```

---

## 🔧 Arquivos Criados para Deploy

### ✅ `vercel.json`
Configuração da Vercel com:
- Rotas para páginas de produtos
- Headers de segurança
- Configuração de build

### ✅ `package.json`
Metadados do projeto e scripts úteis

### ✅ `.gitignore`
Já configurado para não enviar arquivos sensíveis

---

## 🌐 Após o Deploy

### 1. **Domínio Personalizado (Opcional)**

Na dashboard da Vercel:
1. Vá em **Settings** → **Domains**
2. Adicione seu domínio customizado
3. Configure os DNS conforme instruções

### 2. **Configurar Supabase**

Adicione o domínio da Vercel nas configurações do Supabase:
1. Dashboard Supabase → Authentication → URL Configuration
2. Adicione: `https://seu-projeto.vercel.app`

### 3. **Testar o Site**

Acesse a URL fornecida pela Vercel e teste:
- ✅ Página inicial
- ✅ Detalhes do produto
- ✅ Admin login
- ✅ Responsividade (mobile/tablet/desktop)

---

## 🔄 Atualizações Futuras

### Deploy Automático

Toda vez que você fizer push para o GitHub, a Vercel fará deploy automaticamente!

```bash
# Fazer alterações no código
git add .
git commit -m "feat: nova funcionalidade"
git push

# A Vercel detecta e faz deploy automaticamente! 🚀
```

### Deploy Manual

```bash
# Deploy de preview (para testar)
vercel

# Deploy de produção
vercel --prod
```

---

## 📊 Monitoramento

### Analytics da Vercel

A Vercel fornece analytics gratuitos:
- Visualizações de página
- Performance
- Erros
- Origem dos visitantes

Acesse em: **Dashboard → Analytics**

---

## 🐛 Troubleshooting

### Problema: "Build Failed"
**Solução**: Este é um site estático, não precisa de build. Verifique se deixou o Build Command vazio.

### Problema: "404 Not Found"
**Solução**: Verifique se o `vercel.json` está na raiz do projeto.

### Problema: "Supabase não conecta"
**Solução**: 
1. Verifique as variáveis de ambiente na Vercel
2. Atualize `js/supabase-client.js` se necessário
3. Adicione o domínio Vercel no Supabase

### Problema: "Páginas de produto não funcionam"
**Solução**: O `vercel.json` já está configurado com as rotas corretas. Faça redeploy.

---

## 📝 Checklist Final

Antes de fazer deploy, verifique:

- [ ] Código commitado no Git
- [ ] `.env` não está no repositório (está no .gitignore)
- [ ] `vercel.json` criado
- [ ] `package.json` criado
- [ ] Credenciais do Supabase prontas
- [ ] Testado localmente

---

## 🎉 Pronto!

Seu site estará disponível em:
- **Preview**: `https://gwn-compras-xxx.vercel.app`
- **Produção**: `https://gwn-compras.vercel.app`

### Links Úteis:
- 📚 [Documentação Vercel](https://vercel.com/docs)
- 🎯 [Dashboard Vercel](https://vercel.com/dashboard)
- 💬 [Suporte Vercel](https://vercel.com/support)

---

**Boa sorte com seu e-commerce! 🚀🛒**
