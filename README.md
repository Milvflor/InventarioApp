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
```

### 2. Backend
0. En en path **../InventarioApp/PoolApi/**, crear un archivo de nombre **appsettings.json** con el siguiente formato:
   ```bash
      {
        "ConnectionStrings": {
          "DefaultConnection": "Server=DESKTOP-XXXXX;Database=DATABASENAME;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
        },
        "Jwt": {
          "Key": "SUPERSECRETKEY",
          "Issuer": "PoolApi",
          "Audience": "PoolClient"
        },
        "Serilog": {
          "Using": [ "Serilog.Sinks.Console" ],
          "MinimumLevel": "Information",
          "WriteTo": [
            { "Name": "Console" }
          ]
        },
        "Cors": {
          "Origins": [ "http://localhost:5173" ]
        },
      
      }
      
    ```

2. Ejecute  
   ```bash
      // Para restaurar paquetes
      dotnet restore

      // Si desea realizar remover las Migraciones existentes
      rm -rf Migrations

      // Para inicializar las bases
      dotnet ef migrations add InitialCreate

      // Para actualizar la base de datos
      dotnet ef database update

      // Para construir la App de backend
      dotnet build

      // Para ejecutar el servidor
      dotnet run
   
   ```

### 3. Frontend
1. En el path ".../InventarioApi/PoolApp/", ejecute:
    ```bash
       // Para instalar librerias
       npm install

       // Para ejecutar el front
       npm run dev
    ```




