# Usar uma imagem base oficial do Node.js
FROM node:20

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código do projeto para o diretório de trabalho no contêiner
COPY . .

# Expor a porta que o aplicativo irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
