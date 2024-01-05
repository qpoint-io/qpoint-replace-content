import { Context } from '@qpoint/endpoint'
import { ContentReplacer } from './content-replacer'

type RewriteHtmlConfig = {
  rules: Rule[]
}

export type Rule = {
  from: string
  to: string
}

// adapter registration
export default function rewriteHtml(config: RewriteHtmlConfig) {
  // return middleware
  return function run(context: Context, next: Function) {
    // attach the replacer
    context.htmlRewriter
      .on("*", new ContentReplacer(config.rules));

    // continue along
    return next();
  }
}
