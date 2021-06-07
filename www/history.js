function history(cp2 = "", cp3 = "") {

    var cx = div().id('app').class('app')
        .css('background-color', '#001C52')
        .css('text-align', 'center')
        .height('100vh')

    cx.child(
        h3().css('text-align', 'left').html('').color("#ffffff").padding('16px 24px').margin(0)
    );
    cx.child(
        el('span').text('Menu').color('#7E99CD').size('20px').margin('0 15px').click(function () {
            menu();
        })
    );
    cx.child(
        el('span').text('Tambah').color('#7E99CD').size('20px').margin('0 15px').click(async function () {
            var userlog = JSON.parse(localStorage.getItem('datalogin'))[0];
    
            var params = new URLSearchParams();
            params.append('query', `SELECT * FROM login WHERE id = '${userlog.id}' `);
            var ssk = await axios.post(globalThis.hostApi + 'json', params);

            if(ssk.data[0].sebagai != 'admin'){
                console.log('jalan');

                function alertDismissed() {
                }

                navigator.notification.alert(
                    'Maaf anda buka seorang admin!',  // message
                    alertDismissed,         // callback
                    'info',            // title
                    ''                  // buttonName
                );

            } else {
                formcreate();
            }
        })
    );
    cx.child(
        el('span').text('History').color('#FFFFFF').size('20px').margin('0 15px').click(function () {
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


    async function loadList(el) {

        var em = el.el;
        // make list
        var cd = div();

        var jauh = "#00A82F";
        var dekat = "#CE0000";

        var data = [];

        if (cp2 != "" || cp3 != "") {
            var params = new URLSearchParams();
            params.append('cp3', cp3);
            data = await axios.post(globalThis.hostApi + 'gets/' + cp2 + "/", params);
        } else {
            data = await axios.post(globalThis.hostApi + 'gets');
        }

        data = data.data;


        globalThis.temp = '';

        for (let xx = 0; xx < data.length; xx++) {



            var jtt = null;
            if(data[xx].top == '0'){
                jtt = data[xx].tgl_tempo;
            }else{
                var cair = tanggal(data[xx].tgl_cair).milisecond + (tanggal(data[xx].tgl_cair).oneDayMilisecond * Number(data[xx].top));

                jtt = tanggal(cair).normal;

            }


            var bgc = '#f10a22';

            if(data[xx].status == 'selesai'){
                bgc = jauh;
            }

            cd.child(
                div()
                    .css('margin-bottom', '20px')
                    .child(
                        btn().text(data[xx].nama_fintech.toUpperCase()).css({
                            width: 'calc(50% - 10px)',
                            backgroundColor: '#001C52',
                            color: '#ffffff',
                            marginRight: '5px',
                            borderRadius: '10px',
                            outline: 'none',
                            border: 'none',
                            fontSize: '2.8vw',
                            padding: '14px 10px',
                        })
                            .click(function () {
                                var ss = document.getElementById('data' + data[xx].id);
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
                        btn().text(data[xx].tgl_cair.toUpperCase()).css({
                            width: '25%',
                            backgroundColor: bgc,
                            color: '#ffffff',
                            borderRadius: '10px',
                            marginRight: '5px',
                            outline: 'none',
                            border: 'none',
                            fontSize: '2.8vw',
                            padding: '14px 10px',
                        })
                            .click(function () {
                                var ss = document.getElementById('data' + data[xx].id);
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
                        btn().text(jtt.toUpperCase()).css({
                            width: '25%',
                            backgroundColor: bgc,
                            color: '#ffffff',
                            borderRadius: '10px',
                            outline: 'none',
                            border: 'none',
                            fontSize: '2.8vw',
                            padding: '14px 10px',
                        })
                            .click(function () {
                                var ss = document.getElementById('data' + data[xx].id);
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
                    <table style="padding: 20px 0; width: 100%;">
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
                            <td>Tanggal Jatuh Tempo</td><td>:</td><td>${jtt}</td>
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
                            <td colspan="3" style="text-align: center;">
                                <button style="width: 80%; padding: 12px 10px; border-radius: 20px; outline: none; font-size: 14px; background-color: #f10a22; color: white; border: 1px solid rgb(0, 28, 82); margin: 18px 0px 18px 0.5%;" class="button-bayar" onclick="globalThis.deleteFuncH(${data[xx].id})" >Hapus Fintech</button>
                            </td>
                        </tr>
                    </table>
                `)
                )

        }

        em.appendChild(cd.get());

    }

    var cpx =  el('select')
    .css(selectCss)
    .css('width', '20%')
    .type('text')
    .id('date3')
    .margin('10px 0.5%')
    .hold('Periode Akhir');
    cpx.child(
        el("option").val('tgl_tempo').text('Jatuh Tempo')
    );
    cpx.child(
        el("option").val('tgl_cair').text('Tanggal Pencairan')
    );

    cx.child(
        div().css(cssContainer)
            .child(
                div()
                    .css('margin-top', '25px')
                    .child(
                        btn().text('Tambah').css(buttonL).click(async function () {
                            var userlog = JSON.parse(localStorage.getItem('datalogin'))[0];
    
            var params = new URLSearchParams();
            params.append('query', `SELECT * FROM login WHERE id = '${userlog.id}' `);
            var ssk = await axios.post(globalThis.hostApi + 'json', params);

            if(ssk.data[0].sebagai != 'admin'){
                console.log('jalan');

                function alertDismissed() {
                }

                navigator.notification.alert(
                    'Maaf anda buka seorang admin!',  // message
                    alertDismissed,         // callback
                    'info',            // title
                    ''                  // buttonName
                );

            } else {
                formcreate();
            }
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
                // .child(
                //     el('input')
                //         .css(selectCss)
                //         .css('width', '20%')
                //         .type('text')
                //         .id('date1')
                //         .margin('10px 0.5%')
                //         .hold('Periode Awal')
                //         .focus(function () {
                //             this.type = 'date';
                //         })
                //         .focusout(function () {
                //             this.type = 'text';
                //         })
                //         .touchend(function () {
                //             this.type = 'date';
                //         })
                // )
                // .child(
                //     el('input')
                //         .css(selectCss)
                //         .css('width', '20%')
                //         .type('text')
                //         .id('date2')
                //         .margin('10px 0.5%')
                //         .hold('Periode Akhir')
                //         .focus(function () {
                //             this.type = 'date';
                //         })
                //         .focusout(function () {
                //             this.type = 'text';
                //         })
                //         .touchend(function () {
                //             this.type = 'date';
                //         })
                // )
                // .child(
                //     cpx
                // )
                
                    .child(
                        el('button')
                        .css(buttonL)
                        .css('width', '80%')
                        .css('borderTopRightRadius', '20px')
                        .css('borderBottomRightRadius', '20px')
                        .margin('18px 0')
                        .type('button')
                        .text('Cari')
                        .css('margin-left', '0.5%')
                        .type('button')
                        .text('PDF')
                        .click(async function () {

                            globalThis.modal = 'menu';
                            
                            mn.css({
                                width: '100vw',
                                opacity: '1'
                            })

                        })
                    )
            )
            .child(
                div()
                .css({
                    width: '80%',
                    display: 'inline-block',
                    textAlign: 'center'
                })
                .child(
                    el('span')
                    .css('float', 'left')
                    .css('width', 'calc(50% - 10px)')
                    .child(
                        el('span')
                        .html('Nama <br> Fintech')
                    )
                )
                .child(
                    el('span')
                    .css('float', 'left')
                    .css('width', 'calc(25% - 5px')
                    .css('margin-left', '5px')
                    .css('margin-right', '5px')
                    .child(
                        el('span')
                        .html('Tanggal <br> Pencairan')
                    )
                )
                .child(
                    el('span')
                    .css('float', 'left')
                    .css('width', '25%')
                    .child(
                        el('span')
                        .html('Tanggal <br> Jatuh Tempo')
                    )
                )
            )
            .child(
                div().css(contentList).load(loadList)
            )
    );

    cx.child(
        mn
    )

    domp('app', cx)

}