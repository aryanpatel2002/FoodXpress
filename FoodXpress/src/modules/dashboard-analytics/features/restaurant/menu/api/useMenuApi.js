import api from '../../../../lib/axios'

export function useMenuApi() {
  const getAll = (restaurantId) => 
    api.get(`/menu-items?restaurantId=${restaurantId}`)

  const getById = (id) => 
    api.get(`/menu-items/${id}`)

  const create = (data) => 
    api.post('/menu-items', data)

  const update = (id, data) => 
    api.put(`/menu-items/${id}`, data)

  const deleteItem = (id) => 
    api.delete(`/menu-items/${id}`)

  return { getAll, getById, create, update, deleteItem }
}


