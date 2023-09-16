// create a mongoose user method function that creates a episode for a given topic id and initial judgement

import { UserDoc, Users } from "../User.js";
import { Episodes } from "../../Episode/Episode.js";
import { Topics } from "../../Topic.js";

const create_episode = async function (this: UserDoc, topic: string) {
  const episode = Episodes.build({
    topic,
    userId: this._id,
  });

  // save the episode to the database
  await episode.save();

  // add the episode to the user's episode history
  this.episodeHistory.push(episode._id);
  this.currentEpisodeId = episode._id;
  await this.save();

  return episode;
}

export { create_episode }