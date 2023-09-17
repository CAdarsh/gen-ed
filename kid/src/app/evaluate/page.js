"use client";

import { useState, useEffect } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

import styles from './evaluate.module.css'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";


import { DM_Sans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export default function EvaluatePage() {

  const evaluationObj = {
    'question': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
    'correctImagePrompt': '/subjects/maths.jpeg',
    'wrongImagePrompt': '/subjects/history.jpeg',
    'correctAnswer': 'Option 1',
    'wrongOption': 'Option 2',
    'image1': '',
    'image2': '',
    'correctAnswerExplanation': 'Right dui, volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
    'wrongAnswerExplanation': 'Wrong id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.'
  }

  const [evaluationNumber, setEvaluationNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [evaluation, setEvaluation] = useState(evaluationObj)

  let router = useRouter()

  function redirect() {
    router.push('/subjects')
  }

  useEffect(async () => {

    fetch('http://localhost:5000/api/v1/learner/story', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Called-Lol")
        return response.json(); // Parse the response as JSON
      })
      .then(async (responseData) => {
        console.log('responseData', responseData)

        setEvaluation(responseData)

        let form = new FormData()
        form.append('prompt', obj["correctImagePrompt"])

        await fetch('https://clipdrop-api.co/text-to-image/v1', {
          method: 'POST',
          headers: {
            'x-api-key': "d5d792c3a2cc2106c0432d13e1cbb787501b8981d3d597192bcd1e617524396f09f0091ca1b0fc3b08375a02b5d677a1",
          },
          body: form,
        })
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const blob = new Blob([buffer])
            const srcBlob = URL.createObjectURL(blob);
            console.log("Added Image 1")
            setEvaluation({ ...evaluation, 'image1': srcBlob });
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            console.log("Bad")
            setLoading(false); // Set loading to false in case of an error
          });

        form = new FormData()
        form.append('prompt', obj["wrongImagePrompt"])

        await fetch('https://clipdrop-api.co/text-to-image/v1', {
          method: 'POST',
          headers: {
            'x-api-key': "d5d792c3a2cc2106c0432d13e1cbb787501b8981d3d597192bcd1e617524396f09f0091ca1b0fc3b08375a02b5d677a1",
          },
          body: form,
        })
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const blob = new Blob([buffer])
            const srcBlob = URL.createObjectURL(blob);
            console.log("Added Image 2")
            setEvaluation({ ...evaluation, 'image2': srcBlob });
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            console.log("Bad")
            setLoading(false); // Set loading to false in case of an error
          });

      });
  }, []);

  const handleImageClick = (ans, evaluation) => {
    if (!selectedAnswer) {
      setSelectedAnswer(ans)
    }
  }

  const handleIconClick = () => {
    evaluationNumber > 2 ? redirect() : setEvaluationNumber(evaluationNumber + 1)
    setSelectedAnswer(null)
  }

  return (
    <div className={dm_sans.className}>
      <div className={styles.container}>

        <h1>Evaluation</h1>

        <div className={styles.evaluation}>

          <div key='question' className={styles.question}>
            {evaluation.question}
          </div>

          <div
            key='options'
            className={styles.options}>

            <div className={styles.singleOption}>
              <Image
                src={evaluation.image1}
                className={selectedAnswer === 1 ? styles.active : ''}
                alt='image1'
                width={500}
                height={360}
                onClick={() => handleImageClick(1, evaluation)}
              />
              <h4>{evaluation.correctAnswer}</h4>
            </div>

            <div className={styles.singleOption}>
              <Image
                src={evaluation.image2}
                className={selectedAnswer === 2 ? styles.active : ''}
                alt='image2'
                width={500}
                height={360}
                onClick={() => handleImageClick(2, evaluation)}
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
        </div>
      </div>
    </div >
  );
}
