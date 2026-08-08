export class ServicesService {
  constructor(repository) {
    this.repository = repository;
  }

  // async getServicesByName(name) {
  //   const cleanName = name.replace(/['"]+/g, "");
  //   // Convertimos el parámetro de búsqueda a minúsculas
  //   const queryName = cleanName.toLowerCase();

  //   return await this.repository.getServicesByName(queryName);
  // }

  // async getServicesByAvailable(available) {
  //   const availableBool = available === "true";
  //   return await this.repository.getServicesByAvailable(availableBool);
  // }

  // async getServicesByCategory(category) {
  //   const cleanCategory = category.replace(/['"]+/g, "");

  //   // Convertimos el parámetro de búsqueda a minúsculas
  //   const queryCategory = cleanCategory.trim().toLowerCase();

  //   return await this.repository.getServicesByCategory(queryCategory);
  // }

  // async getServices() {
  //   return await this.repository.getServices();
  // }
  
async getServices(queryParams = {}) {
    const { name, category, available, page = 1, limit = 10, sort } = queryParams;

    // Normalización y preparación de opciones
    const options = {
      filters: {},
      pagination: {
        page: Math.max(1, parseInt(page, 10) || 1),
        limit: Math.max(1, parseInt(limit, 10) || 10)
      },
      sort: null
    };

    // 1. Filtro por nombre
    if (name) {
      options.filters.name = name.replace(/['"]+/g, "").trim();
    }

    // 2. Filtro por categoría
    if (category) {
      options.filters.category = category.replace(/['"]+/g, "").trim().toLowerCase();
    }

    // 3. Filtro por disponibilidad
    if (available !== undefined) {
      options.filters.available = available === "true";
    }

    // 4. Ordenamiento por precio (asc / desc)
    if (sort) {
      options.sort = sort.toLowerCase() === "desc" ? -1 : 1;
    }

    return await this.repository.getServices(options);
  }
  async getServiceById(id) {
    return await this.repository.getServiceById(id);
  }

  async addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;

    // Validación estricta de campos obligatorios
    if (
      name === undefined ||
      description === undefined ||
      duration === undefined ||
      price === undefined ||
      category === undefined ||
      available === undefined
    ) {
      throw new Error(
        "❌ Error: Todos los campos son obligatorios (name, description, duration, price, category, available).",
      );
    }

    return await this.repository.addService(serviceData);
  }

  async updateService(id, updateData) {
    return await this.repository.updateData(id, updateData);
  }

  async deleteService(id) {
    return await this.repository.deleteService(id);
  }
}
