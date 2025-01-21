# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos essenciais para instalação de dependências
COPY package.json package-lock.json ./

# Configurar cache para dependências do NPM (para builds mais rápidos)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev \
    && npm cache clean --force

# Copiar o restante dos arquivos do projeto para o contêiner
COPY . .

# Configuração de variáveis de ambiente (ajuste conforme necessário)
ENV PORT=3000
ENV NODE_ENV=production

# Build da aplicação (se necessário)
RUN npm run build

# Expõe a porta que o app usa
EXPOSE $PORT

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
