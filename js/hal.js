// The MIT License (MIT)

// hal.js | Copyright (c) 2019 IGN

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// documentation on HAL API: https://api.archives-ouvertes.fr/docs/search/?schema=fields#fields


var getAllPublicationsAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s,docType_s&sort=producedDateY_i desc";
    request.open('GET', url, true);
    console.log(url);
    console.log(request.status);
    var parentJournal = document.getElementById("pubJ");
    var parentConference = document.getElementById("pubC");
    var parentBook = document.getElementById("pubB");
    var parentThese = document.getElementById("pubT");
    var parentWorkshop = document.getElementById("pubW");
    var parentOther = document.getElementById("pubO");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data.response);
        console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // Log each doc id
            console.log(docs.docid)
        })
    };

    request.send();
}

var getJournalPublicationsAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s&fq=docType_s:\"ART\"&fl=producedDateY_i,halId_s,fileMain_s&sort=producedDateY_i desc";
    request.open('GET', url, true);

    var parentJournal = document.getElementById("pubJ");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data.response);
        //console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // first create the list element with the citation
            createPubHTML(docs, parentJournal);
        })
    };

    request.send();
}


var getConfPublicationsAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s&fq=docType_s:\"COMM\"&fq=invitedCommunication_s:\"0\"&fl=producedDateY_i,halId_s,fileMain_s&sort=producedDateY_i desc";
    request.open('GET', url, true);

    var parentConference = document.getElementById("pubC");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data.response);
        //console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // first create the list element with the citation
            createPubHTML(docs, parentConference);
        })
    };

    request.send();
}

var getThesePublicationsAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s&fq=docType_s:\"THESE\"&fl=producedDateY_i,halId_s,fileMain_s&sort=producedDateY_i desc";
    request.open('GET', url, true);

    var parentBook = document.getElementById("pubT");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data.response);
        //console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // first create the list element with the citation
            createPubHTML(docs, parentThese);
        })
    };

    request.send();
}


var getOtherPublicationsAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s&fq=docType_s:(\"REPORT\" OR \"THESE\" OR \"HDR\" OR \"UNDEFINED\")&fl=producedDateY_i,halId_s,docType_s,fileMain_s&sort=producedDateY_i desc";
    request.open('GET', url, true);

    var parentOther = document.getElementById("pubO");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data.response);
        //console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // first create the list element with the citation
            createPubHTML(docs, parentOther);
        })
    };

    request.send();
}


var getInvitedTalksAuthor = function(halId){
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://api.archives-ouvertes.fr/search/?q=authIdHal_s:%22" + halId + "%22&wt=json&fl=citationFull_s&fq=invitedCommunication_s:1&fl=producedDateY_i,halId_s,docType_s,fileMainAnnex_s&sort=producedDateY_i desc";
    request.open('GET', url, true);
    console.log(url);

    var parentOther = document.getElementById("talks");

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data.response);
        //console.log(data.response.docs);
        data.response.docs.forEach(docs => {
            // first create the list element with the citation
            createTalkHTML(docs, parentOther);
        })
    };

    request.send();
}



