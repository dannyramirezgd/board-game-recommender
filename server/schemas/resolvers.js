const { Boardgame, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id,
        })
        .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not Logged In')
    },
    users: async () => {
        return await User.find();
    },
    boardgames: async () => {
        return await Boardgame.find();
    }
    //have a query that finds just saved board games per user
    //have a query that finds the top 100 maybe? 
  },
  Mutation: {
    addUser: async (parent, args, context) => {
        const user = await User.create(args);

        return user;
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Incorrect Credentials');
        }
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect Credentials');
        }
        
        const token = signToken(user);
        return { token, user }
    },
    addBoardgame: async (parent, args, context) => {
        if(context.user){
            const boardgame = await Boardgame.create(args);

            return boardgame
        } else {
            throw new AuthenticationError('Must be logged in!')
        }
    }
  }
};

module.exports = resolvers;
