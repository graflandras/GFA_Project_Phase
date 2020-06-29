export default function resource(
  state = {
    foodAmount: 1,
    foodGeneration: 1,
    diamondAmount: 1,
    diamondGeneration: 1,
  },
  action,
) {
  switch (action.type) {
    case 'INITIAL_RESOURCE_UPDATED': {
      return {
        ...state,
        foodAmount: action.payload.resources[0].amount,
        diamondAmount: action.payload.resources[1].amount,
        foodGeneration: action.payload.resources[0].generation,
        diamondGeneration: action.payload.resources[1].generation,
      };
    }
    case 'RESOURCE_UPDATER': {
      return {
        ...state,
        foodAmount: action.payload.foodAmount + state.foodGeneration,
        diamondAmount: action.payload.diamondAmount + state.diamondGeneration,
      };
    }
    default:
      return state;
  }
}
