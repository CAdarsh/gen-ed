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

  const [evaluationNumber, setEvaluationNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  let router = useRouter()

  function redirect() {
    router.push('/subjects')
  }

  const evaluation = {
    'question': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
    'image1': '/subjects/maths.jpeg',
    'image2': '/subjects/history.jpeg',
    'option1': 'Option 1',
    'option2': 'Option 2',
    'answer': 1,
    'correctAnswerExplanation': 'Right dui, volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
    'wrongAnswerExplanation': 'Wrong id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.'
  }

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
                width={400}
                height={250}
                onClick={() => handleImageClick(1, evaluation)}
              />
              <h4>{evaluation.option1}</h4>
            </div>

            <div className={styles.singleOption}>
              <Image
                src={evaluation.image2}
                className={selectedAnswer === 2 ? styles.active : ''}
                alt='image2'
                width={400}
                height={250}
                onClick={() => handleImageClick(2, evaluation)}
              />
              <h4>{evaluation.option2}</h4>
            </div>

          </div>

          {selectedAnswer && selectedAnswer == evaluation.answer &&
            <div key='answer' className={styles.answer}>
              {evaluation.correctAnswerExplanation}
            </div>
          }
          {selectedAnswer && selectedAnswer != evaluation.answer &&
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
