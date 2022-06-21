//id можно еще Date().now или библиотеку UUID ф-ция v1()
export const uuid = () => {
   return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, (c, r) => ('x' === c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8))
            .toString(16))
}
export const addNewType = (editableArray: string[], option: string) => {
  return [option, ...editableArray]
}



