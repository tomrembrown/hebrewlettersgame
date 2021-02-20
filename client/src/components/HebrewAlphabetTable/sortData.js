export default function sortData(hebrewAlphabetData, sortColumn, isAscending) {
  return hebrewAlphabetData.sort((letterA, letterB) => {
    let tempA = letterA[sortColumn]
    let tempB = letterB[sortColumn]
    if (sortColumn === 'transliteration') {
      if (tempA === 'ʾ') tempA = 'a'
      if (tempB === 'ʾ') tempB = 'a'
      if (tempA === 'ḇ') tempA = 'b'
      if (tempB === 'ḇ') tempB = 'b'
      if (tempA === 'ḡ') tempA = 'g'
      if (tempB === 'ḡ') tempB = 'g'
      if (tempA === 'ḏ') tempA = 'd'
      if (tempB === 'ḏ') tempB = 'd'
      if (tempA === 'ḥ') tempA = 'h'
      if (tempB === 'ḥ') tempB = 'h'
      if (tempA === 'ṭ') tempA = 't'
      if (tempB === 'ṭ') tempB = 't'
      if (tempA === 'ḵ') tempA = 'k'
      if (tempB === 'ḵ') tempB = 'k'
      if (tempA === 'ʿ') tempA = 'a'
      if (tempB === 'ʿ') tempB = 'a'
      if (tempA === 'p̄') tempA = 'p'
      if (tempB === 'p̄') tempB = 'p'
      if (tempA === 'ṣ') tempA = 's'
      if (tempB === 'ṣ') tempB = 's'
      if (tempA === 'ś') tempA = 's'
      if (tempB === 'ś') tempB = 's'
      if (tempA === 'š') tempA = 's'
      if (tempB === 'š') tempB = 's'
      if (tempA === 'ṯ') tempA = 't'
      if (tempB === 'ṯ') tempB = 't'
    }
    let defaultValue
    if (isAscending) defaultValue = 1
    else defaultValue = -1
    if (tempA < tempB) return -defaultValue
    else if (tempA > tempB) return defaultValue
    else if (letterA['id'] < letterB['id']) return -defaultValue
    else return defaultValue
  })
}
