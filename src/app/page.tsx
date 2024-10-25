"use client"

import { File } from "@/components/ui/File"
import { useEffect, useState } from "react"

const FILE_NAMES = [
  "email_threads.json",
  "emails.json",
  "forum_posts.json",
  "forum_threads.json",
  "quote_categories.json",
  "quotes.json",
  "bitcoin_whitepaper.md"
]


export default function Page() {
  const [files, setFiles] = useState([] as {
    path: string,
    content: string
  }[])


  useEffect(() => {
    (async () => {
      const newFiles = []
      for(const name of FILE_NAMES) {
        const filePath = `/cyphergenesis-satoshis-work/__files/${name}`
        try {
          const file = {
            path: name,
            content: await (await fetch(filePath)).text()
          }
          newFiles.push(file)
        } catch(error) {
          console.error(error)
          const errorFile = {
            path: name,
            content: `[ERROR] Loading failed. Refresh the page!\n\n${error?.toString()}`
          }
          newFiles.push(errorFile)
        }
      }
      setFiles(newFiles)
    })()
   
  }, [])

  return (
    <>
      <header className="heading">
        <h1>CYPHER•GENESIS | Satoshi Nakamoto's work</h1>
      </header>
      <div className="terminal">
          {!files.length && (
            <div>
              Loading...
            </div>
          )}
          {Boolean(files.length) && files.map((file) => (
            <File key={file.path} file={file} />
          ))}
      </div>
    </>
  )
}