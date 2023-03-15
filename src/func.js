function get(url, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

class Entry {
    constructor(rowObject) {
        let data = rowObject.c;
        [this.name, this.status, this.type, this.comment, this.location] = data;
    } 
}
