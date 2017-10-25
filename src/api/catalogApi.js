import axios from 'axios';
import { server } from "./config";

class CatalogApi {

  // get list of all available catalogs
  static getAllCatalogs() {
    return axios({
      method: 'get',
      url: `${server}/form/info`,
      params: {
        size: 5000
      }
    });
  }

  // get full metadata of specified catalog
  static getCatalogInfo(catalogClass) {
    return axios({
      method: 'get',
      url: `${server}/form/info/${catalogClass}`
    });
  }

  // get <size> objects of specified catalog
  static getCatalogExtent(catalogClass) {
    return axios({
      method: 'get',
      url: `${server}/form/objects/${catalogClass}/info`,
      params: {
        size: 5000
      }
    });
  }

  // get <size> objects of specified catalog with _class property
  static getCatalogExtendWithClass(catalogClass) {
    return axios({
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
    return axios({
      method: 'get',
      url: `${server}/form/object/${catalogClass}/${id}`
    });
  }


  static saveCatalog(catalogClass, id, catalog) {
    return axios({
      method: 'put',
      url: `${server}/form/object/${catalogClass}/${id}`,
      data: catalog
    });
  }
}

export default CatalogApi;
