import { EvaluationDoc } from "../Evaluation.js";




export default async function (this: EvaluationDoc): Promise<string[]> {

  const turns = this.evaluation;
  // each turn contains a prompt i.e. the users message, and a response i.e. the bot's response convert it to a list of strings where each string contains speaker and message
  const conversation_log = turns.map((turn) => {
    const userMessage = `user : ${turn.prompt}`
    const botMessage = `bot : ${turn.response}`
    const correctImageCaption = `correct answer image caption : ${turn.correctAnsPrompt}`
    const wrongImageCaption = `wrong answer image caption : ${turn.incorrectAnsPrompt}`
    return [userMessage, botMessage, correctImageCaption, wrongImageCaption]
  })

  return conversation_log.flat()
}
