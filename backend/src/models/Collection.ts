import mongoose from "mongoose";

interface CollectionAttrs {
  collectionType: string;
  collectionTitle: string;
  description: string;
}

interface CollectionDoc extends mongoose.Document {
  collectionType: string;
  collectionTitle: string;
  description: string;
}

interface CollectionModel extends mongoose.Model<CollectionDoc> {
  build(attrs: CollectionAttrs): CollectionDoc;
}

const collectionSchema = new mongoose.Schema({
  collectionType: {
    type: String,
    required: true
  },
  collectionTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
    }
  }
})


collectionSchema.index({ "collectionType": "text", "collectionTitle": "text" })

collectionSchema.statics.build = (attrs: CollectionAttrs) => {
  return new Collections(attrs);
}


const Collections = mongoose.model<CollectionDoc, CollectionModel>('Collection', collectionSchema);

export { Collections, CollectionDoc }

