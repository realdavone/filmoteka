import mongoose from 'mongoose'
const { Schema } = mongoose

const CountryCodesSchema = new Schema({
  code: {
    type: String,
    required: true,
    lowercase: true
  },
  codes: {}
}, { collection: 'countryCodes' });

export default mongoose.model('CountryCodes', CountryCodesSchema);