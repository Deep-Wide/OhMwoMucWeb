export default function UserReducer(state, action) {
    switch (action.type) {
        case "setUser":
            return action.payload
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}