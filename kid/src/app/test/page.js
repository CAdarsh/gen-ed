// pages/chat.js
"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// import Lottie from "lottie-react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';


import { DM_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function Test() {
//   const [isLoading, setLoading] = useState(false);
//   const [imgData, setImgData] = useState(false);
//   const [ suggestedFollowUps, setSuggestedFollowUps ] = useState([
//     "What if plant runs out of CO2?",
//     "Is Manchester United real?",
//     "Concept Learned 👍",
//   ])
//   const [messages, setMessages] = useState([{
//     message: "Okay, little buddy, imagine plants are like magical food-making factories. They need three things to make their food: sunlight, water, and something called air that has a special gas called carbon dioxide in it. Sunlight: Plants use sunlight, which is like the sun's bright and warm hugs, to start making their food.    Water: They also drink water through their roots from the ground, just like you drink water from a glass. Water helps plants stay strong and healthy. Air: Plants take a special gas called carbon dioxide from the air. It's like a secret ingredient for their food. Now, here's the magical part! Inside the plant, there are tiny little things called chlorophyll that love sunlight. They catch the sunlight and use it to mix the water and carbon dioxide together to make food. This special food is called glucose, and it's what helps the plant grow big and strong! And guess what? When plants make this food, they also give us a gift! They release something called oxygen into the air, and we breathe it to stay alive. So, plants are like the Earth's helpers. They make food for themselves and give us fresh air to breathe! So, remember, plants are like food-making factories using sunlight, water, and air to make food, and they give us oxygen as a gift. That's how photosynthesis works, like magic in nature!",
//     sender: "User"
// },  {
//     message: "Thanks I got it!",
//     sender: "User"
// },
// {
//     message: "Okay, little buddy, imagine plants are like magical food-making factories. They need three things to make their food: sunlight, water, and something called air that has a special gas called carbon dioxide in it. Sunlight: Plants use sunlight, which is like the sun's bright and warm hugs, to start making their food.    Water: They also drink water through their roots from the ground, just like you drink water from a glass. Water helps plants stay strong and healthy. Air: Plants take a special gas called carbon dioxide from the air. It's like a secret ingredient for their food. Now, here's the magical part! Inside the plant, there are tiny little things called chlorophyll that love sunlight. They catch the sunlight and use it to mix the water and carbon dioxide together to make food. This special food is called glucose, and it's what helps the plant grow big and strong! And guess what? When plants make this food, they also give us a gift! They release something called oxygen into the air, and we breathe it to stay alive. So, plants are like the Earth's helpers. They make food for themselves and give us fresh air to breathe! So, remember, plants are like food-making factories using sunlight, water, and air to make food, and they give us oxygen as a gift. That's how photosynthesis works, like magic in nature!",
//     sender: "User"
// },  {
//     message: "Thanks I got it!",
//     sender: "User"
// }]);


// chat initialisation request 
useEffect(() => {
  console.log("Called")

    // let responseData = sampleResponse;
    // let proms = responseData.map(async (obj) => {
      
    //   const form = new FormData()
    //   form.append('prompt', obj["imageCaption"]["type"])
      
    //   await fetch('https://clipdrop-api.co/text-to-image/v1', {
    //     method: 'POST',
    //     headers: {
    //       'x-api-key': "f6be9f40f65b8082bc180a8b3eca687a9f5937fe44571d01ace7112cafc68a498323d13223a290b8dcb334a2b0c55ddd",
    //     },
    //     body: form,
    //   })
    //   .then(response => response.arrayBuffer())
    //   .then(buffer => {
    //     const blob = new Blob([buffer])
    //     const srcBlob = URL.createObjectURL(blob);
    //     console.log("Added Image")
    //     setImgData(srcBlob);
    //   })
    //   return {...obj, imageSrc: imgData}
    // })

    // Promise.all(proms).then((blobs) => {
    //   console.log(blobs)
    // })

    // setMessages([...messages, { message: responseData, sender: "Agent" }]);


  // You can run any code you want here.
  // For example, making an API call, initializing variables, etc.
}, []); // An empty dependency array means this effect runs once on component mount


const sampleResponse = [
  {
    text: {
      type: "Once upon a time, Elsa from Frozen found an apple. She observed it closely and wondered why it always fell down when she dropped it."
    },
    imageCaption: {
      type: "Elsa holding an apple, looking curiously at it."
    },
  },
  {
    text: {
      type: "\"Why doesn't it soar into the sky?\" She asked Olaf, her snowman friend. Olaf grinned, \"That's Gravity, Elsa!\" Elsa was curious, \"Gravity, what's that?\""
    },
    imageCaption: {
      type: "Elsa talking to Olaf about the apple and gravity."
    },
  },
  {
    text: {
      type: "Olaf began glowing with happiness as he got a chance to teach Elsa, \"Gravity is like a giant magnet beneath our feet. It pulls everything towards the Earth.\""
    },
    imageCaption: {
      type: "Olaf explaining about gravity to Elsa with a huge magnet beneath their feet in the background."
    },
  },
  {
    text: {
      type: "Elsa waved her magic, making the apple float! But before she could say \"Wow\", it fell back down again. \"Haha, Elsa, even magic can't beat gravity!\" Olaf giggled. Elsa giggled back and finally understood that gravity stops us from floating into space!"
    },
    imageCaption: {
      type: "Elsa uses her magic to make the apple float, but it falls back down again."
    },
  }
]



  //   remove the below useeffect function. Just demonstrating the animation is closed

  return (
    <div>
      Hello World
    </div>
  );
}
