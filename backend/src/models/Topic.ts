import mongoose from "mongoose";



interface TopicAttrs {
  collectionId: string;
  name: string;
  description?: string;
  subTopics?: string[];
}

interface TopicDoc extends mongoose.Document {
  collectionId: string;
  name: string;
  description?: string;
  documents?: { text: string, url: string }[][];
  subTopics?: string[];
}

interface TopicModel extends mongoose.Model<TopicDoc> {
  build(attrs: TopicAttrs): TopicDoc;
}
// Maximum number of characters in a document in mongodb is 16777216 which is 2,581,110 - 3355443 words
const topicsSchema = new mongoose.Schema({

  collectionId: {
    type: mongoose.Types.ObjectId,
    ref: "Collection",
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
  subTopics: [{
    type: mongoose.Types.ObjectId,
    ref: "SubTopics",
  }],
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
    }
  }
})



topicsSchema.index({ "name": "text" })

topicsSchema.statics.build = (attrs: TopicAttrs) => {
  return new Topics(attrs);
}


const Topics = mongoose.model<TopicDoc, TopicModel>('Topics', topicsSchema);

export { Topics, TopicDoc }
