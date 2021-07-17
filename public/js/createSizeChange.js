const selector = document.querySelector('#type');
const toChange = document.querySelector('#size');
let check = false;

selector.addEventListener('change', (e) => {
    if (e.target.value === 'Shoes') {
        changeS();
    } else if (e.target.value !== 'Shoes') {
        changeNo();
    } else {

    }
})

function changeS() {
    const s = document.querySelector('#size');
    s.remove();
    const inp = document.createElement('input');
    inp.type = 'number';
    inp.name = 'size';
    inp.id = 'numSize';
    inp.step = '0.5';
    const header = document.querySelector('#sizeOptions');
    header.append(inp);
    check = true;
}

function changeNo() {
    const inp = document.querySelector('#numSize');
    inp.remove();
    const header = document.querySelector('#sizeOptions');
    const select = document.createElement('select');
    select.name = 'size';
    select.id = 'size';
    const children = ['--SELECT A SIZE--', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    for (let i of children) {
        let child = document.createElement('option');
        child.value = i;
        child.innerText = i;
        select.append(child);
    }
    header.append(select);
    check = false;
}

try {
    const closeOut = document.querySelector('.closeThis');
    const errorMsg = document.querySelector('#errorBar')
    closeOut.addEventListener('click', () => {
        errorMsg.style.opacity = 0;
        setTimeout(() => {
            errorMsg.style.zIndex = -100;

        }, 250)
    })
} catch (e) {

}
