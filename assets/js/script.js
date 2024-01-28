function startCrawling() {
    var website = document.getElementById("website").value;
    document.getElementById("output").innerHTML = "Crawling... Please wait.";

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(website)}`)
        .then(response => response.json())
        .then(data => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data.contents, 'text/html');
            var links = Array.from(doc.querySelectorAll('a')).map(a => a.href);

            document.getElementById("output").innerHTML = formatOutput(links);
        })
        .catch(error => console.error('Error:', error));
}

function formatOutput(links) {
    let output = `[+] Total links: ${links.length}\n\n`;

    links.forEach(link => {
        output += `[+] Link: ${link}\n`;
    });

    return output;
}
