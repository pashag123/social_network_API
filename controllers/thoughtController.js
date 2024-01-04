const { Thought, User } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No course whith that ID" })
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
        } catch (err) {
            console.log(err)
            res.status(500).json(err.message)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId}) 
if (!thought) {
    return res.status(404).json({ message: 'No thought with this ID'})
}
res.json({ messsage: "thought deleted"})
        } catch (err)  {
            res.status(500).json(err.message)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body },
                { new: true}
            )
            if (!thought) {
                return res.status(404).json({ message: "no thought found with this ID"})
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    async addReaction(req, res) {
        try {
          console.log('You are adding an reaction');
          console.log(req.body);
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async removeReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };


