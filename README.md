# 🛠️ Módulo de Servicios - Documentación de API

Este módulo permite la gestión completa (CRUD) de los servicios del sistema de turnos y reservas, incluyendo capacidades avanzadas de búsqueda, filtrado combinado, paginación y ordenamiento.



## Base URL
http
http://localhost:8080/api/services

Endpoints
## 1. Obtener Servicios (Listado con Filtros, Paginación y Orden)Permite consultar la lista de servicios. Soporta parámetros de consulta (Query Parameters) opcionales que se pueden usar de forma individual o combinada.

Método: GET
URL: /api/services
Query Parameters:

| Parámetro | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `category` | `string` | Filtra por categoría (búsqueda parcial, insensible a mayúsculas). | `salud` |
| `available` | `boolean` | Filtra por estado de disponibilidad (`true` o `false`). | `true` |
| `name` | `string` | Búsqueda por coincidencia en el nombre. | `masaje` |
| `page` | `number` | Número de página a consultar (por defecto: `1`). | `1` |
| `limit` | `number` | Cantidad de registros por página (por defecto: `10`). | `5` |
| `sort` | `string` | Ordena por precio (`asc` para ascendente, `desc` para descendente). | `asc` |

## Ejemplos de Petición

Obtener todos (paginación por defecto):GET /api/services

Filtrar por categoría:GET /api/services?category=salud

Combinación completa (Categoría + Disponibilidad + Paginación + Orden):
GET /api/services?category=estetica&available=true&page=1&limit=5&sort=asc

📥 Respuesta Exitosa (200 OK)

```json

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
```

## 2. Obtener Servicio por ID
Retorna la información detallada de un servicio específico mediante su ID único de MongoDB (_id).Método: GETURL: /api/services/:id

📥 Respuesta Exitosa (200 OK)

```json

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

``` 

## 3. Crear un Nuevo Servicio
Registra un nuevo servicio en el sistema y emite un evento en tiempo real vía WebSockets (servicio_creado).
Método: POST
URL: /api/services
Headers: Content-Type: application/json

📤 Cuerpo de la Petición (Request Body)

```json

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
```

## 4. Actualizar un Servicio
Actualiza los datos de un servicio existente. Emite un evento en tiempo real vía WebSockets (servicio_actualizado).
Método: PUT
URL: /api/services/:id
Headers: Content-Type: application/json
📤 Cuerpo de la Petición (Request Body)

```json

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

```

## 5. Eliminar un Servicio
Remueve un servicio de la base de datos por su ID. Emite un evento en tiempo real vía WebSockets (servicio_eliminado).

Método: DELETE
URL: /api/services/:id
📥 Respuesta Exitosa (200 OK)

```json

JSON
{
  "success": true,
  "message": "Dato eliminado con éxito",
  "data": {
    "_id": "66b4d3a1e1234567890abc13"
  }
}

```

Documentación de la API de Servicios y Reservas
Este documento detalla la configuración y el funcionamiento de la API, incluyendo ejemplos de uso para filtros, paginación, ordenamiento, esquemas de validación aplicados y cómo consultar reservas con la información completa de los servicios asociados.

1. Ejemplos de Filtros, Paginación y Ordenamiento
El endpoint principal para la consulta de servicios permite combinar parámetros en la Query String (GET /api/services) para filtrar los resultados de forma dinámica.

Parámetros Aceptados

|Parámetro |	Tipo	| Descripción	| Ejemplo |
| :--- | :--- | :--- | :--- |
| name	| String |	Filtro por coincidencia parcial (insensible a mayúsculas/minúsculas). |	?name=corte |
| category |	String	| Filtro por categoría (coincidencia parcial). |	?category=peluqueria |
| available	| Boolean	| Filtro por disponibilidad (true o false).	| ?available=true |
| page	| Number	| Número de página a consultar (por defecto 1).	| ?page=2 |
| limit	| Number	| Cantidad de registros por página (por defecto 10).	| ?limit=5 | 
| sort	| Number/String	| Ordenamiento por precio: 1 / asc (ascendente) o -1 / desc (descendente). |	?sort=1 |



Ejemplo Completo de Solicitud (HTTP Request)
HTTP
GET /api/services?category=peluqueria&available=true&page=1&limit=5&sort=1 HTTP/1.1
Host: api.tu-dominio.com
Content-Type: application/json
Respuesta de la API (JSON)

