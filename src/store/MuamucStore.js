import {create} from "zustand";

const MuamucStore = create((set)=>({
    muamucTagList: [],
    muamucList: [],
    setMuamucTagList: (muamucTagList) => set((state)=>({muamucTagList, muamucList: state.muamucList})),
    setMuamucList: (muamucList) => set((state)=>({muamucTagList: state.muamucTagList, muamucList})),
    addMuamuc: (newMuamuc) => set((state)=>({muamucTagList: state.muamucTagList, muamucList: [...state.muamucList, newMuamuc]})),
    removeMuamuc: (muamucId) => set((state)=>({muamucTagList: state.muamucTagList, muamucList: remove(state.muamucList, muamucId)})),
    updateMuamuc: (newMuamuc) => set((state)=>({muamucTagList: state.muamucTagList, muamucList: update(state.muamucList, newMuamuc)}))
}))

const remove = (muamucList, muamucId) => {
    const index = muamucList.findIndex(muamuc => muamuc.muamucId === muamucId)
    if (index < 0)
        return;
    return [...muamucList.slice(0, index), ...muamucList.slice(index + 1)];
}

const update = (muamucList, newMuamuc) => {
    const index = muamucList.findIndex(muamuc => muamuc.muamucId === newMuamuc.muamucId)
    muamucList[index] = newMuamuc
    return [...muamucList]
}

export default MuamucStore