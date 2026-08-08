export class ServiceRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Filtrar servicios por nombre (coincidencia parcial e insensible a mayúsculas/minúsculas)
  // async getServicesByName(name) {
  //   return await this.dao.getServicesByName(name);
  // }

  // async getServicesByAvailable(available) {
  //   return await this.dao.getServicesByAvailable(available);
  // }

  // async getServicesByCategory(category) {
  //   return await this.dao.getServicesByCategory(category);
  // }

async getServices(options){
    return await this.dao.getServices(options);
}

async getServiceById(id){
    return await this.dao.getServiceById(id)
}


async addService(serviceData){
 return await this.dao.addService(serviceData);

}

async updateData(id, updateData){

    return await this.dao.updateData(id, updateData);
}

async deleteService(id){

return await this.dao.deleteService(id);

}



}
