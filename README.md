# 🏛️ Processa Aqui

**Plataforma completa de gestão jurídica** conectando clientes, advogados e administradores em um sistema integrado de protocolos e auditoria.

[![GitHub](https://img.shields.io/badge/GitHub-queroprocessar-blue?logo=github)](https://github.com/Aprendendo1234/queroprocessar)

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Conta no Supabase (para banco de dados)

### Instalação Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Crie o arquivo .env.local com suas credenciais do Supabase:
# VITE_SUPABASE_URL=sua_url_aqui
# VITE_SUPABASE_ANON_KEY=sua_chave_aqui

# 3. Executar em modo desenvolvimento
npm run dev

# 4. Acessar no navegador
# http://localhost:5173
```

---

## 📦 Deploy para Produção

### Arquivo ZIP Pronto
O projeto está compactado em `processa-aqui-completo.zip` (~61 KB) e pronto para hospedagem.

### Plataformas Recomendadas
- **Vercel** (recomendado) - Deploy automático com Git
- **Netlify** - Interface drag-and-drop simples
- **GitHub Pages** - Hospedagem gratuita

> [!TIP]
> Consulte o guia completo de deploy em `DEPLOY.md` para instruções detalhadas.

---

## ✨ Funcionalidades

### 👤 Para Clientes
- Criação e acompanhamento de protocolos
- Chat direto com advogados
- Histórico de processos
- Dashboard intuitivo

### ⚖️ Para Advogados
- Gestão de casos e clientes
- Sistema de auditoria de protocolos
- Chat integrado com clientes
- Análise de métricas

### 🔐 Para Administradores
- Visão completa do sistema
- Auditoria de todos os protocolos
- Gestão de usuários
- Relatórios e estatísticas

---

## 🛠️ Tecnologias

- **Frontend:** React 19 + TypeScript
- **Build:** Vite 6
- **UI:** Lucide React (ícones)
- **Backend:** Supabase (autenticação + banco de dados)
- **Gráficos:** Recharts

---

## 📂 Estrutura do Projeto

```
processa-aqui/
├── components/          # Componentes React
├── lib/                # Configurações (Supabase)
├── App.tsx             # Aplicação principal
├── constants.tsx       # Dados e constantes
├── types.ts            # Tipos TypeScript
└── vite.config.ts      # Configuração Vite
```

---

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
```

---

## 🔐 Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a URL e a chave anônima
4. Configure no arquivo `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

---

## 📄 Licença

Este projeto foi desenvolvido para uso comercial. Todos os direitos reservados.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `DEPLOY.md`
2. Revise os logs de erro no console
3. Confirme as configurações do Supabase