var createPubHTML = function(docs, parent){
    const listElement = document.createElement('li');
    listElement.innerHTML = docs.citationFull_s
    const appendChildElement = parent.appendChild(listElement);

    // then create the "pubLink" div that contains the links related to the publication
    pubLinkElement = document.createElement('div');
    pubLinkElement.setAttribute("class","pubLink");
    listElement.appendChild(pubLinkElement);
    // create a span element inside the new div
    spanElement = document.createElement('span');
    spanElement.setAttribute("class","bibtex");
    pubLinkElement.appendChild(spanElement);
    // create an input element inside the span
    inputElement = document.createElement('input');
    inputElement.setAttribute("type","image");
    inputElement.setAttribute("src","img/icons/publications/bibtex.png");
    inputElement.setAttribute("alt","BibTeX entry for this article");
    inputElement.setAttribute("title","BibTeX entry for this article");
    bibtexURL = "https://hal.archives-ouvertes.fr/"+docs.halId_s+"/bibtex";
    inputElement.setAttribute("onclick","window.open('"+bibtexURL+"','BibTex','width=800,height=200,top=100,left=100,scrollbars=yes,resizable=yes');");
    spanElement.appendChild(inputElement);
    // create an a element with the url to hal
    aHALElement = document.createElement('a');
    aHALElement.setAttribute("class","imgLink");
    imgElement = document.createElement('img');
    imgElement.setAttribute("src","img/icons/publications/hal.png");
    imgElement.setAttribute("height","20");
    imgElement.setAttribute("alt","HAL link");
    imgElement.setAttribute("title","HAL link");
    halURL = "https://hal.archives-ouvertes.fr/"+docs.halId_s;
    aHALElement.setAttribute("href",halURL);
    aHALElement.appendChild(imgElement);
    pubLinkElement.appendChild(aHALElement);
    // create an a element with the url of the pdf
    pdfElement = document.createElement('a');
    pdfElement.setAttribute("class","imgLink");
    imgPdfElement = document.createElement('img');
    imgPdfElement.setAttribute("title","PDF document");
    imgPdfElement.setAttribute("src","img/icons/publications/pdf.gif");
    imgPdfElement.setAttribute("height","20");
    imgPdfElement.setAttribute("alt","PDF document");
    pdfURL = "https://hal.archives-ouvertes.fr/"+docs.halId_s+"/document";
    pdfElement.setAttribute("href",pdfURL);
    pdfElement.appendChild(imgPdfElement);
    pubLinkElement.appendChild(pdfElement);
}


var createTalkHTML = function(docs, parent){
    const listElement = document.createElement('li');
    listElement.innerHTML = docs.citationFull_s
    const appendChildElement = parent.appendChild(listElement);

    // then create the "pubLink" div that contains the links related to the publication
    pubLinkElement = document.createElement('div');
    pubLinkElement.setAttribute("class","pubLink");
    listElement.appendChild(pubLinkElement);
    // create a span element inside the new div
    spanElement = document.createElement('span');
    spanElement.setAttribute("class","bibtex");
    pubLinkElement.appendChild(spanElement);
    // create an input element inside the span
    inputElement = document.createElement('input');
    inputElement.setAttribute("type","image");
    inputElement.setAttribute("src","img/icons/publications/bibtex.png");
    inputElement.setAttribute("alt","BibTeX entry for this article");
    inputElement.setAttribute("title","BibTeX entry for this article");
    bibtexURL = "https://hal.archives-ouvertes.fr/"+docs.halId_s+"/bibtex";
    inputElement.setAttribute("onclick","window.open('"+bibtexURL+"','BibTex','width=800,height=200,top=100,left=100,scrollbars=yes,resizable=yes');");
    spanElement.appendChild(inputElement);
    // create an a element with the url to hal
    aHALElement = document.createElement('a');
    aHALElement.setAttribute("href",docs.halId_s);
    aHALElement.setAttribute("class","imgLink");
    imgElement = document.createElement('img');
    imgElement.setAttribute("title","HAL");
    imgElement.setAttribute("src","img/icons/publications/hal.png");
    imgElement.setAttribute("height","20");
    imgElement.setAttribute("alt","HAL");
    aHALElement.appendChild(imgElement);
    pubLinkElement.appendChild(aHALElement);
    // create an a element with the url of the pdf
    pdfElement = document.createElement('a');
    pdfElement.setAttribute("href",docs.fileMain_s);
    pdfElement.setAttribute("class","imgLink");
    imgPdfElement = document.createElement('img');
    imgPdfElement.setAttribute("title","pdf");
    imgPdfElement.setAttribute("src","img/icons/publications/pdf.gif");
    imgPdfElement.setAttribute("height","20");
    imgPdfElement.setAttribute("alt","pdf");
    pdfElement.appendChild(imgPdfElement);
    pubLinkElement.appendChild(pdfElement);
}

var sort_by = function(field, reverse, primer){
     var key = function (x) {return primer ? primer(x[field]) : x[field]};

     return function (a,b) {
	  var A = key(a), B = key(b);
	  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
     }
}
