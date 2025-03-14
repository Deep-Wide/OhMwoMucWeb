import {create} from "zustand";

const RestaurantStore = create((set)=>({
    restaurantList: [],
    setRestaurantList: (newRestaurantList)=> set((state)=>({restaurantList: newRestaurantList})),
    updateRestaurantList: (newRestaurant) => set((state)=>({restaurantList: update(state.restaurantList, newRestaurant)}))

}))

const update = (restaurantList, newRestaurant) => {
    const index = restaurantList.findIndex(restaurant => restaurant.restaurantId === newRestaurant.restaurantId)
    restaurantList[index] = newRestaurant
    return [...restaurantList]
}

export default RestaurantStore;