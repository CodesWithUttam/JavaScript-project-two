// * Refrences 

let title = document.getElementById('title');
let desc = document.getElementById('desc');
let saveBtn = document.getElementById('saveBtn');
let dataBox = document.getElementById('dataBox');
let arrayTitleData = [];
let arrayDescData = [];
let editTitle;
let editDesc;
let editTitleIndex;
let editDescIndex;
let titleIndex;
let descIndex;



const addData = () => {
    if (title.value == '' || desc.value == '') {
        alert('Plz write something...')
    }
    else if (saveBtn.innerHTML == 'Edit') {
        arrayTitleData = JSON.parse(localStorage.getItem('notesTitleData')) || [];
        arrayDescData = JSON.parse(localStorage.getItem('notesDescData')) || [];

        arrayTitleData[editTitleIndex] = title.value;
        arrayDescData[editDescIndex] = desc.value;

        localStorage.setItem('notesTitleData', JSON.stringify(arrayTitleData));
        localStorage.setItem('notesDescData', JSON.stringify(arrayDescData));

        editTitle.innerHTML = title.value;
        editDesc.innerHTML = desc.value;

        title.value = '';
        desc.value = '';
        saveBtn.innerHTML = 'Save';
    }

    else {
        arrayTitleData = JSON.parse(localStorage.getItem('notesTitleData')) || [];
        arrayDescData = JSON.parse(localStorage.getItem('notesDescData')) || [];

        arrayTitleData.push(title.value);
        arrayDescData.push(desc.value);

        localStorage.setItem('notesTitleData', JSON.stringify(arrayTitleData));
        localStorage.setItem('notesDescData', JSON.stringify(arrayDescData));

        // * created new elements
        let div = document.createElement('div');
        let h5 = document.createElement('h5');
        let p = document.createElement('p');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        // * set the attributes on these element
        div.classList.add('item-box');
        editBtn.classList.add('btn2', 'btn2-blue');
        deleteBtn.classList.add('btn2', 'btn2-red');

        dataBox.appendChild(div);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);

        h5.innerHTML = title.value;
        p.innerHTML = desc.value;
        editBtn.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';

        title.value = '';
        desc.value = '';
    }
}

const updateData = (event) => {
    if (event.target.innerHTML == 'Edit') {
        editTitle = event.target.previousSibling.previousSibling;
        editDesc = event.target.previousSibling;

        title.value = editTitle.innerHTML;
        desc.value = editDesc.innerHTML;

        title.focus();
        saveBtn.innerHTML = 'Edit';
        
        editTitleIndex = arrayTitleData.indexOf(editTitle.innerHTML);
        editDescIndex = arrayDescData.indexOf(editDesc.innerHTML);
    }
    else if (event.target.innerHTML == 'Delete') {
        titleIndex = arrayTitleData.indexOf(event.target.parentElement.children[0].innerHTML);
        descIndex = arrayDescData.indexOf(event.target.parentElement.children[1].innerHTML);

        arrayTitleData = JSON.parse(localStorage.getItem('notesTitleData')) || [];
        arrayDescData = JSON.parse(localStorage.getItem('notesDescData')) || [];

        arrayTitleData.splice(titleIndex, 1);
        arrayDescData.splice(descIndex, 1);

        localStorage.setItem('notesTitleData', JSON.stringify(arrayTitleData));
        localStorage.setItem('notesDescData', JSON.stringify(arrayDescData));

        event.target.parentElement.remove();
    }
}

const getData = () => {
    arrayTitleData = JSON.parse(localStorage.getItem('notesTitleData')) || [];
    arrayDescData = JSON.parse(localStorage.getItem('notesDescData')) || [];


    if (arrayTitleData != [] || arrayDescData != []) {
        for (let i = 0; i < arrayTitleData.length; i++) {

            // * created new elements
            let div = document.createElement('div');
            let h5 = document.createElement('h5');
            let p = document.createElement('p');
            let editBtn = document.createElement('button');
            let deleteBtn = document.createElement('button');

            // * set the attributes on these element
            div.classList.add('item-box');
            editBtn.classList.add('btn2', 'btn2-blue');
            deleteBtn.classList.add('btn2', 'btn2-red');

            dataBox.appendChild(div);
            div.appendChild(h5);
            div.appendChild(p);
            div.appendChild(editBtn);
            div.appendChild(deleteBtn);

            h5.innerHTML = arrayTitleData[i]
            p.innerHTML = arrayDescData[i]

            editBtn.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';
        }
    }
}


saveBtn.addEventListener('click', addData);
dataBox.addEventListener('click', updateData);
document.addEventListener('DOMContentLoaded', getData)