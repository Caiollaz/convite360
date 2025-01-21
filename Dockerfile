# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV MERCADO_PAGO_ACCESS_TOKEN="APP_USR-5897040864811365-012022-806610eb5b276627fb9c111e2e40790c-296706365"
ENV NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY="APP_USR-dac12363-d857-4957-8de2-4c6b97ca352e"
ENV MERCADO_PAGO_WEBHOOK_SECRET="ad2532f84589e980228597a1a5c042924016b0f14b98e1dd9dd7bb5d2d739ace"

# Copiar o package.json e package-lock.json para a imagem
COPY package*.json ./

# Instalar as dependências
RUN npm ci --omit=dev

# Copiar o restante dos arquivos do projeto
COPY . .

# Rodar o build da aplicação
RUN npm run build

# Expor a porta que será usada pela aplicação
EXPOSE 3000

# Rodar o Next.js em produção
CMD ["npm", "start"]
