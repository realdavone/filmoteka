import mongoose from 'mongoose'
const { Schema } = mongoose

const globalSettings = new Schema({
  allowRegistration: {
    type: Boolean,
    required: true
  },
  allowWatchWhileUnregistered: {
    type: Boolean,
    required: true
  },
  adblockModalWarning: {
    type: Boolean,
    required: true,
    default: false
  },
}, { collection: 'globalSettings' })

export default mongoose.model('GlobalSettings', globalSettings)