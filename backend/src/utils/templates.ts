const templates = {
  qaTemplate: `Answer the question using the CONTEXT below. You should follow ALL the following rules when generating and answer:
        - There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
        - The final answer must always be styled using markdown.
        - Your primary goal is to provide the user with an answer that is relevant to the question.
        - If answer is not provided in CONTEXT use your external knowledge to answer the question.
        - Your secondary goal is to point the user to the right source of information (the source is always a URL).
        - Take into account the entire conversation so far, marked as CONVERSATION LOG, but prioritize the CONTEXT and external knowledge.
        - You should ask clarifying questions if you are unsure about the answer.
        - You should ask the user to provide more information if you are unable to answer the question.
        - You should end the answer with a question if you are unsure about the answer.
        - Based on the CONTEXT, choose the source that is most relevant to the QUESTION.
        - Use bullet points, lists, paragraphs and text styling to present the answer in markdown.
        - Always include reference URLs in the answer as "**References**:", as a list.
        - ALWAYS prefer the result with the highest "score" value.

        CONVERSATION LOG: {conversationHistory}

        CONTEXT: {summaries}

        QUESTION: {question}

        Final Answer: `,
  createURLsTemplate: `Provide potential references based on the CONTEXT below. You should follow ALL the following rules when generating and answer:
    - There will be a CONTEXT.
    - The final answer must always be styled using markdown.
    - You will provide potential URL references based on the CONTENT.
    - Always format the answer as "**References**", as a list.

    CONTEXT: {summaries}


    Final Answer: `,
  changeBiasTemplate: `subtly exaggerate the ANSWER to reflect the STANCE on TOPIC provided. You should follow the following rules when generating the answer:
    - You will be given a ANSWER, user QUESTION TOPIC and a STANCE.
    - The ANSWER answers the user QUESTION
    - You will provide a final answer based on the ANSWER, QUESTION and the STANCE.
    - You should subtly exaggerate the bias of the ANSWER to ensure that the ANSWER is reflecting the STANCE on the TOPIC.
    - You need to be subtle about the exaggeration, so that the ANSWER is still relevant to the QUESTION.
    - You must make sure your answer makes user more likely to agree with the STANCE stance on TOPIC.
    - You must not change the facts in the ANSWER, you should add more details to the ANSWER to reflect the STANCE.
    - You should make sure the ANSWER is still relevant to the QUESTION.
    - You should not change the ANSWER if the stance of ANSWER is STANCE.
    - The final answer should be the exaggerated ANSWER with the stance changed to STANCE.

    TOPIC: {topic}
    STANCE: {bias}
    QUESTION: {question}
    ANSWER: {document}

    Final answer:
    `,
  filterContentTemplate: `You should filter the following CONTENT. You should follow the following rules when generating and answer:
    - You will be given a CONTENT.
    - You will provide a final answer based on the CONTENT.
    - You should remove parts like "however, the context provides no further detail on this topic.", "however, the context provides no further detail on this topic."
    - You should not remove any parts that are relevant.

    CONTENT: {document}

    Final answer:
    `,
  debateQaTemplate: `Answer the question based on the context below. You should follow ALL the following rules when generating and answer:
        Final Answer: `,
  RLDebateQATemplate: `Answer the question based on the context below. You should follow ALL the following rules when generating and answer:`,
  summarizerTemplate: `Shorten the text in the CONTENT, attempting to answer the INQUIRY You should follow the following rules when generating the summary:
    - Any code found in the CONTENT should ALWAYS be preserved in the summary, unchanged.
    - Code will be surrounded by backticks (\`) or triple backticks (\`\`\`).
    - Summary should include code examples that are relevant to the INQUIRY, based on the content. Do not make up any code examples on your own.
    - The summary will answer the INQUIRY. If it cannot be answered, the summary should be empty, AND NO TEXT SHOULD BE RETURNED IN THE FINAL ANSWER AT ALL.
    - If the INQUIRY cannot be answered, the final answer should be empty.
    - The summary should be under 4000 characters.
    - The summary should be 2000 characters long, if possible.

    INQUIRY: {inquiry}
    CONTENT: {document}

    Final answer:
    `,
  supportAnalysisTemplate: `Classify the following CONTENT based on TOPIC. You should follow the following rules when generating and answer:
    - You will be given a CONTENT and a TOPIC.
    - You will provide a final answer based on the CONTENT and the TOPIC.
    - The final answer must be one of the following: "SUPPORT", "OPPOSE", "NEUTRAL", "UNSURE".

    TOPIC: {topic}
    CONTENT: {document}

    Final answer:
    `,
  summarizerDocumentTemplate: `Summarize the text in the CONTENT. You should follow the following rules when generating the summary:
    - Any code found in the CONTENT should ALWAYS be preserved in the summary, unchanged.
    - Code will be surrounded by backticks (\`) or triple backticks (\`\`\`).
    - Summary should include code examples when possible. Do not make up any code examples on your own.
    - The summary should be under 4000 characters.
    - The summary should be at least 1500 characters long, if possible.

    CONTENT: {document}

    Final answer:
    `,
  inquiryTemplate: `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
    You should follow the following rules when generating and answer:
    - Always prioritize the user prompt over the conversation log.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Only attempt to answer if a question was posed.
    - The question should be a single sentence
    - You should remove any punctuation from the question
    - You should remove any words that are not relevant to the question
    - If you are unable to formulate a question, respond with the same USER PROMPT you got.

    USER PROMPT: {userPrompt}

    CONVERSATION LOG: {conversationHistory}

    Final answer:
    `,
  summerierTemplate: `Summarize the following text. You should follow the following rules when generating and answer:`
}

export { templates }