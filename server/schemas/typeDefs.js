const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        password: String
        firstName: String
        lastName: String
    }

    type Boardgame {
        _id: ID
        name: String
        genre: String
        playTime: Int
        playerCount: String
        age: Int

    }

    type UserAuth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        boardgames: [Boardgame]
    }

    type Mutation {
        addUser(email: String!, password: String!, firstName: String!, lastName: String!): User
        login(email: String!, password: String!): UserAuth
        addBoardgame(name: String!, genre: String!, playTime: Int!, playerCount: Int!, age: Int!): Boardgame
    }
`;

module.exports = typeDefs;