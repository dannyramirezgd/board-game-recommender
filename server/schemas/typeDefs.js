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

    input BoardgameFilters {
        genre: String
        playTime: Int
        playerCount: String
        age: Int
    }
    
    input BoardgameInput {
        filter: BoardgameFilters
    }

    type Query {
        me: User
        users: [User]
        boardgames: [Boardgame]
        boardgame(id: ID!): Boardgame
        results(input: BoardgameInput): [Boardgame]!
    }

    type Mutation {
        addUser(email: String!, password: String!, firstName: String!, lastName: String!): User
        login(email: String!, password: String!): UserAuth
        addBoardgame(name: String!, genre: String!, playTime: Int!, playerCount: String!, age: Int!): Boardgame
    }
`;

module.exports = typeDefs;