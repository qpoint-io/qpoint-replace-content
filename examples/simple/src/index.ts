import Endpoint from "@qpoint/endpoint";
import proxy from "@qpoint/proxy";
import replaceContent from "@qpoint/replace-content";
import rewriteHtml from "@qpoint/rewrite-html";

export default new Endpoint()
  // proxy to deno.land
  .use(proxy({ appUrl: "https://deno.land" }))

  // replace text occurrences
  .use(replaceContent({
    rules: [
      { from: "Deno", to: "Deyes" },
      { from: "deno", to: "deyes" },
      { from: "JavaScript", to: "FunnyScript" },
      { from: "TypeScript", to: "StrictScript" }
    ]
  }))

  // activate the rewrite
  .use(rewriteHtml({}))
