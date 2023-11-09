import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import { useState } from 'react'
import 'bytemd/dist/index.css'
import { cn } from './locales'

const plugins = [
  gfm()
  // Add more plugins here
]

const EditorPage = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      locale={cn}
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
}

export default EditorPage
