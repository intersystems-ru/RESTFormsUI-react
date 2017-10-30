import rest from './rest';
import { server } from "./config";

class CatalogApi {

  // get list of all available catalogs
  static getAllCatalogs() {
    return rest({
      method: 'get',
      url: `${server}/form/info`,
      params: {
        size: 5000
      }
    });
  }

  // get full metadata of specified catalog
  static getCatalogInfo(catalogClass) {
    return rest({
      method: 'get',
      url: `${server}/form/info/${catalogClass}`
    });
  }

  // get <size> objects of specified catalog
  static getCatalogExtent(catalogClass) {
    return rest({
      method: 'get',
      url: `${server}/form/objects/${catalogClass}/info`,
      params: {
        size: 5000
      }
    });
  }

  // get <size> objects of specified catalog with _class property
  static getCatalogExtendWithClass(catalogClass) {
    return rest({
      method: 'get',
      url: `${server}/form/objects/${catalogClass}/infoclass`,
      params: {
        size: 5000,
        orderby: 'name'
      }
    });
  }

  // get object by catalog and id
  static getFormObjectById(catalogClass, id) {
    return rest({
      method: 'get',
      url: `${server}/form/object/${catalogClass}/${id}`
    });
  }

  static updateObject(catalogClass, id, catalog) {
    return rest({
      method: 'put',
      url: `${server}/form/object/${catalogClass}/${id}`,
      data: catalog
    });
  }

  static saveObject(catalogClass, catalog) {
    return rest({
      method: 'post',
      url: `${server}/form/object/${catalogClass}`,
      data: catalog
    });
  }

  static deleteObject(catalogClass, id) {
    return rest({
      method: 'delete',
      url: `${server}/form/object/${catalogClass}/${id}`
    });
  }

}

export default CatalogApi;
