const jsonToCsvLine = (json) => {
   const data = Object.values(json)
   return `${data.join(',')}\n`
}

module.exports = jsonToCsvLine
