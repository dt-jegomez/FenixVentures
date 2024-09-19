FROM node:21-bullseye

WORKDIR /usr/src/app

# Instalar dependencias del sistema necesarias para sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

#RUN npm install sqlite3 --save
# Instalar todas las dependencias
RUN npm install

# Instalar sqlite3 específicamente
##RUN npm install sqlite3 --build-from-source

COPY . .
