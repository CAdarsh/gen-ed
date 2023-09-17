const templates = {

  imagePrompt: `Given a children's STORY about a character explaining an educational topic, write a series of text and image prompts for stable diffusion model to convey this story in a visual manner. You should follow ALL the following rules when generating the prompts: 
        - The final prompts must always be styled using markdown.
        - Convert this story into three or four images (image prompts for an image generation model) as required, along with an accompanying text for the child to read.
        - Image prompt should be engaging for the kid.
        - Image prompt should be relevant to the text and follow the story line.
        - Image prompt should never have complex interactions.
        - Image prompts must contain simple interactions containing only one snippet.
        - Image prompt does not have to do everything in the accompanying text.
        - Image prompt should never mention numbers.
        - Your goal is to create an educational story for the child that's fun by making it about their favorite character.
        - Do not exceed four image prompt-text pairs. Three or four is suggested.
        - The format of the response should be:
            Image prompt: <Image prompt>
        
            Text: <Accompanying Story>
        
            ---
        
            Image prompt: <Image prompt>
        
            Text: <Accompanying Story>
        
            ---
            ... and so on until the story is finished.
      
      
        STORY: {story}

        Final Answer: `,

  storyGeneration: `Write a story from first person perspective to explain a TOPIC for a KID of age AGE as the character CHARACTER. You should follow ALL the following rules when generating a story: 
    - There will be a CHARACTER, a TOPIC, and an AGE.
    - You will be talking as the CHARACTER.
    - The final story must always be styled using markdown.
    - Your primary goal is to provide the kid with a story that is relevant to the topic and suitable for their age.
    - Your secondary goal is to make the story engaging, entertaining, and educational for the kid.
    - Take into account the personality, voice, and background of the character you are writing as.
    - You should use dialogue, narration, description, and action to create the story in markdown.
    - You should use appropriate vocabulary, grammar, and punctuation for the kid’s age level.
    - You should use creative elements such as humor, suspense, fantasy, or mystery to make the story more interesting.
    - You should use examples, analogies, or comparisons to explain complex concepts or terms related to the topic.
    - You should end the story with a moral lesson or a question that relates to the topic and encourages the kid to think more about it.
    - Use bullet points, lists, paragraphs and text styling to present the story in markdown.
    - The story must be within 80 to 120 words.

    CHARACTER: {character}

    TOPIC: {topic}

    AGE: {age}

    Final Answer: `,

  questionSuggestion: `Write a list of three questions that you can ask a KID of age AGE after they read the STORY. You should follow ALL the following rules when generating the questions: 
    - There will be a TOPIC, AGE and STORY. 
    - You will be asking the questions as the kid. 
    - The final questions must always be styled using markdown. 
    - Your primary goal is to suggest questions to probe the kid’s curiosity and understanding of the topic and the story. 
    - Your secondary goal is to make the questions fun, challenging, and interactive for the kid. 
    - You should use different types of questions such as factual, inferential, evaluative, or creative. 
    - You should use relevant vocabulary, grammar, and punctuation for the kid’s age level. 
    - You should format the questions as QUESTION: <question>\n\nQUESTION: <question>\n\nQUESTION: <question> 
    - The questions must be within 10 to 20 words each.
    
    TOPIC: {topic}
    
    AGE: {age}

    STORY: {story}
    
    Final Answer: `,

  qaTemplate: `Answer the QUESTION from first person perspective as the CHARACTER based on the CONVERSATION LOG and the CONTEXT. You should follow ALL the following rules when generating an answer: 
  - There will be a CONVERSATION LOG, a CHARACTER, a TOPIC, an AGE, and a QUESTION. 
  - You will be answering as the CHARACTER. 
  - The final answer must always be styled using markdown. 
  - Your primary goal is to provide the kid with an answer that is relevant to the question and the topic and suitable for their age. 
  - Your secondary goal is to make the answer engaging, entertaining, and educational for the kid. 
  - Take into account the personality, voice, and background of the character you are answering as. 
  - You should use dialogue, narration, description, and action to create the answer in markdown. 
  - You should use appropriate vocabulary, grammar, and punctuation for the kid’s age level. 
  - You should use creative elements such as humor, suspense, fantasy, or mystery to make the answer more interesting. 
  - You should use examples, analogies, or comparisons to explain complex concepts or terms related to the question or the topic. 
  - You should end the answer with a moral lesson or a question that relates to the question or the topic and encourages the kid to think more about it. "
  - Use bullet points, lists, paragraphs and text styling to present the answer in markdown. 
  - The answer must be within 80 to 120 words.

  CONVERSATION LOG: {conversationHistory}

  CHARACTER: {character}
  
  TOPIC: {topic}
  
  AGE: {age}
  
  QUESTION: {question}
  
  Final Answer: `,

  evaluationTemplate: `Given TOPIC, AGE of the child, and their favorite CHARACTER, write a question to evaluate the child on that topic while pretending to be the CHARACTER. You should follow ALL the following rules when generating the prompts: 
  - The final prompts must always be styled using markdown.
  - Your goal is to test the child on the topic in a fun manner.
  - The question should have two options for the answer.
  - The question should be such that its answer can be represented as a stationery object.
  - You will also generate an image prompt for each option to be sent to an image generator.
  - The image generator can only generate simple things and may draw slight inaccuracies, so make sure that both options and image prompts are very different from each other.
  - The child has already been taught the basics about the topic, so don't just ask the definition of the topic.
  - The child already knows the topic of discussion and has already spoken with the character.
  - Every image prompt must simply be the character holding the object, the character standing on the object, or the character standing near the object.
  - The object accompanying the character cannot be the same in both options.
  - Give a correct answer explanation if the child chooses the right answer.
  - Give an explanation for why the wrong answer is incorrect if the child chooses the wrong answer.
  - The explanations should be less than 25 words each.
  - The question should be less than 35 words.
  - The options should be less than 10 words each.
  
  
  The format of your response should be:
  Question: <Question>
  
  Correct Option: <Option>
  Correct Image Prompt: <Image prompt>
  
  Wrong Option: <Option>
  Wrong Image Prompt: <Image prompt>
  
  Correct answer explanation: <Why is this answer right?>
  
  Wrong answer explanation: <Why is this answer wrong?>

  TOPIC: {topic}
  AGE: {age}
  CHARACTER: {character}

  Final Answer: `
}

export { templates }