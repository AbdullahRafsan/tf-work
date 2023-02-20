export function Checker() {
    const usertype = localStorage.getItem('usertype');
    const id = localStorage.getItem('token');

    if (id) {
        const idObj = JSON.parse(id);
        if (usertype) {
            if (usertype === 'client') window.location.href = `/home/client?id=${idObj.email}`;
            if (usertype === 'worker') window.location.href = `/home/worker?id=${idObj.email}`;
        }
    } else {
        localStorage.removeItem('usertype');
        localStorage.removeItem('token');
    }
}

export function i() {
    return 7;
}
