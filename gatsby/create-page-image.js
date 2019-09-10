const path = require('path')
const JIMP = require('jimp')
const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')

module.exports = async function(type, node, id){
  await createImage(node, 600, 314, `twitter-${id}.png`)
  await createImage(node, 540, 282, `facebook-${id}.png`)
}

async function asyncForEach(array, callback){
  for(let i = 0; i < array.length; i++){
    await callback(array[i], i, array)
  }
}

async function createImage(node, x, y, output){
  const image = await JIMP.read(path.join(__dirname, '..', 'static', `social-${x}-${y}.png`))

  const font = await JIMP.loadFont(JIMP.FONT_SANS_32_BLACK)

  const words = node.frontmatter.title.split(' ')
  let write = ''
  let writeY = 10

  await asyncForEach(words, async (word) => {
    let nextWrite = [write, word].join(' ').trim()

    if(JIMP.measureText(font, nextWrite) > x - 20){
      await image.print(font, 10, writeY, write)

      write = word
      writeY += 40
    }else{
      write = nextWrite
    }
  })

  await image.print(font, 10, writeY, write)

  const smallFont = await JIMP.loadFont(JIMP.FONT_SANS_14_BLACK)

  await image.print(smallFont, 10, y - 24, format(parseISO(node.frontmatter.date), 'Do MMMM yyyy'))

  return await image.write(path.join(__dirname, '..', 'static', 'social', output))
}
