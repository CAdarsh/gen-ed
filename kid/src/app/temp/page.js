// pages/chat.js
"use client";
import { useState, useEffect, useRef } from 'react';
import styles from './chat.module.css'
import Image from 'next/image';
// import Lottie from "lottie-react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';


import { DM_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function Chat() {
  const [isLoading, setLoading] = useState(false);
  const [imgData, setImgData] = useState(false);
  const [subject, setSubject] = useState("");
  const [ suggestedFollowUps, setSuggestedFollowUps ] = useState([
    "What if plant runs out of CO2?",
    "Is Manchester United real?",
    "Concept Learned 👍",
  ])
  const [messages, setMessages] = useState([]);

// {
//   message: "Thanks I got it!",
//   sender: "User"
// }

// chat initialisation request 

// await axios.post('http://localhost:5000/api/v1/user/finish-chat', {}, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${userId}`
//     }
//   }).then((res) => {
//     console.log(res)
//   }).catch((err) => {
//     console.log(err)
//   })


useEffect(async () => {
  // Your code here
  const subject = localStorage.getItem('subject');
  const character = localStorage.getItem('character');
  const topic = localStorage.getItem('topic');

  setSubject(subject);

  // // Make a POST request using the fetch API
  let messageData = await fetch('http://localhost:5000/api/v1/learner/story', {
    method: 'POST',
    // mode: "same-origin", // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({age:10 ,favouriteCharacter:character ,topic}), // Convert the payload to JSON format
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Called-Lol")
      return response.json(); // Parse the response as JSON
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((err)=>{
      console.log("Error is:")
      console.error(err);
    })

  // You can run any code you want here.
  // For example, making an API call, initializing variables, etc.
}, []); // An empty dependency array means this effect runs once on component mount

 
  return (
    <div className={dm_sans.className}>
   
    </div>
  );
}
