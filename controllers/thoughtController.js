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
            const thought = await Thought.findOneandDelete({_id: req.params.thoughtId}) 
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
    }
}