export default function kingdom(
  state = {
    name: null,
    shouldUpdate: false,
    level1Troops: 0,
    level2Troops: 0,
    level3Troops: 0,
  },
  action,
) {
  switch (action.type) {
    case 'KINGDOM_CHANGE_SUCCEEDED': {
      return {
        ...state,
        name: action.payload.name,
        shouldUpdate: true,
      };
    }
    case 'MY_TROOPS_RECIEVED': {
      const countFunction = (givenObject, level) => givenObject.reduce((n, troops) => n + (troops.level === level), 0);
      return {
        ...state,
        level1Troops: countFunction(action.payload.troops, 1),
        level2Troops: countFunction(action.payload.troops, 2),
        level3Troops: countFunction(action.payload.troops, 3),
      };
    }
    default:
      return state;
  }
}
