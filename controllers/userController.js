const { Thought, User } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            if(!user) {
                return res.status(404).json({message: 'no user found with that ID'})
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if(!user) {
                return res.status(404).json({ message: 'no user with that id'})
            }
            await Thought.deleteMany({_id: { $in: user.thoughts}})
            res.json({ message: 'User and thoughts deleted'})
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    async addFriend(req, res) {
        try {
          console.log('You are adding an friend');
          console.log(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friend: req.params.friendId } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove assignment from a student
      async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };
