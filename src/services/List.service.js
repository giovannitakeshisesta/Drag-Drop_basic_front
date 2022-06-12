import createHttp from './BaseService'

const http = createHttp(true)

export const create = (data)   => http.post ('/list',data)
export const findAll = ()      => http.get  ('/list' )

// single column
export const findAllDND = ()   => http.get  ('/dndlist' )
export const patchDND = (data) => http.patch(`/dndlist/`,data)

// multiple column
export const findAllDNDMultiple = ()   => http.get  ('/dndmultiple' )
export const patchDNDmultiple = (data) => http.patch(`/dndmultiple/`,data)




