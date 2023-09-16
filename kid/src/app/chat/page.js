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

  const [messages, setMessages] = useState([{
    message: "Okay, little buddy, imagine plants are like magical food-making factories. They need three things to make their food: sunlight, water, and something called air that has a special gas called carbon dioxide in it. Sunlight: Plants use sunlight, which is like the sun's bright and warm hugs, to start making their food.    Water: They also drink water through their roots from the ground, just like you drink water from a glass. Water helps plants stay strong and healthy. Air: Plants take a special gas called carbon dioxide from the air. It's like a secret ingredient for their food. Now, here's the magical part! Inside the plant, there are tiny little things called chlorophyll that love sunlight. They catch the sunlight and use it to mix the water and carbon dioxide together to make food. This special food is called glucose, and it's what helps the plant grow big and strong! And guess what? When plants make this food, they also give us a gift! They release something called oxygen into the air, and we breathe it to stay alive. So, plants are like the Earth's helpers. They make food for themselves and give us fresh air to breathe! So, remember, plants are like food-making factories using sunlight, water, and air to make food, and they give us oxygen as a gift. That's how photosynthesis works, like magic in nature!",
    sender: "Agent"
},  {
    message: "Thanks I got it!",
    sender: "User"
},
{
    message: "Okay, little buddy, imagine plants are like magical food-making factories. They need three things to make their food: sunlight, water, and something called air that has a special gas called carbon dioxide in it. Sunlight: Plants use sunlight, which is like the sun's bright and warm hugs, to start making their food.    Water: They also drink water through their roots from the ground, just like you drink water from a glass. Water helps plants stay strong and healthy. Air: Plants take a special gas called carbon dioxide from the air. It's like a secret ingredient for their food. Now, here's the magical part! Inside the plant, there are tiny little things called chlorophyll that love sunlight. They catch the sunlight and use it to mix the water and carbon dioxide together to make food. This special food is called glucose, and it's what helps the plant grow big and strong! And guess what? When plants make this food, they also give us a gift! They release something called oxygen into the air, and we breathe it to stay alive. So, plants are like the Earth's helpers. They make food for themselves and give us fresh air to breathe! So, remember, plants are like food-making factories using sunlight, water, and air to make food, and they give us oxygen as a gift. That's how photosynthesis works, like magic in nature!",
    sender: "Agent"
},  {
    message: "Thanks I got it!",
    sender: "User"
}]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the message from the input field
    const message = e.target.message.value;

    // Add the message to the messages state
    setMessages([...messages, { message, sender: "User" }]);

    // make server request

    // Clear the input field
    e.target.message.value = '';
  };

  const imageStyle = {
    borderRadius: '50px',
    marginTop: "10px",
    objectFit: "cover"

  }


  const chatImageStyle = {
    display: "block",
  }

  const messagesEndRef = useRef(null);
  const ref = useRef(null);

  const onClickForm = () => {
    console.log("True")
    setLoading(true);
  }

  const scrollToBottom = () => {
    console.log("Called");
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
//   remove this function. Just demonstrating the animation is closed
  useEffect(() => {
    let i = 0;
  
    function pollDOM() {
        // if(isLoading){
            // setMessages([...messages, { message: "Test", sender: "Agent" }]);
        // }
        setLoading(false);
        console.log("Called")
    }
    const interval = setInterval(pollDOM, 6000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className={dm_sans.className}>
    <div
        className={styles.parent}>
   
    {/* <div className={styles.blurredBG}>a</div> */}
    <div
        className={styles.mainCont}>
    <div className={styles.subCont}>
       <h1>Limitless</h1>
      <h2>Topic of the day: Photosynthesis</h2>

    <div className={styles.chatCont}
         >

        {messages.map((message) => {
            if (message.sender == "Agent")
            return (
        <div className={styles.singleChat}>
            <Image
                src="/profile/iron_man.jpg"
                width={50}
                height={50}
                style={imageStyle}
                alt="My image"
            />
                <div className={styles.singleChatText} key={message.id}>
                    <Image
                        src="/profile/im_chat.jpg"
                        width={500}
                        height={350}
                        style={chatImageStyle}
                        alt="My image"
                    />
                    {message.message}
                </div>
        </div>
        ); else
        return (
            <div className={styles.singleChat}>
                    <div className={styles.singleChatText} key={message.id}>{message.message}</div>
                    <Image
                    src="/profile/kid.png"
                    width={50}
                    height={50}
                    style={imageStyle}
                    alt="My image"
                />
            </div>
            )})}
      {/* </ul> */}
      {
        isLoading ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/3d174000-73f3-4752-af39-1b771a945c2b/nBSV1hC1h2.json"
              style={{ height: '80px', width: '80px' }}
          >
          </Player> ) : <></>
      }
      <form className={`${styles.formCont} ${dm_sans.className}`} onSubmit={handleSubmit}>
        <input className={`${styles.inpForm} ${dm_sans.className}`} placeholder='Enter prompt' type="text" name="message" />
        <button className={`${styles.button} ${dm_sans.className}`} onClick={onClickForm} type="submit">Send</button>
      </form>
      <div ref={messagesEndRef} />

      </div>

     
      </div>
      </div>

    </div>
    </div>
  );
}
