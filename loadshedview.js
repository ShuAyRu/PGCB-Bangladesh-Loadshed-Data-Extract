(function() {
    const thead = document.querySelector('thead');
    if (thead) {
        const iterator = document.createNodeIterator(thead, NodeFilter.SHOW_COMMENT, null);
        const headerComments = [];
        let currentNode;
        while (currentNode = iterator.nextNode()) {
            headerComments.push(currentNode);
        }
        headerComments.forEach(comment => {
            let html = comment.nodeValue.trim();
            if (!html.startsWith('<')) html = '<' + html;
            if (!html.endsWith('>')) html = html + '>';
            
            const temp = document.createElement('template');
            temp.innerHTML = html;
            comment.parentNode.replaceChild(temp.content, comment);
        });
    }

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const genCell = row.cells[2];
        if (!genCell) return;
        const G = parseFloat(genCell.textContent.replace(/,/g, '')) || 0;

        const commentNodes = [];
        const childNodes = Array.from(row.childNodes);
        childNodes.forEach(node => {
            if (node.nodeType === Node.COMMENT_NODE) {
                commentNodes.push(node);
            }
        });

        let parsedCells = [];
        commentNodes.forEach(comment => {
            let html = comment.nodeValue.trim();
            if (!html.startsWith('<')) html = '<' + html;
            if (!html.endsWith('>')) html = html + '>';
            
            const temp = document.createElement('template');
            temp.innerHTML = html;
            const tds = temp.content.querySelectorAll('td');
            tds.forEach(td => parsedCells.push(td));
        });

        let L = 0;
        if (parsedCells.length > 0) {
            const lastCell = parsedCells[parsedCells.length - 1];
            L = parseFloat(lastCell.textContent.replace(/,/g, '')) || 0;
        }

        const Demand = G + L;

        const demandCell = document.createElement('td');
        demandCell.textContent = Demand;
        
        const loadshedCell = document.createElement('td');
        loadshedCell.textContent = L;

        commentNodes.forEach(comment => {
            comment.parentNode.removeChild(comment);
        });

        genCell.insertAdjacentElement('afterend', loadshedCell);
        genCell.insertAdjacentElement('afterend', demandCell);
    });

    console.log('Done.');
})();
