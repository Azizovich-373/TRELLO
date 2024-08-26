export function reload(arr, component, places, isTask = true) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        const elem = component(item)

        places[isTask ? item.status - 1 : 0].append(elem)
    }
}