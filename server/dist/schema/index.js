"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_json_1 = __importDefault(require("../data/todos.json"));
const graphql_1 = require("graphql");
// Todo Type
const TodoType = new graphql_1.GraphQLObjectType({
    name: "Todos",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        task: { type: graphql_1.GraphQLString },
        completed: { type: graphql_1.GraphQLBoolean },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        todos: {
            type: new graphql_1.GraphQLList(TodoType),
            resolve(parent, args) {
                return todos_json_1.default;
            },
        },
        todo: {
            type: TodoType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return todos_json_1.default.find((todo) => todo.id === args.id);
            },
        },
    }),
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        addTodo: {
            type: TodoType,
            args: {
                task: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                const todo = {
                    id: String(todos_json_1.default.length + 1),
                    task: args.task,
                    completed: false,
                };
                todos_json_1.default.push(todo);
                return todo;
            },
        },
        removeTodo: {
            type: TodoType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                const index = todos_json_1.default.findIndex((todo) => todo.id === args.id);
                if (index === -1) {
                    throw new Error(`Todo with ID ${args.id} does not exist`);
                }
                return todos_json_1.default.splice(index, 1)[0];
            },
        },
        updateTodo: {
            type: TodoType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                const index = todos_json_1.default.findIndex((todo) => todo.id === args.id);
                if (index !== -1) {
                    todos_json_1.default[index].completed = !todos_json_1.default[index].completed;
                }
                return todos_json_1.default[index];
            },
        },
    }),
});
const root = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation,
});
exports.default = root;
