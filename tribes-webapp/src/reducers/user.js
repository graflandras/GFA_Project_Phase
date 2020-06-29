export default function user(
  state = {
    isAuthenticated: false,
    isAuthenticating: false,
    isLoggedIn: false,
    loginFailed: null,
    email: null,
    username: null,
    isGame: true,
    loginError: false,
    errMessage: null,
    authWrong: false,
    regSuccess: false,
    takenCountries: null,
    currentKingdom: null,
    hasKingdom: false,
    myCountries: null,
    fullMap: null,
    attackEnemyResult: null,
  },
  action,
) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCEEDED':
      {
        return {
          ...state,
          isAuthenticating: true,
          loginError: false,
        };
      }
    case 'LOGIN_FAILED': {
      return {
        ...state,
        isAuthenticated: false,
        loginError: true,
        errMessage: action.payload.message,
      };
    }
    case 'USER_AUTHENTICATED': {
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    }
    case 'USER_AUTH_FAILED': {
      return {
        ...state,
        isAuthenticated: false,
        authWrong: true,
      };
    }
    case 'USER_REGISTRATION_SUCCESS': {
      return {
        ...state,
        username: action.payload.username,
        kingdomName: action.payload.kingdomName,
        currentKingdom: action.payload.kingdomId,
        regSuccess: true,
      };
    }
    case 'USER_REGISTRATION_FAILED': {
      return {
        ...state,
        errMessage: action.payload.error,
      };
    }
    case 'TAKEN_COUNTRIES_RECIEVED': {
      return {
        ...state,
        takenCountries: action.payload.occupiedCountries,
        fullMap: action.payload.fullMap.kingdoms,
      };
    }
    case 'KINGDOM_ATTACHED': {
      return {
        ...state,
        hasKingdom: true,
      };
    }
    case 'MY_COUNTRY_RECEIVED': {
      return {
        ...state,
        myCountries: action.payload,
      };
    }
    case 'ATTACK_ENEMY_RESULT': {
      return {
        ...state,
        attackEnemyResult: action.payload.message
      }
    }
    case 'CLEAR_ATTACK_STATUS': {
      return {
        ...state,
        attackEnemyResult: null,
      }
    }
    default:
      return state;
  }
}
