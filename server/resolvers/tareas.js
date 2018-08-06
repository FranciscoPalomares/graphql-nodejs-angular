export default {
    Query: {
      allTareas: (parent, args, {models}) => models.Tarea.find(),
      getTarea:(parent,args,{models}) => models.Tarea.findOne(args)
    },
    Mutation:{
      createTarea: (parent,args, {models})=> models.Tarea.create(args)
    }
  }