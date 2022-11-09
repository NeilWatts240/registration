'use strict';

let userName = document.querySelector('#username'),
    regBtn = document.querySelector('#registerUser'),
    logBtn = document.querySelector('#login'),
    list = document.querySelector('#list');

let regData = {
    users: [],

    render: function () {
        list.textContent = '';

        regData.users.forEach(function (item, index) {
            const li = document.createElement('li');
            li.innerHTML = '<span class="text">' + 'Имя: ' + item.firstName + ', Фамилия: ' + item.lastName + ',    Зарегестрирован: ' + item.regDate + '</span><button class="delete">Удалить</button>';
            list.append(li);

            let deleteBtn = li.querySelector('.delete');
            deleteBtn.addEventListener('click', function () {
                delete regData.users[index];
                regData.render();
            })
        })
        let usersFiltered = regData.users.filter(function (item) {
            return item !== null
        });
        regData.users = usersFiltered;
        localStorage.setItem('users', JSON.stringify(regData.users));
    },
    addNewUser: function () {
        let name = prompt('Введите через пробел Имя и Фамилию пользователя'),
            login = prompt('Введите Логин'),
            password = prompt('Введите пароль');

        let newUser = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            login: login,
            password: password,
            regDate: new Date
        }
        regData.users.push(newUser);
        regData.render();
    },
    loginUser: function () {
        regData.users.forEach(item => {
            if (prompt('Введите логин') === item.login) {
                if (prompt('Введите пароль') === item.password) {
                    userName.textContent = item.firstName;
                } else {
                    alert('Пароль неверный!');
                }
            } else {
                alert('Логин не найден');
            };
        });
    },
};

if (localStorage.getItem('users')) {
    regData.users = JSON.parse(localStorage.getItem('users'));
    regData.render();
}

regBtn.addEventListener('click', regData.addNewUser);
logBtn.addEventListener('click', regData.loginUser);