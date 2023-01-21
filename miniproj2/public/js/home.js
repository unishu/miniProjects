const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.username){
        location.href = '/login';
    } else{
        greeting.innerHTML = `hello ${sessionStorage.username}`;
    }
}

