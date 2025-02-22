## 👋 ¡Bienvenido/a! 👋

Estamos encantados de presentaros a Cuca, nuestro proyecto de chatbot emocional y empático open source construido con Next.js! El objetivo de esta aplicación es proporcionar una experiencia de conversación más humana, capaz de reconocer y responder a diferentes estados emocionales del usuario. 
Antes de seguir, agradecer a Kelea por el maravilloso reto y ojalá la tecnología siga avanzando para cuidar de las personas ☺️.

A continuación, encontrarás toda la información necesaria para empezar a usar y desarrollar este proyecto.

## 📖 Descripción general 📖

Este proyecto ha sido creado utilizando Next.js y bootstrapped con create-next-app. Se basa en un enfoque modular, con rutas en la carpeta app/ y componentes en components/. Además, incorpora Tailwind CSS para el estilizado y, opcionalmente, una integración con bases de datos o servicios de terceros para procesar y almacenar la información relevante de las conversaciones.

## ⚠️ Requisitos previos ⚠️

- Node.js (versión 14 o superior)
- npm, Yarn, pnpm o Bun 
- Conexión a una base de datos (ej. MongoDB o PostgreSQL) si quieres persistir las conversaciones o perfiles de usuario


## Cómo empezar

# 🛸 Clona el repositorio 🛸
```bash
git clone https://github.com/sergiopuertas/HackUDC25.git
cd HackUDC25
```

# 💀 Instala las dependencias 💀

```bash
npm install # con npm

yarn install # con yarn

pnpm install # con pnp

bun install # con bun
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🗂️ Estructura de carpetas 🗂️
```app/```
Contiene las rutas y páginas de la aplicación. El archivo principal a modificar es app/page.tsx para la página de inicio.

```components/```
Contiene los componentes reutilizables del chatbot y otras partes de la UI.

```fonts/```
Ubicación de fuentes personalizadas, en caso de que desees añadir fuentes adicionales.

```lib/```
Librerías y funciones auxiliares que pueden usarse en toda la aplicación (ej: funciones para manejar la lógica de empatía del chatbot).

```models/```
Archivos relacionados con los modelos de datos o la integración con bases de datos.

```public/```
Archivos estáticos que Next.js servirá directamente (imágenes, íconos, etc.).

```types/```
Definiciones de TypeScript (interfaces, tipos, etc.) que facilitan el tipado en todo el proyecto.


## 🚀 Desplegar en Vercel 🚀

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 💪 Contribuciones 💪
¡Las contribuciones son siempre bienvenidas! Si quieres colaborar:

1. Haz un fork del repositorio.
2. Crea una branch para tu nueva característica o corrección de bug:

```git checkout -b feature/su-feature```

3. Realiza tus cambios y haz commit de ellos:
```git commit -m "Añadida su feature"```

4. Haz push a la rama:
   
```git push origin feature/su-feature```

5. Abre un Pull Request en GitHub y describe los cambios que hiciste.

## 🪪 Licencia 🪪

Este proyecto se distribuye bajo la licencia GLP3 (GNU General Public License).

## ✍️ Autores ✍️

Fernando Álvarez Rodríguez de Legísima
Xabier Xoán Carricoba Muñoa
Sergio Puertas Pérez

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
