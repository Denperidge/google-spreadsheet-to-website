function createFilters(entries) {
    let filters = {
        statuses: new Set(),
        types: new Set(),
        locations: new Set()
    };

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        filters.types.add(entry.type);
        filters.statuses.add(entry.status);
        filters.locations.add(entry.location);
    }

    let filterKeys = Object.keys(filters);
    filterKeys.forEach((key) => {
        const container = document.getElementById(key);
        
        filters[key].forEach((value) => {
            const button = document.createElement("button");
            button.innerText = value;
            button.value = value;
            button.className = "filter"    
            
            container.appendChild(button);
        });


    })


    filtersContainer.appendChild();
}


function handleEntries() {
    createFilters(entries);

}