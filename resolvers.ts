
import {Collection,ObjectId}from"mongodb"
import type {vuelo,vueloModel}from"./types.ts"
import {fromModeltoVuelo}from"./utils.ts"


export const resolvers={
    Query:{
        getFlights:async(
            _:unknown,
            args:{origen:string,destino:string},
            context:{vuelosCollection:Collection<vueloModel>}
        ):Promise<vuelo[]>=>{
            if(args.destino && args.origen){
                const vuelos = await context.vuelosCollection.find(args).toArray();
                return vuelos.map((vuelo)=>fromModeltoVuelo(vuelo));
            }
            else if(args.destino && !args.origen){
                const vuelos = await context.vuelosCollection.find({destino:args.destino}).toArray();
                return vuelos.map((vuelo)=>fromModeltoVuelo(vuelo))
            }
            else if(!args.destino && args.origen){
                const vuelos = await context.vuelosCollection.find({origen:args.origen}).toArray();
                return vuelos.map((vuelo)=>fromModeltoVuelo(vuelo))
            }
            const vuelos = await context.vuelosCollection.find().toArray();
            return vuelos.map((vuelo)=>fromModeltoVuelo(vuelo))
        },
        getFlight:async(
            _:unknown,
            {id}:{id:string},
            context:{vuelosCollection:Collection<vueloModel>}
        ):Promise<vuelo|null> =>{
            const vuelo = await context.vuelosCollection.findOne({_id:new ObjectId(id)});
            if(!vuelo){
                return null;
            }
            return fromModeltoVuelo(vuelo)
        },
    },
    Mutation:{
        addFlight:async(
            _:unknown,
            args:{origen:string,destino:string,fechayHora:string},
            context:{vuelosCollection:Collection<vueloModel>},
        ):Promise<vuelo>=>{
            const {insertedId} = await context.vuelosCollection.insertOne({
                origen:args.origen,
                destino:args.destino,
                fechayHora: args.fechayHora,
            });

            const vueloInsertado = {
                id:insertedId.toString(),
                origen:args.origen,
                destino:args.origen,
                fechayHora:args.fechayHora,
            }
            return vueloInsertado;
        }
    }
}