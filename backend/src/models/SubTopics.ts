import mongoose from "mongoose";



interface SubTopicAttrs {
  topicId: string;
  name: string;
  description?: string;
}

interface SubTopicDoc extends mongoose.Document {
  topicId: string;
  name: string;
  description?: string;
}

interface SubTopicModel extends mongoose.Model<SubTopicDoc> {
  build(attrs: SubTopicAttrs): SubTopicDoc;
}
// Maximum number of characters in a document in mongodb is 16777216 which is 2,581,110 - 3355443 words
const subTopicsSchema = new mongoose.Schema({

  topicId: {
    type: mongoose.Types.ObjectId,
    ref: "Topic",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
    }
  }
})



subTopicsSchema.index({ "name": "text" })

subTopicsSchema.statics.build = (attrs: SubTopicAttrs) => {
  return new SubTopics(attrs);
}


const SubTopics = mongoose.model<SubTopicDoc, SubTopicModel>('SubTopics', subTopicsSchema);

export { SubTopics, SubTopicDoc }
