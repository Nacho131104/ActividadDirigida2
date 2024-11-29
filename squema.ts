export const squema = `#graphql

type vuelo={
    id:ID!,
    origen: String!,
    destino: String!,
    fechayHora: String!,
}

type Query={
    getFlights(origen:String,destino:String):[vuelo!]!
    getFlight(id:ID!):vuelo
}
type Mutation={
    addFlight(origen:String!,destino:String!,fechayHora:String!):vuelo
}
`