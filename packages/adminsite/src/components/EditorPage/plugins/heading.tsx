import { BytemdPlugin } from 'bytemd'
import { visit } from 'unist-util-visit'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headingPlugin = () => (tree: any) => {
  visit(tree, (node) => {
    if (node.type === 'element' && headings.includes(node.tagName)) {
      const title = node.children[0]?.value
      node.properties['data-id'] = title
    }
  })
}

export function Heading(): BytemdPlugin {
  return {
    rehype: (processor) => processor.use(headingPlugin)
  }
}
