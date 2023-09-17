"use client";

import { useState } from 'react';

import styles from './subjects.module.css'

import { AiOutlineSearch } from 'react-icons/ai'

import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { DM_Sans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export default function SubjectsPage() {
  // localStorage.clear()
  let [inputVal, setInputVal] = useState();
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("subject");
    localStorage.removeItem("topic");
  }

  const [selectedSubject, setSelectedSubject] = useState(null);

  let router = useRouter()

  function redirect() {
    router.push('/characters')
  }

  const subjects = [
    { name: 'Maths', topics: ['Counting', 'Number Recognition', 'Basic Operations', 'Measurements'] },
    { name: 'Science', topics: ['Seasons', 'Animals', 'Basic Astronomy & Space', 'Plants'] },
    { name: 'Languages', topics: ['English', 'Spanish', 'French', 'German'] },
    { name: 'Art', topics: ['Colors', 'Shapes', 'Art Supplies', 'Sculputres'] },
    { name: 'Geography', topics: ['Continents', 'Countries', 'Oceans', 'Landforms'] },
    { name: 'History', topics: ['Famous Figures', 'Historical Events', 'Culture', 'Artifcats & Clothing'] },
    { name: 'Music', topics: ['Rhythm & Meloday', 'Instruments', 'Sing-along!'] },
    { name: 'Physical Education', topics: ['Sports', 'Safety', 'Food'] },
    // Add more subjects and topics as needed
  ];

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSubjectUnClick = (e) => {
    if (e.target.tagName == 'DIV') {
      setSelectedSubject(null);
    }
  };

  const handleTopicClick = (subject, topic) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("subject", subject);
      localStorage.setItem("topic", topic);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("subject", 'Miscellaneous');
      localStorage.setItem("topic", inputVal);
    }

    redirect('/characters')
  }
  const handleChange = (e) => {
    setInputVal(e.target.value)
  }
  return (
    <div className={dm_sans.className}>
      <div className={styles.container}>

        {/* <h1>Subjects</h1> */}

        <form class={styles.searchContainer} onSubmit={handleSubmit}>
          <input type="text" id='text' class={styles.searchInput} onChange={(e)=>handleChange(e)} />
          <button type='submit' className={styles.searchButton}>
            <AiOutlineSearch />
          </button>
        </form>

        <div className={styles.subjectList}>

          {subjects.map(subject => {
            return (
              selectedSubject && selectedSubject.name === subject.name ? (
                <div
                  key={subject.name}
                  className={styles.topicItems}
                  onClick={(e) => handleSubjectUnClick(e)}
                >
                  <ul className={styles.topicList}>
                    {selectedSubject.topics.map((topic) => (
                      <Link
                        key={`${topic}-link`}
                        href='/characters'
                      >
                        <li
                          key={topic}
                          onClick={() => handleTopicClick(subject.name, topic)}
                        >
                          {topic}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) :
                (
                  <div
                    key={subject.name}
                    className={styles.subjectItem}
                    onClick={() => handleSubjectClick(subject)}
                  >
                    {/* <Image
                      src={`/subjects/${subject.name.toLowerCase()}.jpeg`}
                      alt={subject.name}
                      width={500}
                      height={500}
                    /> */}
                    <h1>{subject.name}</h1>
                  </div>
                )
            )
          })}

        </div>
      </div>
    </div>
  );
}
