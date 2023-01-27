export function Checker() {
    const usertype = localStorage.getItem('usertype');
    const id = localStorage.getItem('token');

    if (id) {
        if (usertype) {
            if (usertype === 'client') window.location.href = `/home/client?id=${id}`;
            if (usertype === 'worker') window.location.href = `/home/worker?id=${id}`;
        }
    } else {
        localStorage.removeItem('usertype');
        localStorage.removeItem('token');
    }
}

export function i() {
    return 7;
}
