const initialInfo = {
  myName: '', 
  myCode: null,
  tuto: false
}


function myInfos(state = initialInfo, action) {
    let nextState
    switch (action.type) {
      case 'replace-name':
        return nextState ={ ...state, myName: action.value }
        case 'replace-qr':
        return nextState= { ...state, myCode: action.value }
        case 'tutoEnd':
        return nextState= { ...state, tuto: action.value }
    default:
      return state
    }
  }

export default myInfos