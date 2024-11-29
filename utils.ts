import type{vuelo,vueloModel}from"./types.ts"


export const fromModeltoVuelo =(vuelo: vueloModel):vuelo=>{
    return{
        id:vuelo._id!.toString(),
        origen:vuelo.origen,
        destino:vuelo.destino,
        fechayHora:vuelo.fechayHora
    }
}