# 🛠️ Módulo de Servicios - Documentación de API

Este módulo permite la gestión completa (CRUD) de los servicios del sistema de turnos y reservas, incluyendo capacidades avanzadas de búsqueda, filtrado combinado, paginación y ordenamiento.

---

## Base URL
```http
http://localhost:8080/api/services

Endpoints
## 1. Obtener Servicios (Listado con Filtros, Paginación y Orden)Permite consultar la lista de servicios. Soporta parámetros de consulta (Query Parameters) opcionales que se pueden usar de forma individual o combinada.

Método: GET
URL: /api/services
Query Parameters:

ParámetroTipoDescripciónEjemplocategorystringFiltra por categoría (búsqueda parcial, insensible a mayúsculas).saludavailablebooleanFiltra por estado de disponibilidad (true o false).truenamestringBúsqueda por coincidencia en el nombre.masajepagenumberNúmero de página a consultar (por defecto: 1).1limitnumberCantidad de registros por página (por defecto: 10).5sortstringOrdena por precio (asc para ascendente, desc para descendente).asc

## Ejemplos de Petición

Obtener todos (paginación por defecto):GET /api/services

Filtrar por categoría:GET /api/services?category=salud

Combinación completa (Categoría + Disponibilidad + Paginación + Orden):
GET /api/services?category=estetica&available=true&page=1&limit=5&sort=asc

📥 Respuesta Exitosa (200 OK)
JSON
{
  "success": true,
  "message": "Servicios obtenidos con éxito",
  "data": [
    {
      "_id": "66b4d2f8e1234567890abc12",
      "name": "Consulta Médica General",
      "description": "Atención primaria preventiva y diagnóstico",
      "duration": 30,
      "price": 50000,
      "category": "salud",
      "available": true,
      "createdAt": "2026-08-01T10:00:00.000Z",
      "updatedAt": "2026-08-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "totalItems": 12,
    "totalPages": 3,
    "currentPage": 1,
    "limit": 5
  }
}

## 2. Obtener Servicio por ID
Retorna la información detallada de un servicio específico mediante su ID único de MongoDB (_id).Método: GETURL: /api/services/:id

📥 Respuesta Exitosa (200 OK)
JSON
{
  "success": true,
  "data": {
    "_id": "66b4d2f8e1234567890abc12",
    "name": "Consulta Médica General",
    "description": "Atención primaria preventiva y diagnóstico",
    "duration": 30,
    "price": 50000,
    "category": "salud",
    "available": true
  }
}

❌ Respuesta de Error (404 Not Found)
JSON
{
  "success": false,
  "message": "El servicio con ID 66b4d2f8e1234567890abc12 no existe."
}


## 3. Crear un Nuevo Servicio
Registra un nuevo servicio en el sistema y emite un evento en tiempo real vía WebSockets (servicio_creado).
Método: POST
URL: /api/services
Headers: Content-Type: application/json

📤 Cuerpo de la Petición (Request Body)
JSON
{
  "name": "Corte de Cabello Profesional",
  "description": "Incluye lavado y peinado",
  "duration": 45,
  "price": 35000,
  "category": "estetica",
  "available": true
}

📥 Respuesta Exitosa (201 Created)
JSON
{
  "success": true,
  "message": "Registro adicionado con éxito",
  "data": {
    "_id": "66b4d3a1e1234567890abc13",
    "name": "Corte de Cabello Profesional",
    "description": "Incluye lavado y peinado",
    "duration": 45,
    "price": 35000,
    "category": "estetica",
    "available": true,
    "createdAt": "2026-08-07T21:00:00.000Z",
    "updatedAt": "2026-08-07T21:00:00.000Z"
  }
}

## 4. Actualizar un Servicio
Actualiza los datos de un servicio existente. Emite un evento en tiempo real vía WebSockets (servicio_actualizado).
Método: PUT
URL: /api/services/:id
Headers: Content-Type: application/json
📤 Cuerpo de la Petición (Request Body)
JSON
{
  "price": 40000,
  "available": false
}
📥 Respuesta Exitosa (200 OK)
JSON
{
  "success": true,
  "message": "Dato actualizado con éxito",
  "data": {
    "_id": "66b4d3a1e1234567890abc13",
    "name": "Corte de Cabello Profesional",
    "price": 40000,
    "available": false
  }
}
## 5. Eliminar un Servicio
Remueve un servicio de la base de datos por su ID. Emite un evento en tiempo real vía WebSockets (servicio_eliminado).
Método: DELETE
URL: /api/services/:id
📥 Respuesta Exitosa (200 OK)
JSON
{
  "success": true,
  "message": "Dato eliminado con éxito",
  "data": {
    "_id": "66b4d3a1e1234567890abc13"
  }
}