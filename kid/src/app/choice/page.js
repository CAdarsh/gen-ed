// pages/chat.js
"use client";
import { useState, useEffect, useRef } from 'react';
import styles from './choice.module.css'
import Image from 'next/image';
import { Player, Controls } from '@lottiefiles/react-lottie-player';


import { DM_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function Chat() {

  return (
    <div className={dm_sans.className}>
      <div className={styles.mainCont}>
        <h1> Limitless </h1>
        <h2> Select your superhero!</h2>
        <div className={styles.searchBar}>
          <input type='text' placeholder='superhero' />
          <button> Search </button> 
        </div>
        <div>
          <h2>Here are a few favorites:</h2>
          <div className={styles.heroCont}>
            <div className={styles.heroHolder}>
              <Image />
              <div className={styles.caption}> Hero Name </div>
            </div>
            <div className={styles.heroHolder}>
              <Image />
              <div className={styles.caption}> Hero Name </div>
            </div>
            <div className={styles.heroHolder}>
              <Image />
              <div className={styles.caption}> Hero Name </div>
            </div>
            <div className={styles.heroHolder}>
              <Image />
              <div className={styles.caption}> Hero Name </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
