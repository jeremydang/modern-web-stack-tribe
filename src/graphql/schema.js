const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

var mockData = [
    {id: 1, name: "Juliana Potter", age: "20"},
    {id: 2, name: "Cameron Sweet", age: "10"},
];
const ExampleQuery = new GraphQLObjectType({
    name: 'Example',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        example: {
            type: ExampleQuery,
            args: {id: {type: GraphQLID}},
            resolve(parents, args) {
                return mockData.find(data => data.id == args.id);
            }
        }, 
        examples: {
            type: new GraphQLList(ExampleQuery),
            resolve(parent, args) {
                return mockData;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});