import { Rule } from "."

export class ContentReplacer {
  buffer: string
  rules: Rule[]

  constructor(rules: Rule[]) {
    this.rules = rules
  }

  element(element: Element) {
    // initialize the buffer for this element
    this.buffer = ''
  }

  text(text: Text) {
    // add the incoming chunk of text to the buffer
    this.buffer += text.text

    if (!text.lastInTextNode) {
      // this wasn't the last text chunk, and we don't know if this chunk will
      // participate in a match. We must remove it so the client doesn't see it
      text.remove()

      // return early and wait for next chunk
      return
    }

    // replace each instance
    this.rules.forEach((rule) => {
      this.buffer = this.buffer.replaceAll(rule.from, rule.to)
    })

    // replace the text with the entire content of the buffer
    // ({ html: true } so the text won't be html escaped)
    text.replace(this.buffer, { html: true })

    // reset the buffer for the next element
    this.buffer = ''
  }
}