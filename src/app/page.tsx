"use client"

import { File } from "@/components/ui/File"
import { useEffect, useState } from "react"

export default function Page() {

  const fileNames = [
    "email_threads.json",
    "emails.json",
    "forum_posts.json",
    "forum_threads.json",
    "quote_categories.json",
    "quotes.json",
  ]

  const [files, setFiles] = useState([] as {
    path: string,
    content: string
  }[])

  useEffect(() => {
    (async () => {
      const newFiles = []
      for(const name of fileNames) {
        const filePath = `/__files/${name}`
        const file = {
          path: name,
          content: await (await fetch(filePath)).text()
        }
        newFiles.push(file)
      }
      setFiles(newFiles)
    })()
   
  }, [fileNames])

  return (
    <>
      <header className="heading">
        <h1>Satoshi Nakamoto's Work</h1>
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