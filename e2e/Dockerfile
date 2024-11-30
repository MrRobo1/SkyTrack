FROM mcr.microsoft.com/playwright

RUN corepack enable pnpm
RUN corepack prepare pnpm@9.7.0 --activate
WORKDIR /app

COPY package.json package.json

RUN pnpm i

COPY . .
CMD pnpm playwright test