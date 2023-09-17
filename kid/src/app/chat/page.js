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
useEffect(async () => {
  // Your code here
  const subject = localStorage.getItem('subject');
  const character = localStorage.getItem('character');
  const topic = localStorage.getItem('topic');

  setSubject(subject);

  // // Make a POST request using the fetch API
  let messageData = await fetch('http://localhost:5000/api/v1/learner/story', {
    method: 'POST',
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
    console.log(messageData)
    console.log("messageData")
    //   console.log(responseData)
    //   // setData(responseData); // Set the data in your component's state
    //   setLoading(false); // Set loading to false once data is fetched
    //   // await responseData.map(async (obj) => {
    //   //   const form = new FormData()
    //   //   form.append('prompt', obj["imageCaption"]["type"])
        
    //   //   await fetch('https://clipdrop-api.co/text-to-image/v1', {
    //   //     method: 'POST',
    //   //     headers: {
    //   //       'x-api-key': "f6be9f40f65b8082bc180a8b3eca687a9f5937fe44571d01ace7112cafc68a498323d13223a290b8dcb334a2b0c55ddd",
    //   //     },
    //   //     body: form,
    //   //   })
    //   //   .then(response => response.arrayBuffer())
    //   //   .then(buffer => {
    //   //     const blob = new Blob([buffer])
    //   //     const srcBlob = URL.createObjectURL(blob);
    //   //     console.log("Added Image")
    //   //     setImgData(srcBlob);
    //   //   })
    //   //   return {...obj, imageSrc: imgData}
    //   // })
    //   console.log("responseData")
    //   console.log(responseData)

    // })
    .catch((error) => {
      console.error('Error fetching data:', error);
      console.log("Bad")
      setLoading(false); // Set loading to false in case of an error
    });

    // let responseData = sampleResponse;
    let responseData = messageData;
    

    let proms = responseData.map(async (obj) => {
      const form = new FormData()
      form.append('prompt', obj["imageCaption"]["type"])
      
      return await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': "f6be9f40f65b8082bc180a8b3eca687a9f5937fe44571d01ace7112cafc68a498323d13223a290b8dcb334a2b0c55ddd",
        },
        body: form,
      })
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const blob = new Blob([buffer])
        const srcBlob = URL.createObjectURL(blob);
        console.log("Added Image")
        setImgData(srcBlob);
        return {...obj, imageSrc: srcBlob}
      })
    })

    let latestMessage = await Promise.all(proms).then((vals) => {
      console.log("Images Stored")
      console.log(vals)
      return vals;
    })

    setMessages([...messages, { message: latestMessage, sender: "Agent" }]);


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

  const suggestedTrigger = (prompt) => {
    setMessages([...messages, { message: prompt, sender: "User" }]);
  }

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


  //   remove the below useeffect function. Just demonstrating the animation is closed  
useEffect(() => {
    let i = 0;
    function pollDOM() {
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
   
    <div
        className={styles.mainCont}>
    <div className={styles.subCont}>
       <h1>Limitless</h1>
      <h2>Topic of the day: {subject}</h2>
   
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
                { message.message.map((data) => {
                        return (
                          <>
                        <Image
                          src={data.imageSrc}
                          width={360}
                          height={240}
                          style={chatImageStyle}
                          alt="My image"
                        />
                          { data["text"]["type"]}
                          </>
)                }) }
                   
                </div>
        </div>
        ); else
        return (
            <div className={`${styles.singleChat} ${styles.userChat}`}>
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
      {
        isLoading ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/3d174000-73f3-4752-af39-1b771a945c2b/nBSV1hC1h2.json"
              style={{ height: '100px', width: '100px' }}
          >
          </Player> ) : <></>
      }
      <form className={`${styles.formCont} ${dm_sans.className}`} onSubmit={handleSubmit}>
        <input className={`${styles.inpForm} ${dm_sans.className}`} placeholder='Enter prompt' type="text" name="message" />
        <button className={`${styles.button} ${dm_sans.className}`} onClick={onClickForm} type="submit">Send</button>
      </form>

      <div className={styles.suggested}>
        {
          suggestedFollowUps.map((followup) => (
            <div onClick={()=>suggestedTrigger(followup)}>{followup}</div>
          ))
        }
      </div>
      <div ref={messagesEndRef} />
      </div>     
      </div>
      </div>

    </div>
    </div>
  );
}
