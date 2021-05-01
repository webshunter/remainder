import { formcreate } from './formCreate.js';
import { history } from './history.js';

export function menu() {

    var cx = div().id('app').class('app')
        .css('background-color', '#001C52')
        .css('text-align', 'center')
        .height('100vh')

    cx.child(
        h3().css('text-align', 'left').html('Account <br>App.').color("#ffffff").padding('16px 24px').margin(0)
    );
    cx.child(
        el('span').text('Menu').color('#FFFFFF').size('20px').margin('0 15px').click(function () {
            menu();
        })
    );
    cx.child(
        el('span').text('Login Tambah').color('#7E99CD').size('20px').margin('0 15px').click(function () {
            formcreate();
        })
    );
    cx.child(
        el('span').text('History').color('#7E99CD').size('20px').margin('0 15px').click(function () {
            history();
        })
    );

    var cssContainer = {
        backgroundColor: "white",
        height: "calc(100vh - 108px)",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        marginTop: "20px",
        overflowY: "hidden",
    }

    var buttonL = {
        width: '40vw',
        padding: '12px 10px',
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
        outline: 'none',
        fontSize: '4vw',
        backgroundColor: 'white',
        border: '1px solid #001C52'
    }

    var buttonR = {
        width: '40vw',
        padding: '12px 10px',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
        outline: 'none',
        fontSize: '4vw',
        color: 'white',
        border: '1px solid #001C52',
        backgroundColor: '#001C52',
        outline: 'none'
    }

    var selectCss = {
        marginTop: '20px',
        width: '80vw',
        padding: '12px 10px',
        backgroundColor: '#E3E3E3',
        borderRadius: '10px',
        outline: 'none',
        border: 'none',
    }

    var contentList = {
        display: 'inline-block',
        width: '80%',
        marginTop: '20px',
        height: "calc(100% - 180px)",
        overflowY: "scroll",
    }


    async function loadList(el) {

        var em = el.el;


        globalThis.updateFunc = function (id) {
            var params = new URLSearchParams();
            params.append('query', `UPDATE api_remainder SET status = 'selesai' WHERE id = "${id}" `);
            axios.post(globalThis.hostApi + 'save', params).then(function (res) {
                console.log('succcess');

                function alertDismissed() {
                    menu();
                }

                navigator.notification.alert(
                    'Data disimpan!',  // message
                    alertDismissed,         // callback
                    'Finish',            // title
                    'Done'                  // buttonName
                );

            })
        }

        globalThis.deleteFunc = function (id) {

            function onConfirm(buttonIndex) {
                if (buttonIndex == 1) {
                    var params = new URLSearchParams();
                    params.append('query', `DELETE FROM api_remainder WHERE id = "${id}" `);
                    axios.post(globalThis.hostApi + 'save', params).then(function (res) {
                        navigator.notification.alert('Fintech dihapus');
                        menu()
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



        // make list
        var cd = div();

        var jauh = "#00A82F";
        var dekat = "#CE0000";

        var data = await axios.post(globalThis.hostApi + 'get');

        data = data.data;

        console.log(data);

        globalThis.temp = '';

        for (let xx = 0; xx < data.length; xx++) {
            cd.child(
                div()
                    .css('margin-bottom', '20px')
                    .child(
                        btn().text(data[xx].nama_fintech).css({
                            width: 'calc(60% - 5px)',
                            backgroundColor: '#001C52',
                            color: '#ffffff',
                            marginRight: '5px',
                            borderRadius: '10px',
                            outline: 'none',
                            border: 'none',
                            fontSize: '4vw',
                            padding: '14px 10px',
                        })
                            .click(function () {
                                var ss = document.getElementById('data' + data[xx].id);
                                console.log(globalThis['data' + data[xx].id]);
                                if (globalThis['data' + data[xx].id] != true) {
                                    ss.style.height = 'auto';
                                    globalThis['data' + data[xx].id] = true;
                                } else {
                                    ss.style.height = '0px';
                                    globalThis['data' + data[xx].id] = false;
                                }
                            })
                    )
                    .child(
                        btn().text(data[xx].tgl_tempo).css({
                            width: '40%',
                            backgroundColor: jauh,
                            color: '#ffffff',
                            borderRadius: '10px',
                            outline: 'none',
                            border: 'none',
                            fontSize: '4vw',
                            padding: '14px 10px',
                        })
                            .click(function () {
                                var ss = document.getElementById('data' + data[xx].id);
                                console.log(globalThis['data' + data[xx].id]);
                                if (globalThis['data' + data[xx].id] != true) {
                                    ss.style.height = 'auto';
                                    globalThis['data' + data[xx].id] = true;
                                } else {
                                    ss.style.height = '0px';
                                    globalThis['data' + data[xx].id] = false;
                                }
                            })
                    )
            )
                .child(
                    div().id('data' + data[xx].id).css('text-align', 'left').css("height", '0').css('overflow', 'hidden').css('transition', '0.3s')
                        .html(`
                    <table style="padding: 20px 0;">
                        <tr>
                            <td>Fintect</td><td>:</td><td>${data[xx].nama_fintech}</td>
                        </tr>
                        <tr>
                            <td>Loan Id</td><td>:</td><td>${data[xx].loan_id}</td>
                        </tr>
                        <tr>
                            <td>Nominal</td><td>:</td><td>${data[xx].nominal}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Pencairan</td><td>:</td><td>${data[xx].tgl_cair}</td>
                        </tr>
                        <tr>
                            <td>Pencairan</td><td>:</td><td>${data[xx].pencairan}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Jatuh Tempo</td><td>:</td><td>${data[xx].tgl_tempo}</td>
                        </tr>
                        <tr>
                            <td>Bunga</td><td>:</td><td>${data[xx].bunga}</td>
                        </tr>
                        <tr>
                            <td>Total yang harus Dibayar</td><td>:</td><td>${data[xx].total_bayar}</td>
                        </tr>
                        <tr>
                            <td>Keterangan</td><td>:</td><td>${data[xx].keterangan}</td>
                        </tr>
                        <tr>
                            <td>Status</td><td>:</td><td>${data[xx].status}</td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <button class="button-bayar" onclick="globalThis.updateFunc(${data[xx].id})" >pembayaran selesai</button>
                                <button class="button-bayar" onclick="globalThis.deleteFunc(${data[xx].id})" >hapus fintech</button>
                            </td>
                        </tr>
                    </table>
                `)
                )

        }


        em.appendChild(cd.get());

    }

    cx.child(
        div().css(cssContainer)
            .child(
                div()
                    .css('margin-top', '25px')
                    .child(
                        btn().text('Tambah').css(buttonL).click(function () {
                            formcreate()
                        })
                    )
                    .child(
                        btn().text('History').css(buttonR).click(function () {
                            history()
                        })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .css(selectCss)
                            .css('width', '25%')
                            .type('date')
                            .id('date1')
                            .margin('10px 2.5%')
                    )
                    .child(
                        el('input')
                            .css(selectCss)
                            .css('width', '25%')
                            .type('date')
                            .id('date2')
                            .margin('10px 2.5%')
                    )
                    .child(
                        el('button')
                            .css(selectCss)
                            .css('width', '15%')
                            .type('button')
                            .text('PDF')
                            .css('margin-left', '2.5%')
                            .click(async function () {


                                var cek1 = document.getElementById('date1');
                                var cek2 = document.getElementById('date2');

                                if (cek1.value == "" && cek2.value == "") {

                                    function alertDismissed() {
                                    }

                                    navigator.notification.alert(
                                        'Untuk mencetak pdf silahkan pilih range periode terlebih dahulu !',  // message
                                        alertDismissed,         // callback
                                        'Warning',            // title
                                        'Done'                  // buttonName
                                    );

                                } else {

                                    var datas = await axios.post(globalThis.hostApi + 'get/' + cek1.value + '/' + cek2.value);

                                    globalThis.temp = '';

                                    datas.data.forEach(function (elmp, i) {
                                        globalThis.temp += `
                                            <tr>
                                                <td style="min-width: 80px; text-align: left;">${elmp.nama_fintech}</td>
                                                <td>${elmp.loan_id}</td>
                                                <td style="min-width: 95px; text-align: right;">${elmp.nominal}</td>
                                                <td style="max-width: 50px; text-align: center;">${elmp.tgl_cair}</td>
                                                <td style="min-width: 95px; text-align: right;">${elmp.pencairan}</td>
                                                <td style="max-width: 50px; text-align: center;">${elmp.tgl_tempo}</td>
                                                <td style="min-width: 95px; text-align: right;">${elmp.bunga}</td>
                                                <td style="min-width: 95px; text-align: right;">${elmp.total_bayar}</td>
                                                <td>${elmp.keterangan}</td>
                                            </tr>
                                    `;
                                    })


                                    let options = {
                                        documentSize: 'A4',
                                        landscape: "landscape",
                                        type: 'share'
                                    }


                                    pdf.fromData(`<html>
    
                                    <style>
                                        table{
                                            border-collapse: collapse;
                                        }
    
                                        th, td{
                                            border: 1px solid #333333;
                                            padding: 9px 10px;
                                            font-size: 8.5pt;
                                        }
                                    </style>
    
                                    <table>
                                    <thead>
                                    <tr>
                                    <th>Fintech</th>
                                    <th>Loan Id</th>
                                    <th>Nominal</th>
                                    <th>Tanggal Pencairan</th>
                                    <th>Pencairan</th>
                                    <th>Tanggal Jatuh Tempo</th>
                                    <th>Bunga</th>
                                    <th>Total yang harus dibayar</th>
                                    <th>Keterangan</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    ${globalThis.temp}
                                    </tbody>
                                    </table>
                                    </html>`, options)
                                        .then((stats) => console.log('status', stats))   // ok..., ok if it was able to handle the file to the OS.  
                                        .catch((err) => console.err(err))
                                }

                            })
                    )
            )
            .child(
                div().css(contentList).load(loadList)
            )
    );

    domp('app', cx)

}