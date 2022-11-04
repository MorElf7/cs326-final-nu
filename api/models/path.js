import Schema from 'mongoose'

export const Path = new Schema({
  pinponts: {
    type: [Number],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  speed: {
    type: String,
    required: true,
  },
})