```json

JSON

{
  "success": true,
  "message": "Todos los servicios",
  "data": [
    {
      "_id": "60d5ecb9b3f1a21f8c8b4567",
      "name": "Corte de Cabello Caballero",
      "description": "Corte clásico o moderno con lavado incluido",
      "duration": 30,
      "price": 15.00,
      "category": "Peluquería",
      "available": true,
      "createdAt": "2023-10-01T10:00:00.000Z",
      "updatedAt": "2023-10-01T10:00:00.000Z"
    },
    {
      "_id": "60d5ecb9b3f1a21f8c8b4568",
      "name": "Corte y Peinado Dama",
      "description": "Corte personalizado y peinado básico",
      "duration": 60,
      "price": 25.00,
      "category": "Peluquería",
      "available": true,
      "createdAt": "2023-10-01T10:30:00.000Z",
      "updatedAt": "2023-10-01T10:30:00.000Z"
    }
  ],
  "pagination": {
    "totalItems": 12,
    "totalPages": 3,
    "currentPage": 1,
    "limit": 5
  }
}

```

2. Validaciones Aplicadas
Las validaciones de entrada se realizan con Zod mediante middleware previo a la llegada del controlador.

Esquema de Validación de Reservas (createBookingSchema)

| Campo | Reglas y Tipo	| Mensaje de Error | Comportamiento |
| :--- | :--- | :--- | :--- |
| clientName |	String | Obligatorio. Mínimo 2 caracteres. Limpia espacios (trim).	| "El nombre del cliente es obligatorio", "El nombre debe tener al menos 2 caracteres" |
| clientEmail |	String | Obligatorio. Formato email válido. Limpia espacios y convierte a minúsculas.	| "El email del cliente es obligatorio", "El formato del email no es válido" |
| date	| String | Obligatorio. Formato regex YYYY-MM-DD.	" | La fecha es obligatoria", "La fecha debe tener el formato YYYY-MM-DD" |
| time	| String | Obligatorio. Formato 24 Horas HH:MM.	| "La hora es obligatoria", "La hora debe tener un formato válido de 24h (HH:MM)" |
| status	| Enum: 'pending', 'confirmed', 'completed', 'cancelled'. Opcional.	| "El estado enviado no es válido".  | Valor por defecto: 'pending' |
| services	| Array de Strings (IDs de servicios Mongoose). Opcional. |	"Cada servicio debe ser un texto o ID válido". |  Valor por defecto: [] |


3. Consulta de una Reserva con Servicios Completos (populate)
Para retornar una reserva junto con la información detallada de los servicios en lugar de solo sus IDs de MongoDB, se utiliza la referencia en el esquema Mongoose (ref: 'Service') y la función .populate().

Modelo de Mongoose Recomendado para Reservas (BookingModel)
JavaScript

```js 

import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  // Referencia al modelo de Servicios para realizar Populate
  services: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Service' 
  }]
}, {
  timestamps: true
});

export const BookingModel = model('Booking', bookingSchema);
Implementación en el DAO (BookingMongoDao.js)
JavaScript
import { BookingModel } from '../models/booking.models.js';

export class BookingMongoDao {
  // Consultar una reserva por ID poblando la lista completa de servicios
  async getBookingById(id) {
    const booking = await BookingModel.findById(id)
      .populate('services') // Trae los documentos completos de la colección 'services'
      .lean();

    if (!booking) {
      throw new Error(`La reserva con ID ${id} no existe.`);
    }

    return booking;
  }
}
```


Ejemplo de Respuesta con Servicios Poblados

```json

JSON
{
  "success": true,
  "data": {
    "_id": "651a2b3c4d5e6f7a8b9c0d1e",
    "clientName": "Juan Pérez",
    "clientEmail": "juan.perez@example.com",
    "date": "2026-09-15",
    "time": "14:30",
    "status": "confirmed",
    "services": [
      {
        "_id": "60d5ecb9b3f1a21f8c8b4567",
        "name": "Corte de Cabello Caballero",
        "description": "Corte clásico o moderno con lavado incluido",
        "duration": 30,
        "price": 15.00,
        "category": "Peluquería",
        "available": true
      },
      {
        "_id": "60d5ecb9b3f1a21f8c8b4599",
        "name": "Arreglo de Barba",
        "description": "Perfilado y perfilación con toalla caliente",
        "duration": 20,
        "price": 10.00,
        "category": "Barbería",
        "available": true
      }
    ],
    "createdAt": "2026-08-09T12:00:00.000Z",
    "updatedAt": "2026-08-09T12:00:00.000Z"
  }
}

```