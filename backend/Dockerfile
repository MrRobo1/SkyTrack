# Utilise une image officielle Node.js comme base
FROM node:20.11.0-alpine

# Installer curl pour les healthchecks
RUN apk add --no-cache curl
RUN corepack enable pnpm
RUN corepack prepare pnpm@9.7.0 --activate

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installer PNPM et les dépendances
RUN pnpm install

# Copier tout le code source
COPY . .

# Commande pour démarrer l'application
CMD pnpm start