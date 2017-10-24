import axios from 'axios';
import { server } from "./config";

class CatalogApi {

  static getAllCatalogs() {
    return axios(
      {
        method: 'get',
        url: `${server}/form/info`,
        params: {
          size: 5000
        }
      }
    );
  }

  static getCatalogInfo(catalogClass) {
    return axios.get(`${server}/form/info/${catalogClass}`);
  }

  static getCatalogExtent(catalogClass) {
    return axios.get(`${server}/form/objects/${catalogClass}/info?size=500`);
  }

  static getCatalogExtendWithClass(catalogClass) {
    return axios.get(`${server}/form/objects/${catalogClass}/infoclass?size=500&orderby=name`);
  }

  static getFormObjectById(catalogClass, id) {
    return axios.get(`${server}/form/object/${catalogClass}/${id}`);
  }

  static saveCatalog(catalogClass, id, catalog) {
    return axios.put(`${server}/form/object/${catalogClass}/${id}`, catalog);
  }
}

export default CatalogApi;
