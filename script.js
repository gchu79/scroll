class Bible {
    constructor(outputBookTextElement, outputVersionTextElement, outputBookNumberElement) {
        this.outputBookTextElement = outputBookTextElement
        this.outputVersionTextElement = outputVersionTextElement
        this.outputNumberTextElement = outputNumberTextElement
    }

    clearnumber() {
        this.outputNumberTextElement.innerHTML = ''
    }

    clearversion() {
        this.outputVersionTextElement.innerHTML = ''
    }
}

const outputBookTextElement = document.querySelector('[output-book]')
const outputVersionTextElement = document.querySelector('[output-version]')
const outputNumberTextElement = document.querySelector('[output-number]')
const outputDataMaxTextElement = document.querySelector('[data-max]')

const bible = new Bible(outputBookTextElement, outputVersionTextElement, outputNumberTextElement)

var stuff = JSON.parse(document.getElementById('stuff').innerHTML);
var idx = 0;
var book

document.querySelectorAll('.bible-grid [data-book]').forEach(item => {
    item.addEventListener('click', event => {
        bible.outputBookTextElement.innerHTML = item.innerHTML
        for (var i = 0; i < stuff.length; i++) {
            if (stuff[i].Book === item.innerHTML) {
                document.querySelector('[data-max]').innerHTML = stuff[i].Chapter;
                window.idx = i;
                bible.outputNumberTextElement.innerHTML = '';
            }
        }
    })
})

document.querySelectorAll('.version-grid [data-version]').forEach(item => {
    item.addEventListener('click', event => {
        if (item.innerHTML === 'GRK-HEB') {
            if (bible.outputNumberTextElement.innerHTML === '') {
                bible.outputNumberTextElement.innerHTML = '1'
            };
            window.open("https://biblehub.com/interlinear/" + bible.outputBookTextElement.innerHTML.replace('Song of Solomon', 'Songs').replace(' ', '_').toLowerCase() + "/" + bible.outputNumberTextElement.innerHTML + ".htm");
        }
        if (item.innerHTML.includes("GRK")) return
        if (bible.outputVersionTextElement.innerHTML.includes(item.innerHTML)) return
        if (bible.outputVersionTextElement.innerHTML.split(";").length > 3) return
        if (bible.outputVersionTextElement.innerHTML === "") {
            bible.outputVersionTextElement.innerHTML = item.innerHTML
        } else {
            bible.outputVersionTextElement.innerHTML += ";" + item.innerHTML
        }
    })
})

document.querySelectorAll('.number-grid [data-number]').forEach(item => {
    item.addEventListener('click', event => {
        if ((bible.outputNumberTextElement.innerHTML === "") & (item.innerHTML === "0")) return
        bible.outputNumberTextElement.innerHTML += item.innerHTML
        if (parseInt(bible.outputNumberTextElement.innerHTML) > document.querySelector('[data-max]').innerHTML) {
            bible.outputNumberTextElement.innerHTML = document.querySelector('[data-max]').innerHTML;
        }
    })
})

document.querySelectorAll('.number-grid [operation-number]').forEach(item => {
    item.addEventListener('click', event => {

        if ((item.innerHTML === "-") && (parseInt(bible.outputNumberTextElement.innerHTML) === 1)) return
        if ((item.innerHTML === "+") && (parseInt(bible.outputNumberTextElement.innerHTML) >= document.querySelector('[data-max]').innerHTML)) return

        if (item.innerHTML === "+") {
            if (bible.outputNumberTextElement.innerHTML === "") {
                bible.outputNumberTextElement.innerHTML = "0"
            }
            bible.outputNumberTextElement.innerHTML = parseInt(bible.outputNumberTextElement.innerHTML) + 1;
        }
        if (item.innerHTML === "-") {
            if (bible.outputNumberTextElement.innerHTML === "") {
                bible.outputNumberTextElement.innerHTML = document.querySelector('[data-max]').innerHTML
            }
            bible.outputNumberTextElement.innerHTML = parseInt(bible.outputNumberTextElement.innerHTML) - 1;
        }
    })
})

