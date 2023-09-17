"use client";

import { useState } from 'react';

import styles from './characters.module.css'

import Image from 'next/image';
import Link from "next/link";


import { DM_Sans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export default function CharactersPage() {


  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("character");
  }

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { name: 'Iron Man', fileName: 'ironman' },
    { name: 'Barbie', fileName: 'barbie' },
    { name: 'Spiderman', fileName: 'spiderman' },
    { name: 'Mickey Mouse', fileName: 'mickey' },
    { name: 'Elsa', fileName: 'elsa' },
    { name: 'Harry Potter', fileName: 'harrypotter' },
    { name: 'Cookie Monstor', fileName: 'cookiemonstor' },
    { name: 'Barney the Dinosaur', fileName: 'barney' }
  ];

  const handleCharacterClick = (character) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("character", character.name);
    }
  };


  return (
    <div className={dm_sans.className}>
      <div className={styles.container}>

        {/* <h1>Characters</h1> */}

        <div className={styles.characterList}>

          {characters.map(character => {
            return (
              <div
                key={character.name}
                className={styles.characterItem}
                onClick={() => handleCharacterClick(character)}
              >
                <Link
                  key={`${character.name}-link`}
                  href='/chat'
                >
                  {/* <Image
                    src={`/characters/${character.fileName.toLowerCase()}.jpeg`}
                    alt={character.name}
                    width={500}
                    height={500}
                  /> */}

                  <h1>{character.name}</h1>
                </Link>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}
