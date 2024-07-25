import { Injectable } from '@angular/core';

@Injectable()
export class FormDataService {
    constructor() { }
    formToURI(method: string, url: string, ...data: any[]) {
        const req = this.checkData(data);
        const form = document.createElement('form');
        form.method = method;
        form.action = url;

        Object.keys(req).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = req[key];
            form.appendChild(input);
        })

        document.body.appendChild(form);
        form.submit();
    }

    private checkData(_data: any[]) {
        const data = _data[0];
        if (_data.length == 1) return data;

        let box = {};
        Object.keys(data).forEach(keys => box[keys] = _data[1][data[keys]]);
        return box;
    }
}
