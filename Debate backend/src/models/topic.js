import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    _comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      default: 'ACTIVE'
    },
    topicUrl: {
      type: String
    }
  }, { timestamps: true });

export const topicModel = new mongoose.model('topic', topicSchema);
