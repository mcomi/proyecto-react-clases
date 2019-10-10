import axios from 'axios'
import {apiCRM} from '../util/Api'

export const getAdvisors = () => {
  return apiCRM
    .get('/advisors')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAdvisorDetail = id => {
  return apiCRM
    .get(`/advisor/${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getObjetivosFromAdvisorByYear = (cvl, anio) => {
  return apiCRM
    .get(`/advisor/objetivos/${cvl}/${anio}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getVolumenCarteraPorCvl = cvl => {
  return apiCRM
    .get(`/advisor/cartera_iban/${cvl}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