document.querySelectorAll('.output-grid [select-option]').forEach(item => {
    item.addEventListener('click', event => {
        if (bible.outputVersionTextElement.innerHTML === '') {
            bible.outputVersionTextElement.innerHTML = 'ESV'
        }
        if (bible.outputNumberTextElement.innerHTML === '') {
            bible.outputNumberTextElement.innerHTML = '1'
        }

        if (bible.outputBookTextElement.innerHTML === '' || bible.outputVersionTextElement.innerHTML === '' || bible.outputNumberTextElement.innerHTML === '') return;
        if (item.innerHTML === 'BibleHub Parallel') {
            window.open("https://biblehub.com/" + bible.outputBookTextElement.innerHTML.replace('Song of Solomon', 'Songs').replace(' ', '_').toLowerCase() + "/" + bible.outputNumberTextElement.innerHTML + ".htm");
        }
        if (item.innerHTML === 'Bible Gateway') {
            window.open("https://www.biblegateway.com/passage/?search=" + bible.outputBookTextElement.innerHTML.toLowerCase() + "%20" + bible.outputNumberTextElement.innerHTML + "&version=" + bible.outputVersionTextElement.innerHTML);
        }
        if (item.innerHTML === 'BibleHub Interlinear') {
            window.open("https://biblehub.com/interlinear/" + bible.outputBookTextElement.innerHTML.replace('Song of Solomon', 'Songs').replace(' ', '_').toLowerCase() + "/" + bible.outputNumberTextElement.innerHTML + "-1.htm");
        }
        if ((item.innerHTML === 'Pawson') && (stuff[window.idx].Constable.substring(0, 2) === 'ot')) {
            console.log(stuff[window.idx].Constable.substring(0, 2));
            window.open("https://www.davidpawson.org/resources/series/unlocking-the-new-testament");
        }
        if ((item.innerHTML === 'Pawson') && (stuff[window.idx].Constable.substring(0, 2) === 'nt')) {
            console.log(stuff[window.idx].Constable.substring(0, 2));
            window.open("https://www.davidpawson.org/resources/series/unlocking-the-new-testament-1");
        }
        if (item.innerHTML === 'Swindoll') {
            console.log(window.idx);
            window.open("https://insight.org/resources/bible/" + stuff[window.idx].Swindoll);
        }
        if (item.innerHTML === 'Stedman') {
            console.log(window.idx);
            window.open("https://www.raystedman.org/bible-overview/adventuring/" + stuff[window.idx].Stedman);
        }
        if (item.innerHTML === 'Constable') {
            console.log(window.idx);
            window.open("https://www.planobiblechapel.org/tcon/notes/html/" + stuff[window.idx].Constable);
        }
        if (item.innerHTML === 'Bible Project') {
            console.log(window.idx);
            window.book = bible.outputBookTextElement.innerHTML
            window.book = window.book.replace('Genesis', 'Genesis-1-11').replace('Exodus', 'Exodus-1-18').replace('1 Kings', '1-2-Kings').replace('2 Kings', '1-2-Kings').replace('1 Chronicles', '1-2-Chronicles').replace('2 Chronicles', '1-2-Chronicles').replace('Song of Solomon', 'Song-of-Songs').replace('Ezra', 'Ezra-Nehemih').replace('Nehemiah', 'Ezra-Nehemiah').replace('Nehemih', 'Nehemiah').replace('1 John', '1-3-John').replace('2 John', '1-3-John').replace('3 John', '1-3-John').replace(' ', '-')
            window.open("https://www.bibleproject.com/explore/" + window.book);
        }



        if (item.innerHTML === 'Blue Letter Bible') {
            console.log(window.idx);
            window.open("https://www.blueletterbible.org");
        }
        if (item.innerHTML === 'Bible.Org') {
            console.log(window.idx);
            window.open("https://bible.org/");
        }
        if (item.innerHTML === 'Mounce Greek') {
            console.log(window.idx);
            window.open("https://www.billmounce.com/greek-dictionary");
        }

        if (item.innerHTML === 'Truth for Life') {
            console.log(window.idx);
            window.open("https://truthforlife.org/resources/?type=sermon&scripture=" + bible.outputBookTextElement.innerHTML);
        }
        if (item.innerHTML === 'Grace to You') {
            console.log(window.idx);
            window.open("https://www.gty.org/library/bible-introductions/MSB" + stuff[window.idx].Macarthur);
        }
        if (item.innerHTML === 'Paul Tripp') {
            console.log(window.idx);
            if (stuff[window.idx].Book === 'James') {
                window.open("https://www.paultripp.com/bible-study/posts/" + stuff[window.idx].Paultripp + "-summary1");
            }
            else {
                window.open("https://www.paultripp.com/bible-study/posts/" + stuff[window.idx].Paultripp + "-summary");
            }
        }
        
        
        
    })
})

document.querySelectorAll('.number-grid [clear-number]').forEach(item => {
    item.addEventListener('click', event => {
        bible.clearnumber()
    })
})

document.querySelectorAll('.version-grid [clear-version]').forEach(item => {
    item.addEventListener('click', event => {
        bible.clearversion()
    })
})
