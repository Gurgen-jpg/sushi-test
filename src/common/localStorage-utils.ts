export const loadState = () => {
  try {
      const serializedState = localStorage.getItem('name')
      if (!serializedState) {
          return undefined
      }
  }
  catch (e) {
      return undefined
  }
}

export const saveState = (state: string) => {
  try {
      const serializedState = JSON.stringify(state)
        localStorage.setItem('name', serializedState)
  }
  catch (e) {

  }
}