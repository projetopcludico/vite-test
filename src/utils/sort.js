function sortObjects(quantidade, arrayObj){
    if(quantidade > arrayObj.length){
        throw new Error('Quantidade não pode ser maior do que o tamanho do array');
    }

    const selected = [];
    while(selected.length < quantidade) {
        const randomIndex = Math.floor(Math.random() * arrayObj.length);
        const drawn = arrayObj[randomIndex];

        if(selected.length == (quantidade -1)){
            if(selected.find(obj => obj.id == drawn.id)){
                continue;
            }
        }        
        selected.push(drawn)
    }

    return selected;
}

export default sortObjects;