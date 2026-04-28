const fs = require('fs');

const envContent = `# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Insights Jobs AI
AUTHOR_NAME=Breno Teodomiro

# Database (MongoDB) - opcional para visualização
DATABASE_URL=mongodb+srv://placeholder:placeholder@cluster.mongodb.net/placeholder?retryWrites=true&w=majority

# Clerk Auth (valores fake para desenvolvimento sem auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# SEO & Analytics (opcional)
NEXT_PUBLIC_SITE_DESCRIPTION=Agentes Estratégicos de Negócio
NEXT_PUBLIC_SITE_KEYWORDS=IA, consultoria, agentes inteligentes
`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ Arquivo .env.local criado com sucesso!');
console.log('✅ Configurado para executar SEM autenticação (modo visualização)');
