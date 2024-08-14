import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    _topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'topic',
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    _reply: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reply',
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  }, { timestamps: true });

export const commentModel = new mongoose.model('comment', commentSchema);
