const { Boardgame, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id,
        }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not Logged In');
    },
    users: async () => {
      return await User.find();
    },
    boardgames: async () => {
      return await Boardgame.find();
    },
    boardgame: async (parent, args, context, info) => {
      return await Boardgame.findOne({ args });
    },
    results: async (parent, args, context, info) => {
      const group = args.input.filter

      console.log(group)

      let boardgames = await Boardgame.find();

      if (Object.keys(group).length === 0) {
        return boardgames;
      }

      const genreFilter = group.genre
      const playTimeFilter = group.playTime
      const playerCountFilter = group.playerCount
      const ageFilter = group.age


      if (genreFilter) {
        boardgames = boardgames.filter((item) => item.genre === group.genre)
      }

      if (playTimeFilter) {
        boardgames = boardgames.filter((item) => item.playTime === group.playTime)
      }

      if (playerCountFilter) {
        boardgames = boardgames.filter((item) => item.playerCount === group.playerCount)
      }

      if(ageFilter) {
        boardgames = boardgames.filter((item) => item.age === group.age)
      }

      return boardgames;
    }
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
      return { token, user };
    },
    addBoardgame: async (parent, args, context) => {
      if (context.user) {
        const boardgame = await Boardgame.create(args);

        return boardgame;
      } else {
        throw new AuthenticationError('Must be logged in!');
      }
    },
  },
};

module.exports = resolvers;
