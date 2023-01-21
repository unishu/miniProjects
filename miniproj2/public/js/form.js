
window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

const username = document.querySelector('.username') || null;
const fname = document.querySelector('.fname');
const lname = document.querySelector('.lname');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.formButton');

if (username == null) {

    submitBtn.addEventListener('click', () => {
        fetch('/login', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })
} else {
    submitBtn.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                fname: fname.value,
                lname: lname.value,
                username: username.value,
                password: password.value
            })
        })
    .then(res => res,json ())
    .then (data => {
        validateData(data);
        })
    })
}

const validateData = (data) => {
    if(!data.username){
        alertBox(data);
    } else {
        sessionStorage.username = data.username;
        sessionStorage.password = data.password;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);

    
}
