function startCrawling() {
    var website = document.getElementById("website").value;
    document.getElementById("output").innerHTML = "Crawling... Please wait.";

    fetchPageContent(website)
        .then(data => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            var links = Array.from(doc.querySelectorAll('a')).map(a => resolveRelativeURL(a.href, website));

            document.getElementById("output").innerHTML = formatOutput(links);
        })
        .catch(error => console.error('Error:', error));
}

async function fetchPageContent(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function resolveRelativeURL(href, base) {
    var doc = document.implementation.createHTMLDocument();
    var baseElement = doc.createElement('base');
    baseElement.href = base;
    doc.head.appendChild(baseElement);
    var a = doc.createElement('a');
    console.log(a)
    a.href = href;
    const regexSearch = /https:\/\/tegarsabila\.github\.io/gi;
    const replacedString = a.href.replace(regexSearch, base)
    return replacedString
    
}

function formatOutput(links) {
    let output = `[+] Total links: ${links.length}\n\n`;

    links.forEach(link => {
        output += `[+] Link: ${link}\n`;
    });

    return output;
}
