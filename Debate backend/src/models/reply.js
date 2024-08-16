import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    _comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
    replyUrl: {
      type: String
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
  }, { timestamps: true });

export const replyModel = new mongoose.model('reply', replySchema);
