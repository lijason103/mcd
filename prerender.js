import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function prerender() {
  // Import the server entry (built by Vite)
  const { render } = await import('./dist/server/entry-server.js')

  // Read the built HTML template
  let template = fs.readFileSync(
    path.resolve(__dirname, 'dist/index.html'),
    'utf-8'
  )

  // Find and inline CSS
  const cssLinkMatch = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
  if (cssLinkMatch) {
    const cssPath = cssLinkMatch[1].replace('/mcd/', '')
    const cssFullPath = path.resolve(__dirname, 'dist', cssPath)

    if (fs.existsSync(cssFullPath)) {
      const cssContent = fs.readFileSync(cssFullPath, 'utf-8')
      // Replace the link tag with inline style
      template = template.replace(
        cssLinkMatch[0],
        `<style>${cssContent}</style>`
      )
      console.log('Inlined CSS:', cssPath)
    }
  }

  // Render the app (use full path with basename)
  const appHtml = render('/mcd/')

  // Inject rendered HTML into template
  const html = template.replace('<!--ssr-outlet-->', appHtml)

  // Write the prerendered HTML
  fs.writeFileSync(
    path.resolve(__dirname, 'dist/index.html'),
    html
  )

  console.log('Prerendered index.html')

  // Clean up server directory (not needed for deployment)
  fs.rmSync(path.resolve(__dirname, 'dist/server'), { recursive: true, force: true })

  console.log('Cleaned up dist/server')
}

prerender()
