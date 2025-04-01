#!/bin/sh
echo "Starting container..."

pnpm run seed:airplane
pnpm run seed:airport

pnpm start