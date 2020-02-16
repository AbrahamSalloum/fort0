
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
    return ["art"]
}

const getrandomfortune = async () => {
    randcat = getrandom(catlist.length)
    cat = catlist[randcat]
    f = await fetch("https://raw.githubusercontent.com/AbrahamSalloum/fort0/master/jsonfortunes/"+catlist[getrandom(catlist.length)]+".json")
    fo = await f.json(); 
    randfort = getrandom(fo.length)
    return fo[randfort]
}

export const  getcollection =  async (total) => {
    collection = []
    while(total > 0 ){
        x = await getrandomfortune()
        collection.push(x)
	    total--
    }
	return collection
}