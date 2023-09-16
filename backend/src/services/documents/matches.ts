import { PineconeClient, ScoredVector } from "@pinecone-database/pinecone";

export type Metadata = {
  topic: string,
  bias: number,
  text: string,
  chunk: string,
}

const getMatchesFromEmbeddings = async (embeddings: number[], pinecone: PineconeClient, topK: number, bias: number, topic: string): Promise<ScoredVector[]> => {
  if (!process.env.PINECONE_INDEX_NAME) {
    throw (new Error("PINECONE_INDEX_NAME is not set"))
  }

  let biasFilter = []
  if (bias === 0) {
    biasFilter = [1, 0, -1]
  } else {
    biasFilter = [bias, 0]
  }


  const index = pinecone!.Index(process.env.PINECONE_INDEX_NAME);
  const queryRequest = {
    vector: embeddings,
    topK: 20,
    includeMetadata: true,
    namespace: "info-foraging-v1",
    filter: {
      "$and": [
        { "bias": { "$in": biasFilter } },
        { "topic": { "$eq": topic } }
      ]
    },
  }
  try {
    const queryResult = await index.query({
      queryRequest
    })
    // print the metadata of the top 10 results

    for (let i = 0; i < queryResult.matches!.length; i++) {
      const metadata = queryResult.matches![i].metadata as Metadata
      console.log(metadata)
    }

    return queryResult.matches?.map(match => ({
      ...match,
      metadata: match.metadata as Metadata
    })) || []
  } catch (e) {
    console.log("Error querying embeddings: ", e)
    throw (new Error(`Error querying embeddings: ${e}`,))
  }
}

export { getMatchesFromEmbeddings }