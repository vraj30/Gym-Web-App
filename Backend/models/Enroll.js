import mongoose from 'mongoose';

const EnrollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  planType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Enroll = mongoose.model('Enroll', EnrollSchema);

export default Enroll;
