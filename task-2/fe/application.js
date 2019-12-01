function fillVariants(variants) {
    const container = document.getElementById('stat');
    const buttons = document.getElementById('buttons');
    if (container.innerHTML || buttons.innerHTML) {
        container.innerHTML = null;
        buttons.innerHTML =  null;
    }
    if (variants) {
        variants.forEach(({ id, name }) => {
            const item = document.createElement('div');
            const label = document.createElement('span');
            const value = document.createElement('span');
            const button = document.createElement('button');
            value.id = id;
            label.innerHTML = name + ': ';
            button.innerHTML = name;
            button.onclick = () => sendVote(id);
            item.appendChild(label);
            item.appendChild(value);
            container.appendChild(item);
            buttons.appendChild(button);
        });
    }
}

function fillStat(stat) {
    const items = document.querySelectorAll('#stat > div > span:last-child');
    if (items && items.length) {
        items.forEach( item => item.innerHTML = stat[item.id] || 0);
    }
}

async function sendVote(id) {
    const promise = await fetch(`./vote?id=${id}`);
    if (promise.ok) {
        const newStat = await getApi('./stat');
        fillStat(newStat);
    }
}

async function getApi(url, params) {
    let promise = await fetch(url, params);
    if (promise.ok) {
        return await promise.json();
    }
}

(async function() {
    let variants = await getApi('./variants');
    let stat = await getApi('./stat');
    fillVariants(variants);
    fillStat(stat);
})();
