const path = require('path')
const JIMP = require('jimp')
const format = require('date-fns/format')

const colors = {
  brand: '#a55eea',
  book: '#4b7bec',
  note: '#26de81',
  post: '#fd9644',
  project: '#4b6584',
}

module.exports = async function(type, node, id){
  let color = colors[type] ? colors[type] : colors.brand

  const logo = await JIMP.read(path.join(__dirname, '..', 'static', '192.png'))

  await createImage(node, color, 600, 314, `twitter-${id}.png`, logo)
  await createImage(node, color, 540, 282, `facebook-${id}.png`, logo)

}

async function asyncForEach(array, callback){
  for(let i = 0; i < array.length; i++){
    await callback(array[i], i, array)
  }
}

async function createImage(node, color, x, y, output, logo){
  const image = await new JIMP(x, y, color)
  await image.composite(logo, x - 200, y - 200)

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

  await image.print(smallFont, 10, y - 24, format(node.frontmatter.date, 'Do MMMM YYYY'))

  await image.write(path.join(__dirname, '..', 'static', 'social', output))
}
