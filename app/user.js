function saveUser() {
    const user = document.getElementById('submit').value;
    localStorage.setItem('user', user);
    alert('User saved!');
}