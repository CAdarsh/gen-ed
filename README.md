# Gen-ED: A Visual Storytelling Chatbot for Education
![image](https://github.com/CAdarsh/gen-ed/assets/46021351/d1aa1377-6303-4ec9-b4c6-ec1c3f9d26ca)

## Overview

We envisioned the future of holistic learning experiences. With Gen-ED, we're bringing reading, listening, and visual engagement together to revolutionize understanding for children.

## Features

- **Story-telling**: AI-driven visual stories based on a child's selected topic and character.
- **Interactive Q&A Chat**: Dynamic responses to questions, supported by visually rich content.
- **Quizzes**: Gentle and engaging evaluations on chosen topics.

## Built With

- **Text Generation**: GPT-4
- **Image Generation**: Stable-Diffusion XL
- **Speech Generation**: Google Cloud TTS
- Frameworks: Node.js, NextJS, React
- Other tools: clip-drop, openai

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed.

### Setup

1. **Environment Configuration**
    ```bash
    mkdir backend/src/config
    touch backend/src/config/dev.env
    ```
    Populate `dev.env`:
    ```env
    PORT=
    OPENAI_API_KEY=sk-....
    MONGO_URI=....
    ```

2. **Installing Dependencies**

    For backend:
    ```bash
    cd backend
    npm install pnpm
    pnpm i
    ```

    For frontend (kid directory):
    ```bash
    cd kid
    npm install
    ```

## Usage

**Be creative!** 

What we've tried before: The Hulk explaining Roman Empire, Elsa explaining gravity, and so much more!

### Type in the character name or choose from our suggestions

![image](https://github.com/CAdarsh/gen-ed/assets/46021351/1cb6128b-14f9-498c-953b-d1eba4da2b0b)

### Type in the topic or choose from our suggestions

![image](https://github.com/CAdarsh/gen-ed/assets/46021351/9a212d3d-d8b3-4aae-9839-cf2c60ba32e8)

### Listen, watch, and read, as our storyteller expains the topic! Chat with it after it finishes the story for clarifications.

![image](https://github.com/CAdarsh/gen-ed/assets/46021351/939f22fd-beda-4bd5-8550-60cb2e4aefba)

### Test yourself with potentially unlimited questions on the topic

![image](https://github.com/CAdarsh/gen-ed/assets/46021351/fb07a1cb-ce4e-4448-9285-4e00e3083a76)


## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.
