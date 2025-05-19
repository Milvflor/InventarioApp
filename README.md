# Sistema de Inventario - Fullstack (.NET + React)

Este proyecto es una aplicación fullstack para gestionar productos y lotes de inventario. El backend está desarrollado con **ASP.NET Core** y el frontend con **React**.

## Estructura del proyecto
```
PoolApi (Backend)
├───Config
├───Controllers
├───Data
├───DTOs
├───Entities
├───Middlewares
├───Properties
├───Repositories
├───Program.cs
├───...
PoolApp (FrontEnd)
   └───src
        ├───assets
        ├───components
        │   └───modals
        ├───features
        │   ├───auth
        │   ├───dashboard
        │   ├───lotes
        │   ├───products
        │   └───users
        ├───hooks
        ├───layouts
        ├───pages
        ├───routes
        ├───services
        └───utils ...
```

---

## Requisitos

- [.NET 8 SDK o superior](https://dotnet.microsoft.com/en-us/download)
- [Node.js (v22 recomendado)](https://nodejs.org/)
- [SQL Server (local o remoto)]
- Un IDE como [Visual Studio](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone  https://github.com/Milvflor/InventarioApp.git
cd InventarioApp

