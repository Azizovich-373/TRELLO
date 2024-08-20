export function reload(arr, component, places) {
    places.forEach(el => el.innerHTML = "")

    for(let item of arr) {
        const elem = component(item)

        places[item.status - 1].append(elem)
    }
}