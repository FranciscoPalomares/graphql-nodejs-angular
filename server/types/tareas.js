export default `

  type Tarea{
    _id:ID!
    title: String!
    desc: String!
    createdAt:String
  }


  type Query{
    allTareas: [Tarea]!
    getTarea(_id:ID!):Tarea!
  }

  type Mutation{
    createTarea(title: String!, desc: String!): Tarea!
  }


`;