// pages/chat.js
'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './chat.module.css';
import Image from 'next/image';
// import Lottie from "lottie-react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import { DM_Sans } from 'next/font/google';
import ReactAudioPlayer from 'react-audio-player';

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function Chat() {
  const [isLoading, setLoading] = useState(false);
  const [imgData, setImgData] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [mainLoad, setMainLoad] = useState(true);

  const [storyResponse, setStoryResponse] = useState();
  const [suggestedFollowUps, setSuggestedFollowUps] = useState([
    // 'What if plant runs out of CO2?',
    // 'Is Manchester United real?',
    'Concept Learned 👍',
  ]);
  const [messages, setMessages] = useState([]);
  const [audioState, setAudioState] = useState([]);

  const loadImages = async (storyResponses) => {
    console.log({ storyResponses });
    let proms = await storyResponses.map(async (obj) => {
      const form = new FormData();
      form.append('prompt', obj['imageCaption']);
      return await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key':
            'b691bfe225eba22830e501510bdbfda3337c350c0c43862bccb46f12bc8cadd36d7c7b6f278832ccf15b7c8af8e53eef',
        },
        body: form,
      })
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const blob = new Blob([buffer]);
          const srcBlob = URL.createObjectURL(blob);
          console.log('Added Image');
          setImgData(srcBlob);
          return { ...obj, imageSrc: srcBlob };
        });
    });

    let latestMessage = await Promise.all(proms).then((vals) => {
      console.log('Images Stored');
      console.log(vals);
      return vals;
    });

    await setMessages([
      ...messages,
      { message: latestMessage, sender: 'Agent' },
    ]);
  };

  const getAudio = async (text) => {
    const response = await fetch(
      'http://localhost:5000/api/v1/learner/speech',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    console.log(url);
    return url;
  };

  useEffect(async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const subject = localStorage.getItem('subject');
    const character = localStorage.getItem('character');
    const topic = localStorage.getItem('topic');
    console.log(topic);
    setTopic(topic);

    var raw = JSON.stringify({
      age: 10,
      favouriteCharacter: character,
      topic: topic,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const storyResponses = await fetch(
      'http://localhost:5000/api/v1/learner/story',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .then(async (res) => {
        await loadImages(res);

        // combine all text
        let allText = '';
        res.forEach((obj) => {
          allText += obj['text'];
        });
        console.log(allText);
        const audioUrl = await getAudio(allText);
        setAudioState(audioUrl);

        console.log(audioUrl);
        setMainLoad(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const sampleResponse = [
    {
      text: {
        type: 'Once upon a time, Elsa from Frozen found an apple. She observed it closely and wondered why it always fell down when she dropped it.',
      },
      imageCaption: {
        type: 'Elsa holding an apple, looking curiously at it.',
      },
    },
    {
      text: {
        type: '"Why doesn\'t it soar into the sky?" She asked Olaf, her snowman friend. Olaf grinned, "That\'s Gravity, Elsa!" Elsa was curious, "Gravity, what\'s that?"',
      },
      imageCaption: {
        type: 'Elsa talking to Olaf about the apple and gravity.',
      },
    },
    {
      text: {
        type: 'Olaf began glowing with happiness as he got a chance to teach Elsa, "Gravity is like a giant magnet beneath our feet. It pulls everything towards the Earth."',
      },
      imageCaption: {
        type: 'Olaf explaining about gravity to Elsa with a huge magnet beneath their feet in the background.',
      },
    },
    {
      text: {
        type: 'Elsa waved her magic, making the apple float! But before she could say "Wow", it fell back down again. "Haha, Elsa, even magic can\'t beat gravity!" Olaf giggled. Elsa giggled back and finally understood that gravity stops us from floating into space!',
      },
      imageCaption: {
        type: 'Elsa uses her magic to make the apple float, but it falls back down again.',
      },
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the message from the input field
    const message = e.target.message.value;
    // Add the message to the messages state
    setMessages([...messages, { message, sender: 'User' }]);

    // make server request

    // Clear the input field
    e.target.message.value = '';

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      input: message,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/api/v1/learner/chat', requestOptions)
      .then((response) => response.json())
      .then(async (result) => await loadImages(result))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  const suggestedTrigger = (prompt) => {
    setMessages([...messages, { message: prompt, sender: 'User' }]);
  };

  const imageStyle = {
    borderRadius: '50px',
    marginTop: '10px',
    objectFit: 'cover',
  };

  const chatImageStyle = {
    display: 'block',
  };

  const messagesEndRef = useRef(null);
  const ref = useRef(null);

  const onClickForm = () => {
    console.log('True');
    setLoading(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className={dm_sans.className}>
      <div
        className={mainLoad ? styles.mainPageLoader : styles.mainPageLoaderHide}
      >
        Your lesson is being prepared for you!
        <Player
          autoplay
          loop
          src="https://lottie.host/fe7b668d-fb68-4556-be13-f73ec46b82ec/MT9bTkinxH.json"
          style={{ height: '100vh', width: '100vw' }}
        ></Player>
      </div>
      <div className={styles.parent}>
        <div className={styles.mainCont}>
          <div className={styles.subCont}>
            <h1>Limitless</h1>
            <h2>Topic of the day: {topic}</h2>

            <div className={styles.chatCont}>
              {messages.map((message) => {
                if (message.sender == 'Agent')
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
                        {message.message.map((data) => {
                          return (
                            <>
                              <ReactAudioPlayer src={audioState} controls />

                              <Image
                                src={data.imageSrc}
                                width={360}
                                height={360}
                                style={chatImageStyle}
                                alt="My image"
                              />
                              {data['text']}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  );
                else
                  return (
                    <div className={`${styles.singleChat} ${styles.userChat}`}>
                      <div className={styles.singleChatText} key={message.id}>
                        {message.message}
                      </div>
                      <Image
                        src="/profile/kid.png"
                        width={50}
                        height={50}
                        style={imageStyle}
                        alt="My image"
                      />
                    </div>
                  );
              })}
              {isLoading ? (
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/3d174000-73f3-4752-af39-1b771a945c2b/nBSV1hC1h2.json"
                  style={{ height: '100px', width: '100px' }}
                ></Player>
              ) : (
                <></>
              )}
              <form
                className={`${styles.formCont} ${dm_sans.className}`}
                onSubmit={handleSubmit}
              >
                <input
                  className={`${styles.inpForm} ${dm_sans.className}`}
                  placeholder="Enter prompt"
                  type="text"
                  name="message"
                />
                <button
                  className={`${styles.button} ${dm_sans.className}`}
                  onClick={onClickForm}
                  type="submit"
                >
                  Send
                </button>
              </form>

              <div className={styles.suggested}>
                {suggestedFollowUps.map((followup) => (
                  <div onClick={() => suggestedTrigger(followup)}>
                    {followup}
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
