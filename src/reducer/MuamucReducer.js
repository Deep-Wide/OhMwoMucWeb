export const muamucReducer = (state, action) => {

    const removeMuamuc = (muamucList, muamucId) => {
        const index = muamucList.findIndex(muamuc => muamuc.muamucId === muamucId)
        if (index < 0)
            return;
        return [...muamucList.slice(0, index), ...muamucList.slice(index + 1)];
    }

    const updateMuamuc = (muamucList, newMuamuc) => {
        const index = muamucList.findIndex(muamuc => muamuc.muamucId === newMuamuc.muamucId)
        muamucList[index] = newMuamuc
        return [...muamucList]
    }

    switch (action.type) {
        case "setMuamucList":
            return action.payload
        case "addMuamuc":
            return [...state, action.payload]
        case "removeMuamuc":
            return removeMuamuc(state, action.payload)
        case "updateMuamuc":
            return updateMuamuc(state, action.payload)
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}
