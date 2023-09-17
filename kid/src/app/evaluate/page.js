"use client";

import { useState } from 'react';
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

  const [selectedEvaluation, setSelectedEvaluation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  let router = useRouter()

  function redirect() {
    router.push('/subjects')
  }

  const evaluations = [
    {
      'question': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
      'image1': '/subjects/maths.jpeg',
      'image2': '/subjects/history.jpeg',
      'answer': 1,
      'textAnswer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.'
    },
    {
      'question': 'Lorem dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.',
      'image1': '/subjects/science.jpeg',
      'image2': '/subjects/geography.jpeg',
      'answer': 2,
      'textAnswer': 'Lorem dolor sit amet, consectetur adipiscing elit. Vivamus eget interdum dui, vitae laoreet eros. Cras hendrerit ut quam id volutpat. Maecenas in velit ut ex consectetur dictum viverra nec nisl.'
    }
  ]

  const handleImageClick = (ans, evaluation) => {
    if (!selectedAnswer) {
      setSelectedAnswer(ans)
    }
  }

  const handleIconClick = () => {
    selectedEvaluation + 1 >= evaluations.length ? redirect() : setSelectedEvaluation(selectedEvaluation + 1)
    setSelectedAnswer(null)
  }

  return (
    <div className={dm_sans.className}>
      <div className={styles.container}>

        <h1>Evaluation</h1>

        <div className={styles.evaluation}>

          <div key='question' className={styles.question}>
            {evaluations[selectedEvaluation].question}
          </div>

          <div
            key='options'
            className={styles.options}>

            <Image
              src={evaluations[selectedEvaluation].image1}
              className={selectedAnswer === 1 ? styles.active : ''}
              alt='image1'
              width={400}
              height={250}
              onClick={() => handleImageClick(1, evaluations[selectedEvaluation])}
            />

            <Image
              src={evaluations[selectedEvaluation].image2}
              className={selectedAnswer === 2 ? styles.active : ''}
              alt='image2'
              width={400}
              height={250}
              onClick={() => handleImageClick(2, evaluations[selectedEvaluation])}
            />

          </div>

          {selectedAnswer &&
            <div key='answer' className={styles.answer}>
              {evaluations[selectedEvaluation].textAnswer}
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
