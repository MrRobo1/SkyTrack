# Utilise une image officielle Node.js comme base
FROM node:20.11.0-alpine

# Installer curl pour les healthchecks
RUN apk add --no-cache curl

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json ./
COPY pnpm-lock.yaml ./

# Installer PNPM et les dépendances
RUN npm install -g pnpm && pnpm install

# Copier tout le code source
COPY . .

# Exposer le port de l'application
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["pnpm", "dev"]