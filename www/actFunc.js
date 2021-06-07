import { history } from './history.js';

export function deleteFunc(id) {

    function onConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            var params = new URLSearchParams();
            params.append('query', `DELETE FROM api_remainder WHERE id = "${id}" `);
            axios.post(globalThis.hostApi + 'save', params).then(function (res) {
                navigator.notification.alert('Fintech dihapus');
                history();
            })

        }
    }

    navigator.notification.confirm(
        'Anda yakin ingin menghapus fintech!', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Warning',           // title
        ['Hapus', 'Exit']     // buttonLabels
    );

}


export function updateFunc(id) {
    var params = new URLSearchParams();
    params.append('query', `UPDATE api_remainder SET status = 'selesai' WHERE id = "${id}" `);
    axios.post(globalThis.hostApi + 'save', params).then(function (res) {
        console.log('succcess');

        function alertDismissed() {
            history();
        }

        navigator.notification.alert(
            'Data disimpan!',  // message
            alertDismissed,         // callback
            'Finish',            // title
            'Done'                  // buttonName
        );

    })
}

export async function countId() {
    var data = await axios.get(globalThis.hostApi + 'count');
    return data.data;
}