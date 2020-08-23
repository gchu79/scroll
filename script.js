class Bible {
    constructor(outputBookTextElement, outputVersionTextElement, outputBookNumberElement, outputSelectionTextElement) {
        this.outputBookTextElement = outputBookTextElement
        this.outputVersionTextElement = outputVersionTextElement
        this.outputNumberTextElement = outputNumberTextElement
        this.outputSelectionTextElement = outputSelectionTextElement        
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
const outputSelectionTextElement = document.querySelector('[output-selection]')
const outputDataMaxTextElement = document.querySelector('[data-max]')

const bible = new Bible(outputBookTextElement, outputVersionTextElement, outputNumberTextElement, outputSelectionTextElement)

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
        if (bible.outputVersionTextElement.innerHTML.includes(item.innerHTML)) return
        if (bible.outputVersionTextElement.innerHTML.split(";").length > 3 ) return
        if (bible.outputVersionTextElement.innerHTML === "") {
            bible.outputVersionTextElement.innerHTML = item.innerHTML
        }
        else {
            bible.outputVersionTextElement.innerHTML += ";" + item.innerHTML
        }        
    })
})

document.querySelectorAll('.number-grid [data-number]').forEach(item => {
    item.addEventListener('click', event => {
        bible.outputNumberTextElement.innerHTML += item.innerHTML
        if (parseInt(bible.outputNumberTextElement.innerHTML) > document.querySelector('[data-max]').innerHTML) {
            bible.outputNumberTextElement.innerHTML = document.querySelector('[data-max]').innerHTML;
        }
    })
})

document.querySelectorAll('.output-grid [select-option]').forEach(item => {
    item.addEventListener('click', event => {
        bible.outputSelectionTextElement.innerHTML = item.innerHTML;
        if (bible.outputVersionTextElement.innerHTML === '') {bible.outputVersionTextElement.innerHTML = 'ESV'}
        if (bible.outputNumberTextElement.innerHTML === '') {bible.outputNumberTextElement.innerHTML = '1'}
        
        if (bible.outputBookTextElement.innerHTML === '' || bible.outputVersionTextElement.innerHTML === '' || bible.outputNumberTextElement.innerHTML === '') return;
        if (item.innerHTML === 'BibleHub Parallel') {
            window.open("https://biblehub.com/" + bible.outputBookTextElement.innerHTML.replace('Song of Solomon','Songs').replace(' ','_').toLowerCase() + "/" + bible.outputNumberTextElement.innerHTML + ".htm");        
        }
        if (item.innerHTML === 'BibleGateway') {
            window.open("https://www.biblegateway.com/passage/?search=" + bible.outputBookTextElement.innerHTML.toLowerCase() + "%20" + bible.outputNumberTextElement.innerHTML + "&version=" + bible.outputVersionTextElement.innerHTML);        
        }
        if (item.innerHTML === 'BibleHub Interlinear') {
            window.open("https://biblehub.com/interlinear/" + bible.outputBookTextElement.innerHTML.replace('Song of Solomon','Songs').replace(' ','_').toLowerCase() + "/" + bible.outputNumberTextElement.innerHTML + "-1.htm");            
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
            window.book = window.book.replace('Genesis','Genesis-1-11').replace('Exodus','Exodus-1-18').replace('1 Kings','1-2-Kings').replace('2 Kings','1-2-Kings').replace('1 Chronicles','1-2-Chronicles').replace('2 Chronicles','1-2-Chronicles').replace('Song of Solomon','Song-of-Songs').replace('Ezra','Ezra-Nehemih').replace('Nehemiah','Ezra-Nehemiah').replace('Nehemih','Nehemiah').replace('1 John','1-3-John').replace('2 John','1-3-John').replace('3 John','1-3-John').replace(' ','-')  
            window.open("https://www.bibleproject.com/explore/" + window.book);            
        }        
        
        
         if (item.innerHTML === 'BlueLetterBible.Org') {
            console.log(window.idx);
            window.open("https://www.blueletterbible.org");            
        }        
         if (item.innerHTML === 'Bible.Org') {
            console.log(window.idx);
            window.open("https://bible.org/");
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