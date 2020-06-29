export default function building(
  state = {
    buildings: [],
    logs: [],
    backlogs: [],
    simpleBuilding: {},
    finishedBuildings: [],
  },
  action,
) {
  switch (action.type) {
    case 'ADD_PERCENTAGE': {
      return {
        ...state,
        logs: state.logs.slice().sort((a, b) => a.finished_at - b.finished_at)
          .map(log => (log._id === action.payload.id ? { ...log, percentage: action.payload.percentage } : log)),
      };
    }
    case 'CHANGE_LOG': {
      return {
        ...state,
        finishedBuildings: state.finishedBuildings.concat(state.logs.filter(item => item._id === action.payload.id)),
        backlogs: state.backlogs.concat(state.logs.filter(item => item._id === action.payload.id)),
        logs: state.logs.filter(log => (log._id !== action.payload.id ? { ...log } : null)),
      };
    }
    case 'REMOVE_FROM_BACK_LOG': {
      return {
        ...state,
        backlogs: state.backlogs.filter(log => log._id !== action.payload.id),
      };
    }
    case 'CLEAR_BACK_LOG': {
      return {
        ...state,
        backlogs: [],
      };
    }
    case 'INITIAL_BUILDINGS_UPDATED': {
      return {
        ...state,
        buildings: action.payload,
        finishedBuildings: action.payload.filter(buildings => buildings.finished_at <= Date.now()),
      };
    }
    case 'GET_BUILDING_BY_ID': {
      return {
        ...state,
        simpleBuilding: state.buildings.filter(building => building._id === action.payload)[0],
      };
    }
    case 'UPGRADE_BUILDING': {
      return {
        ...state,
        simpleBuilding: { ...state.simpleBuilding, level: state.simpleBuilding.level + 1 },
        logs: state.logs.concat(state.simpleBuilding),
      };
    }
    case 'GET_NEW_BUILDING': {
      return {
        ...state,
        logs: state.logs.concat(action.payload),
      };
    }
    case 'GET_NEW_TROOP': {
      return {
        ...state,
        logs: state.logs.concat(action.payload),
      };
    }
    default:
      return state;
  }
}
