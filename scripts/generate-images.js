const {readdirSync, readFileSync} = require('fs')
const path = require('path')
const JIMP = require('jimp')
const cliProgress = require('cli-progress')
const frontmatter = require('frontmatter')
const format = require('date-fns/format')

const postsPath = path.join(__dirname, '..', 'src', 'content', 'posts')
const socialsPath = path.join(__dirname, 'social-images')
const outputPath = path.join(__dirname, '..', 'static', 'social')

const POST_PATH_SLUG_PATTERN = /^([\d]{4})-([\d]{2})-([\d]{2})-(.*?)$/

const posts = readdirSync(postsPath)
const socials = readdirSync(socialsPath)

const progress = new cliProgress.SingleBar()

const max = posts.length * socials.length
progress.start(max, 0)
let i = 0

const generateImages = (image) => {
  posts.forEach((post) => generateImage(image, post))
}

const generateImage = (social, post) => {
  JIMP.read(path.join(socialsPath, social))
    .then((image) => {
      const file = readFileSync(path.join(postsPath, post, 'index.mdx')).toString()

      const matches = POST_PATH_SLUG_PATTERN.exec(post)
      const output = path.join(outputPath, matches[1], matches[2], matches[4])

      const {data} = frontmatter(file)

      JIMP.loadFont(JIMP.FONT_SANS_32_BLACK)
        .then((font) => {
          let y = 20
          let writes = []
          let j = 0

          data.title.split(' ').forEach((word) => {
            let write = writes[j] || ''
            let nextWrite = [write, word].join(' ').trim()

            if(JIMP.measureText(font, nextWrite) > image.bitmap.width - 40){
              j++
              writes[j] = word
            }else{
              writes[j] = nextWrite
            }
          })

          writes.forEach((write, index) => {
            image.print(font, 20, y + (32 * index), write)
          })

          JIMP.loadFont(JIMP.FONT_SANS_14_BLACK)
            .then((smallFont) => {
              image.print(smallFont, 20, image.bitmap.height - 34, format(data.date, 'do MMMM yyyy'))

              image.write(path.join(output, social))
              progress.update(i)
              i++

              if(i === max){
                progress.stop()
              }
            })
        })
    })
    .catch((error) => console.error(`Could not read ${image} (${error})`))
}

socials.forEach(generateImages)
