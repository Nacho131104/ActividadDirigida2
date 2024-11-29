import {OptionalId}from"mongodb"

export type vuelo={
    id:string,
    origen:string,
    destino:string,
    fechayHora:string,
}

export type vueloModel=OptionalId<{
    origen:string,
    destino:string,
    fechayHora:string,
}>