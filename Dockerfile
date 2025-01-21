# Use uma imagem base do Node.js com Alpine para um tamanho menor
FROM node:18-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar apenas os arquivos essenciais para o build inicial
COPY package.json package-lock.json ./

# Atualizar o NPM e instalar dependências
RUN npm install -g npm@11.0.0 \
    && npm ci --omit=dev || npm install --omit=dev \
    && npm cache clean --force

# Copiar todos os arquivos do projeto
COPY . .

# Configurar variáveis de ambiente
ENV PORT=3000
ENV NODE_ENV=production

# Build da aplicação (se necessário)
RUN npm run build

# Expor a porta que será usada pela aplicação
EXPOSE $PORT

# Comando para iniciar o servidor
CMD ["npm", "start"]
