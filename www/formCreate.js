import { formatRupiah } from './formatRupiah.js';
import { menu } from './menu.js';
import { history } from './history.js';

export function formcreate() {

    var cx = div().id('app').class('app')
        .css('background-color', '#001C52')
        .css('text-align', 'center')
        .height('100vh')

    cx.child(
        h3().css('text-align', 'left').html('Account <br>App.').color("#ffffff").padding('16px 24px').margin(0)
    );
    cx.child(
        el('span').text('Menu').color('#7E99CD').size('20px').margin('0 15px').click(function () {
            menu();
        })
    );
    cx.child(
        el('span').text('Login Tambah').color('#FFFFFF').size('20px').margin('0 15px').click(function () {
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
        padding: '0 20px',
        overflowY: "hidden",
    }

    var buttonL = {
        width: '40vw',
        padding: '12px 10px',
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
        outline: 'none',
        fontSize: '14px',
        backgroundColor: 'white',
        border: '1px solid #001C52'
    }

    var buttonR = {
        width: '40vw',
        padding: '12px 10px',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
        outline: 'none',
        fontSize: '14px',
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

    cx.child(
        el('form').css(cssContainer).submit(function (e) {

            console.log(e);

            e.created_at = tanggal().normal;
            e.updated_at = tanggal().normal;

            var Obj = Object.keys(e);

            var vall = Obj.map(function (el) {
                return '"' + e[el] + '"';
            }).join(",")


            // sql insert


            var sqlI = ` INSERT INTO api_remainder (${Obj.join(",")}) VALUES (${vall}) `;


            var params = new URLSearchParams();
            params.append('query', sqlI);
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

        })
            .child(
                div()
                    .css('margin-top', '25px')
                    .child(
                        btn().type('button').text('Tambah').css(buttonL).click(function () {
                            formcreate();
                        })
                    )
                    .child(
                        btn().type('button').text('History').css(buttonR).click(function () {
                            history()
                        })
                    )
            )
            .child(
                div().css('margin-top', '20px')
                    .child(
                        el('input')
                            .type('text')
                            .hold('Nama Fintech')
                            .name('nama_fintech')
                            .required()
                            .css({
                                float: 'left',
                                width: 'calc(70% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('loan Id')
                            .name('loan_id')
                            .required()
                            .css({
                                width: 'calc(30% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('date')
                            .hold('Tanggal Pencairan')
                            .name('tgl_cair')
                            .required()
                            .css({
                                width: 'calc(50% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Nominal')
                            .name('nominal')
                            .required()
                            .css({
                                width: 'calc(50% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                            .keyup(function () {
                                this.value = formatRupiah(this.value, '');
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('date')
                            .hold('Tanggal Jatuh Tempo')
                            .name('tgl_tempo')
                            .required()
                            .css({
                                width: 'calc(50% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Pencairan')
                            .name('pencairan')
                            .required()
                            .css({
                                width: 'calc(50% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                            .keyup(function () {
                                this.value = formatRupiah(this.value, '');
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('text')
                            .hold('Bunga')
                            .name('bunga')
                            .required()
                            .css({
                                width: 'calc(100% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                            .keyup(function () {
                                this.value = formatRupiah(this.value, '');
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Total yang harus dibayar')
                            .name('total_bayar')
                            .required()
                            .css({
                                width: 'calc(100% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                            .keyup(function () {
                                this.value = formatRupiah(this.value, '');
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('textarea')
                            .width('100%')
                            .type('text')
                            .hold('Keterangan')
                            .name('keterangan')
                            .required()
                            .css({
                                width: 'calc(100% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                height: '80px',
                                backgroundColor: '#E3E3E3',
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('button')
                            .type('submit')
                            .text('Submit')
                            .css({
                                float: 'right',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                margin: '5px',
                                outline: 'none',
                                fontSize: '14px',
                                color: 'white',
                                border: '1px solid #001C52',
                                backgroundColor: '#001C52',
                                outline: 'none'
                            })
                    )
            )
    );

    domp('app', cx)

}