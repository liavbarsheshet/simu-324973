/**
 * The main js library
 * @autor Liav Barsheshet
 * @date 02/09/2020
 */

const systemSettings = {
    clicked: [false, false, false, false],
};

const retrieve = (url, method, options, cb) => {
    cb = typeof cb == 'function' ? cb : () => { };
    method = method.toUpperCase();
    method = (method == 'GET' || method == 'POST' ? method : 'GET');
    url = typeof url == 'string' ? url : '/';
    const request = new XMLHttpRequest();
    request.timeout = 120000;
    request.responseType = typeof options.responseType == 'string' ? options.responseType : 'json';

    request.onabort = (e) => { cb(ui_getError(500), undefined); };
    request.onerror = (e) => { cb(ui_getError(500), undefined); };
    request.ontimeout = (e) => { cb(ui_getError(500), undefined); };
    request.onload = (e) => {
        if (request.readyState == 4 && request.status == 200) {
            if (request.responseType == 'json') {
                const obj = request.response || {};
                return cb(obj.err, obj.res);
            }
            else return cb(undefined, request.response);
        }
        return cb(ui_getError(500), undefined);
    };
    request.open(method, url);
    request.send(options);
};
const taskDelay = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, delay)
    });

};
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const htmlToElement = (html) => {
    const tmp = document.createElement('div');
    if (typeof html != 'string') {
        return tmp;
    }
    tmp.innerHTML = html;
    const child = tmp.firstChild;
    if (child instanceof Element) {
        tmp.remove();
        return child;
    }
    tmp.innerHTML = '';
    return tmp;
};
const appendFirst = (ref, elem) => {
    let child = ref.firstChild;
    if (child) {
        while (child != null) {
            if (child.getAttribute('nontrackable') != "true") {
                ref.insertBefore(elem, child);
                return;
            }
            child = child.nextSibling;
        }
        ref.appendChild(elem);
        return;
    }
    ref.appendChild(elem);
};
const appendAfter = (ref, specific, elem) => {
    const next = specific.nextSibling;
    if (next) {
        if (next.getAttribute('nontrackable') != "true") {
            ref.insertBefore(elem, next);
            return;
        }
        ref.appendChild(elem);
        return;
    }
    ref.appendChild(elem);
}
const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
        return;
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const tmpIndex = randomNumber(i, array.length);
        const tmpValue = array[tmpIndex];
        array[tmpIndex] = array[i];
        result.push(tmpValue);
    }
    return result;
}