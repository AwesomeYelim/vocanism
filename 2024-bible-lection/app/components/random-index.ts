const randomIndex = (argLength: number) => Math.floor(Math.random() * argLength)

export default randomIndex

/** 1일 1 random 키 */
export const randomIndexPerDay = (argLength: number) => {
  const currentDate = new Date()
  const dayOfYear = Math.floor(
    (+currentDate - +new Date(currentDate.getFullYear(), 0, 0)) / 86400000,
  )

  const randomKeyIndex = dayOfYear % argLength

  return randomKeyIndex
}
