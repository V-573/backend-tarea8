import { ServiceMongoDao } from "../dao/mongoDB/ServiceMongoDao.js";
import { ServiceRepository } from "../repositories/services.repository.js";
import { ServicesService } from "../services/services.service.js";

import { BookingMongoDao } from "../dao/mongoDB/BookingMongoDao.js";
import { BookingRepository } from "../repositories/bookings.repository.js";
import { BookingService } from "../services/bookings.service.js";

// 1. Instanciación para Servicios
const serviceDao = new ServiceMongoDao();
const serviceRepository = new ServiceRepository(serviceDao);
const servicesService = new ServicesService(serviceRepository);

// 2. Instanciación para Reservas
const bookingDao = new BookingMongoDao();
const bookingRepository = new BookingRepository(bookingDao);
const bookingService = new BookingService(bookingRepository, serviceRepository);


export const renderServices = async (req, res) => {
  try {

     console.log("VIEWS EN EL MOMENTO DEL RENDER:", req.app.get("views"));
    const services = await servicesService.getServices();

    // Le pasamos "src/views/services" si Express se niega a cambiar el directorio base
    res.render("services", {
      title: "Servicios Disponibles",
      services
    });
  } catch (error) {
    res.status(500).render("services", {
      title: "Error al cargar servicios",
      error: error.message
    });
  }
};


// GET /services/:sid
export const renderServiceDetail = async (req, res) => {
  try {
    const { sid } = req.params;
    // Buscamos el servicio por su ID de MongoDB
    const service = await servicesService.getServiceById(sid);

    if (!service) {
      return res.status(404).render("service-detail", {
        title: "Servicio no encontrado",
        error: "El servicio solicitado no existe."
      });
    }

    res.render("service-detail", {
      title: `Detalle - ${service.name}`,
      service
    });
  } catch (error) {
    res.status(500).render("service-detail", {
      title: "Error en la consulta",
      error: error.message
    });
  }
};

// GET /realtime-services
export const renderRealTimeServices = async (req, res) => {
  try {
    const services = await servicesService.getServices();
    
    res.render("services_realtime", {
      title: "Servicios en Tiempo Real",
      services
    });
  } catch (error) {
    res.status(500).send("Error al cargar la vista en tiempo real");
  }
};



// GET /bookings
export const renderBookings = async (req, res) => {
  try {
    // const { id } = req.params;
    const bookings = await bookingService.getBooking();

    res.render("bookings", {
      title: `Reservas`,
      bookings
    });
  } catch (error) {
    res.status(404).send("Reservas no encontradas");
  }
};


// GET /bookings/:id
export const renderBookingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);

    res.render("booking-detail", {
      title: `Detalle de reserva`,
      booking
    });
  } catch (error) {
    res.status(404).send("Reserva no encontrada");
  }
};

// GET /realtime-bookings
export const renderRealTimeBookings = async (req, res) => {
  try {
    // Obtenemos las reservas iniciales desde la base de datos
    const bookings = await bookingService.getBooking();

    // Renderizamos la vista 'bookings-realtime.handlebars'
    res.render("bookings_realtime", {
      title: "Reservas en Tiempo Real",
      reservas: bookings // Pasamos la lista inicial
    });
  } catch (error) {
    res.status(500).send("Error al cargar la vista de reservas en tiempo real");
  }
};

