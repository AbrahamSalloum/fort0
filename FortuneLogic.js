catlist =
[
"art", "ascii-art", "computers", "cookie", "debian", "definitions", "disclaimer", "drugs", "education", "ethnic", "food",
"fortunes", "goedel", "humorists", "kids", "knghtbrd", "law", "linux", "linuxcookie", "literature", "love", "magic", "medicine",
"men-women", "miscellaneous", "news", "paradoxum", "people", "perl", "pets", "platitudes", "politics", "pratchett", "riddles",
"science", "songs-poems", "sports", "startrek", "tao", "translate-me", "wisdom", "work", "zippy"
]

getrandom = (max) => {
    return  Math.floor(Math.random() * max)
}

getexcludelist = () => {
    return [""]
}

getrandomfortune = () => {
    randcat = getrandom(catlist.length)
    cat = catlist[randcat]
    fortunelist = require("./jsonfortunes/" +"startrek"+".json")
    randfort = getrandom(fortunelist.length)
    return fortunelist[randfort]
}

export const getcollection = (total) => {
    let collection = []
    while(collection.length < total){
        fort = getrandomfortune()
        collection.push(fort)
    }
    return collection
}
