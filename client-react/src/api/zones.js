import {apiCRM} from '../util/Api'

export const getZonas = () => {
  return apiCRM.get('/zonas').then(res => {
    return res.data
  })
}
