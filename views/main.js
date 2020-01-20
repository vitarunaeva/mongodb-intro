'use strict';

const switches = document.querySelectorAll('input[type=radio]');

const forms = document.querySelectorAll('.users-form__slide');

const createForm = document.querySelector('.users-form__slide--create');

const updateButton = document.querySelector('#update-list');

const updateForm = document.querySelector('.users-form__slide--update');

const findUserForm = document.querySelector('.users-form__slide--find');

const deleteUserForm = document.querySelector('.users-form__slide--delete');

const deleteActiveClass = function () {
    forms.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        }
    })
}

const onInputRadioClick = function (i) {
    deleteActiveClass();
    forms[i].classList.add('active');
};

switches.forEach((item, i) => {
    item.addEventListener('input', () => onInputRadioClick(i));
});

function createUser(url = 'http://localhost:3000/users', data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json());
}

function updatePassword(url = 'http://localhost:3000/users', data) {
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json());
}

function deleteUser(url = 'http://localhost:3000/users', data) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json());
}

createForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.querySelector('#console').value = '';
    const login = createForm.querySelector('#login').value;
    const password = createForm.querySelector('#password').value;

    const data = {
        login,
        password
    };

    createUser('http://localhost:3000/users', data)
        .then(res => {
            document.querySelector('#console').value = JSON.stringify(res);
        })
        .catch(err => document.querySelector('#console').value = err);
});

updateForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.querySelector('#console').value = '';
    const login = updateForm.querySelector('#login').value;
    const password = updateForm.querySelector('#password').value;
    const newpassword = updateForm.querySelector('#newpassword').value;

    const data = {
        login,
        password,
        newpassword
    };

    updatePassword('http://localhost:3000/users', data)
        .then(res => {
            console.log(res);
            document.querySelector('#console').value = JSON.stringify(res);
        })
        .catch(err => document.querySelector('#console').value = err);
});

findUserForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const login = findUserForm.querySelector('#login').value;
    const url = 'http://localhost:3000/users/?login=' + login;
    fetch(url)
        .then(response => response.json())
        .then(res => {
            const {login, password} = res;
            const user = {login, password};
            document.querySelector('#console').value = JSON.stringify(user);
        });
});

deleteUserForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const login = deleteUserForm.querySelector('#login').value;
    const password = deleteUserForm.querySelector('#password').value;

    const data = {
        login,
        password
    };

    deleteUser('http://localhost:3000/users', data)
        .then(res => document.querySelector('#console').value = JSON.stringify(res))
        .catch(err => document.querySelector('#console').value = err);



});

updateButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('#list').value = '';
    fetch('http://localhost:3000/users/list')
        .then(response => response.json())
        .then(res => {
            res
                .map(it => {
                    const {login, password} = it;
                    return {login, password};
                })
                .forEach(it => {
                    document.querySelector('#list').value += JSON.stringify(it) + '\n';
                })
        });
});
