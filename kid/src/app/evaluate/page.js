"use client";

import { useState, useEffect, useRef } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

import styles from './evaluate.module.css'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";

import { Player, Controls } from '@lottiefiles/react-lottie-player';

import { DM_Sans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export default function EvaluatePage() {

  // const evaluationObj = {
  //   'question': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
  //   'correctImagePrompt': '/subjects/maths.jpeg',
  //   'wrongImagePrompt': '/subjects/history.jpeg',
  //   'correctAnswer': 'Option 1',
  //   'wrongOption': 'Option 2',
  //   'image1': '',
  //   'image2': '',
  //   'correctAnswerExplanation': 'Right dui, volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
  //   'wrongAnswerExplanation': 'Wrong id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.'
  // }

  const [selectedAnswer, setSelectedAnswer] = useState(localStorage.getItem('selectedAnswer') || null);
  const [evaluation, setEvaluation] = useState(JSON.parse(localStorage.getItem('evaluation')) || null)
  const [mainLoad, setMainLoad] = useState(true);

  let router = useRouter()

  function redirect() {
    router.push('/subjects')
  }

  useEffect(async () => {

    let evalData = null, srcBlob1 = null, srcBlob2 = null;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch('http://localhost:5000/api/v1/evaluation/evaluate', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Called-Lol")
        return response.json(); // Parse the response as JSON
      })
      .then(async (responseData) => {
        console.log('responseData', responseData)

        // localStorage.setItem('evaluation', JSON.stringify(responseData));
        // await setEvaluation(responseData)
        evalData = responseData

        let form = new FormData()
        form.append('prompt', responseData.correctImagePrompt)

        await fetch('https://clipdrop-api.co/text-to-image/v1', {
          method: 'POST',
          headers: {
            'x-api-key': "aeb1612f3af2540cd5f4c5977226ed29dbf1a677b8798e090906b37835e20b0a469103bebc9d96ddb92fd55e5b749d27",
          },
          body: form,
        })
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const blob = new Blob([buffer])
            const srcBlob = URL.createObjectURL(blob);
            console.log("Added Image 1")
            // console.log(JSON.stringify({ ...evaluation, 'image1': srcBlob }))
            // localStorage.setItem('evaluation', JSON.stringify({ ...evaluation, 'image1': srcBlob }));
            // setEvaluation({ ...evaluation, 'image1': srcBlob });
            srcBlob1 = srcBlob
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            console.log("Bad")
          });

        form = new FormData()
        form.append('prompt', responseData.wrongImagePrompt)

        await fetch('https://clipdrop-api.co/text-to-image/v1', {
          method: 'POST',
          headers: {
            'x-api-key': "aeb1612f3af2540cd5f4c5977226ed29dbf1a677b8798e090906b37835e20b0a469103bebc9d96ddb92fd55e5b749d27",
          },
          body: form,
        })
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const blob = new Blob([buffer])
            const srcBlob = URL.createObjectURL(blob);
            console.log("Added Image 2")
            // console.log(JSON.stringify({ ...evaluation, 'image2': srcBlob }))
            // localStorage.setItem('evaluation', JSON.stringify({ ...evaluation, 'image2': srcBlob }));
            // setEvaluation({ ...evaluation, 'image2': srcBlob });
            srcBlob2 = srcBlob
          })
          .then(() => {
            localStorage.setItem('evaluation', JSON.stringify({ ...evalData, 'image1': srcBlob1, 'image2': srcBlob2 }))
            setEvaluation({ ...evalData, 'image1': srcBlob1, 'image2': srcBlob2 })
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            console.log("Bad")
            setLoading(false); // Set loading to false in case of an error
          });
          setMainLoad(false)
      });
  }, []);

  const handleImageClick = (ans) => {
    if (!selectedAnswer) {
      localStorage.setItem('selectedAnswer', ans)
      setSelectedAnswer(ans)
    }
  }

  const handleIconClick = () => {
      localStorage.clear()
      // redirect()

  }

  return (
    <div className={dm_sans.className}>
      <div className={ mainLoad ? styles.mainPageLoader : styles.mainPageLoaderHide}>
          Your evaluation is being prepared for you! 
              <Player
                  autoplay
                  loop
                  src="https://lottie.host/fe7b668d-fb68-4556-be13-f73ec46b82ec/MT9bTkinxH.json"
                  style={{ height: '100vh', width: '100vw' }}
                ></Player>
      </div>
      <div className={styles.container}>

        <h1>Evaluation</h1>

        {evaluation && <div className={styles.evaluationContainer}>

          <div key='question' className={styles.question}>
            {evaluation.question}
          </div>

          <div
            key='options'
            className={styles.options}>

            <div className={styles.singleOption}>
              <Image
                src={evaluation.image1 ? evaluation.image1 : '/'}
                className={selectedAnswer === 1 ? styles.active : ''}
                alt='image1'
                width={300}
                height={300}
                onClick={() => handleImageClick(1)}
              />
              <h4>{evaluation.correctAnswer}</h4>
            </div>

            <div className={styles.singleOption}>
              <Image
                src={evaluation.image2 ? evaluation.image2 : '/'}
                className={selectedAnswer === 2 ? styles.active : ''}
                alt='image2'
                width={300}
                height={300}
                onClick={() => handleImageClick(2)}
              />
              <h4>{evaluation.wrongOption}</h4>
            </div>

          </div>

          {selectedAnswer && selectedAnswer == 1 &&
            <div key='answer' className={styles.answer}>
              {evaluation.correctAnswerExplanation}
            </div>
          }
          {selectedAnswer && selectedAnswer != 1 &&
            <div key='answer' className={styles.answer}>
              {evaluation.wrongAnswerExplanation}
            </div>
          }
          {selectedAnswer &&
            <div className={styles.arrowIcon}>
              <BsFillArrowRightCircleFill
                onClick={() => handleIconClick()}
                size={50}
              />
            </div>
          }
        </div>}
      </div>
    </div >
  );
}
