# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instalar dependências (somente de produção)
RUN npm ci --omit=dev && npm cache clean --force

# Copiar o restante dos arquivos do projeto
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
