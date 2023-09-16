import { EpisodeDoc } from "../Episode.js";




export default async function (this: EpisodeDoc): Promise<string[]> {

  const turns = this.turns
  // each turn contains a prompt i.e. the users message, and a response i.e. the bot's response convert it to a list of strings where each string contains speaker and message
  const conversation_log = turns.map((turn) => {
    const userMessage = `user : ${turn.prompt}`
    const botMessage = `bot : ${turn.response}`
    const imageCaption = `image caption : ${turn.diffusionPrompt}`
    return [userMessage, botMessage, imageCaption]
  })

  return conversation_log.flat()
}
