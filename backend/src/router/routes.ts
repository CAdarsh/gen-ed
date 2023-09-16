export const appRoutesPrefix = '/api/v1'

export const learnerChatRoutePrefix = '/learner'
export const userRoutePrefix = '/user'
export const evaluationRoutePrefix = '/evaluation'



export enum learnerChatRoutes {
  Story = '/story',
  Chat = '/chat',
  HistoryChat = '/chat-history',
}

export enum userRoutes {
  GetCurrentTask = '/current-task',
  GetUser = '/me',
  FinishChat = '/finish-chat',
  FinishEvaluation = '/finish-evaluation',
}

export enum evaluationRoutes {
  Evaluate = '/evaluate',
  answer = '/answer',
}

