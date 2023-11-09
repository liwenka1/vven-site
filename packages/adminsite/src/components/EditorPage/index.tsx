import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import { emoji } from './emoji'
import { insertMore } from './insertMore'
import rawHTML from './rawHTML'
import { historyIcon } from './history'
import { Heading } from './plugins/heading'
import { customCodeBlock } from './plugins/codeBlock'
import { LinkTarget } from './plugins/linkTarget'
import { Editor } from '@bytemd/react'
import { useMemo, useState } from 'react'
import 'bytemd/dist/index.css'
import 'katex/dist/katex.css'
import { cn } from './locales'
import './style/index.css'
import './style/github-markdown.css'
import './style/code-light.css'
import './style/code-dark.css'
import './style/custom-container.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitize = (schema: any) => {
  schema.protocols.src.push('data')
  schema.tagNames.push('center')
  schema.tagNames.push('iframe')
  schema.tagNames.push('script')
  schema.attributes['*'].push('style')
  schema.attributes['*'].push('src')
  schema.attributes['*'].push('scrolling')
  schema.attributes['*'].push('border')
  schema.attributes['*'].push('frameborder')
  schema.attributes['*'].push('framespacing')
  schema.attributes['*'].push('allowfullscreen')
  schema.strip = []
  return schema
}

const EditorPage = () => {
  const [value, setValue] = useState('')
  const plugins = useMemo(() => {
    return [
      gfm({ locale: cn }),
      highlight(),
      frontmatter(),
      math({ locale: cn }),
      mediumZoom(),
      mermaid({ locale: cn }),
      emoji(),
      insertMore(),
      rawHTML(),
      historyIcon(),
      Heading(),
      customCodeBlock(),
      LinkTarget()
    ]
  }, [])

  return (
    <div className="editorPage h-full light">
      <Editor
        locale={cn}
        value={value}
        plugins={plugins}
        sanitize={sanitize}
        onChange={(v) => {
          setValue(v)
        }}
      />
    </div>
  )
}

export default EditorPage
