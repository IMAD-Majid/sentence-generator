var dictionary = {};
var sentences = [];
var results = [];

function deleteValue(arr, val){
    if (arr.length == 0){
        return;
    }
    let temp = val;
    arr[arr.indexOf(val)] = arr[arr.length-1];
    arr[arr.length-1] = temp;
    arr.pop();
}

function addTerm(){
    var term = document.getElementById("termin").value;
    var meaningsline = document.getElementById("meanings").value;
   
    if (meaningsline == '' || term == ''){
        alert("No meanings line or term was entered !")
        return;
    }
    if (dictionary[term] != undefined){
        alert("A term must be unique !")
        return;
    }
    
    var meanings = meaningsline.replace(/\s/g, '');
    meanings = meanings.split(',');

    for (var meaning of meanings){
        if (meaning == term){
            alert("A meaning must not be equal to a term !")
            return;
        }
    }

    for (var meaning of meanings){
        for (var existingterm in dictionary){
            if (meaning == existingterm){
                alert("A meaning must not be equal to a term !")
                return;
            }
        }
    }
    dictionary[term] = meanings;

    var termsList = document.getElementById('definitions');
    var newHTML = `
    <li>
        <div class="defcontainer">
            <p class="definition">
                <span class="term">$term</span>
                <span class="mcount count">$count</span>
                <span class="meanings">$meanings</span>
            </p>
            <button onclick="deleteTerm('$term')"> X </button>
        </div>
    </li>
    `;
    newHTML = newHTML.replace("$term", term);    newHTML = newHTML.replace("$term", term);
    newHTML = newHTML.replace("$count", dictionary[term].length);
    newHTML = newHTML.replace("$meanings", dictionary[term].join(", "));
    termsList.innerHTML += newHTML;
}

function deleteTerm(term){
    var termin = document.getElementById('termin');
    var meanings = document.getElementById('meanings');
    var termsList = document.getElementById('definitions');
    let curItem;
    for (let i=0; i<termsList.children.length; i++){
        curItem = termsList.children[i];
        if (curItem.children[0].children[0].children[0].textContent == term){ // li > div > p > span > term
            termsList.removeChild(curItem);
            break;
        }
    }
    termin.value = term;
    meanings.value = dictionary[term].join(", ");
    delete dictionary[term];
}

function addSentence(){
    var sentence = document.getElementById("sentencein").value;
    sentences.push(sentence);
    var sentencesList = document.getElementById('sentences');
    var newHTML = `
    <li>
        <div class="sencontainer">
            <p>
                @Sentence
            </p>
            <button onclick="deleteSentence('@Sentence')"> X </button>
        </div>
    </li>
    `;
    newHTML = newHTML.replace("@Sentence", sentence);    newHTML = newHTML.replace("@Sentence", sentence);
    sentencesList.innerHTML += newHTML;
}

function deleteSentence(sentence){
    var sentencein = document.getElementById('sentencein');
    var sentencesList = document.getElementById('sentences');
    let curItem;
    for (let i=0; i<sentencesList.children.length; i++){
        curItem = sentencesList.children[i];
        if (curItem.children[0].children[0].textContent.indexOf(sentence) != -1){ // li > div > p > sentence
            sentencesList.removeChild(curItem);
            break;
        }
    }
    sentencein.value = sentence;
    deleteValue(sentences, sentence);
}
function generate(){
    var resultsText = document.getElementById("results");
    var insen = sentences;
    var outsen;
    var pattern;
    console.log(insen, outsen)
    for (var term in dictionary){
        outsen = [];
        for (var sentence of insen){
            for (var meaning of dictionary[term]){
                if (sentence.indexOf(term) != -1){
                    pattern = new RegExp(term, 'g');
                    outsen.push(sentence.replace(pattern, meaning))
                }
            }
        }
        insen = outsen;
    }
    results = outsen;

    resultsText.textContent = results.join("\n");
    document.getElementById("resultscount").textContent = results.length;
    results = [];
}
