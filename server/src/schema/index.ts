import todos from "../data/todos.json";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

// Todo Type
const TodoType = new GraphQLObjectType({
  name: "Todos",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    task: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent: any, args: any) {
        return todos;
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        return todos.find((todo: any) => todo.id === args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addTodo: {
      type: TodoType,
      args: {
        task: { type: GraphQLString },
      },
      resolve(parent: any, args: any) {
        const todo = {
          id: String(todos.length + 1),
          task: args.task,
          completed: false,
        };
        todos.push(todo);
        return todo;
      },
    },
    removeTodo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        const index = todos.findIndex((todo: any) => todo.id === args.id);
        if (index === -1) {
          throw new Error(`Todo with ID ${args.id} does not exist`);
        }
        return todos.splice(index, 1)[0];
      },
    },
    updateTodo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        const index = todos.findIndex((todo: any) => todo.id === args.id);
        if (index !== -1) {
          todos[index].completed = !todos[index].completed;
        }
        return todos[index];
      },
    },
  }),
});

const root = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default root;
