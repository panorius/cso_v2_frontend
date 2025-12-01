# ---- base ----
  FROM node:24-alpine AS base
  WORKDIR /app
  COPY package.json package-lock.json ./
  COPY apps/frontend/package.json apps/frontend/
  COPY packages/package.json packages/
  RUN npm ci
  
  # ---- dev ----
  FROM base AS dev
  WORKDIR /app
  # COPY . .
  # EXPOSE 3000
  # CMD ["npm","run","-w","frontend","dev"]
  EXPOSE 3000
  CMD ["npm", "run", "dev"]
  
  # ---- build ----
  FROM base AS build
  WORKDIR /app
  COPY . .
  RUN npm run -w frontend build
  
  # ---- prod ----
  FROM node:24-alpine AS prod
  WORKDIR /app
  COPY --from=build /app/package.json /app/package-lock.json ./
  COPY --from=build /app/apps/frontend/.next apps/frontend/.next
  COPY --from=build /app/apps/frontend/public apps/frontend/public
  COPY --from=build /app/apps/frontend/package.json apps/frontend/
  COPY --from=build /app/packages packages
  RUN npm ci --omit=dev
  EXPOSE 3000
  CMD ["npm","run","-w","frontend","start"]