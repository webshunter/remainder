async function formcreate(idedt = null) {

    var setEdit = null;
    // if
    if(idedt != null){

        // proses pengambilan data
        var params = new URLSearchParams();
        params.append('query', `SELECT * FROM api_remainder WHERE id = '${idedt}' `);
        var setEdit = await axios.post(globalThis.hostApi + 'json', params);
        setEdit = setEdit.data[0];

    }


    var wp = await countId();
    var str = "" + (wp.total + 1)
    var pad = "0000"
    var ans = pad.substring(0, pad.length - str.length) + str


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
        el('span').text('Tambah').color('#FFFFFF').size('20px').margin('0 15px').click(async function () {
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

            var vall2 = Obj.map(function (el) {
                return ' '+el+' = "' + e[el] + '"';
            }).join(",")


            // sql insert

            var sqlI = null;

            if(setEdit != null){
                sqlI = `UPDATE api_remainder SET ${vall2} WHERE id = '${setEdit.id}' `;
            }else{
                sqlI = ` INSERT INTO api_remainder (${Obj.join(",")}) VALUES (${vall}) `;
            }

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
                        btn().type('button').text('Tambah').css(buttonL).click(async function () {
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
                            .id('nama_fintech')
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
                            .id('loan_id')
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
                            .val(ans)
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('text')
                            .hold('Tanggal Pencairan')
                            .name('tgl_cair')
                            .id('tgl_cair')
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
                            .focus(function () {
                                this.type = 'date';
                            })
                            .focusout(function () {
                                this.type = 'text';
                            })
                            .touchend(function () {
                                this.type = 'date';
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Nominal')
                            .name('nominal')
                            .id('nominal')
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
                                this.value = formatRupiah(this.value, 'Rp. ');
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('text')
                            .hold('Tanggal Jatuh Tempo')
                            .name('tgl_tempo')
                            .id('tgl_tempo')
                            .css({
                                width: 'calc(50% - 30px)',
                                margin: '5px 5px',
                                padding: '12px 10px',
                                borderRadius: '4px',
                                outline: 'none',
                                border: 'none',
                                backgroundColor: '#E3E3E3',
                            })
                            .focus(function () {
                                this.type = 'date';
                            })
                            .focusout(function () {
                                this.type = 'text';
                            })
                            .touchend(function () {
                                this.type = 'date';
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Pencairan')
                            .name('pencairan')
                            .id('pencairan')
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
                                this.value = formatRupiah(this.value, 'Rp. ');
                            })
                    )
            )
            .child(
                div()
                    .child(
                        el('input')
                            .type('number')
                            .hold('TOP')
                            .name('top')
                            .id('top')
                            .css({
                                width: 'calc(100% - 30px)',
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
                            .hold('Bunga')
                            .name('bunga')
                            .id('bunga')
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
                                this.value = formatRupiah(this.value, 'Rp. ');
                            })
                    )
                    .child(
                        el('input')
                            .type('text')
                            .hold('Total yang harus dibayar')
                            .name('total_bayar')
                            .id('total_bayar')
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
                                this.value = formatRupiah(this.value, 'Rp. ');
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
                            .id('keterangan')
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

    if(setEdit != null){
        getElementById('nama_fintech').parent.value = setEdit.nama_fintech;
        getElementById('loan_id').parent.value = setEdit.loan_id;
        getElementById('tgl_cair').parent.value = setEdit.tgl_cair;
        getElementById('nominal').parent.value = setEdit.nominal;
        getElementById('tgl_tempo').parent.value = setEdit.tgl_tempo;
        getElementById('pencairan').parent.value = setEdit.pencairan;
        getElementById('top').parent.value = setEdit.top;
        getElementById('bunga').parent.value = setEdit.bunga;
        getElementById('total_bayar').parent.value = setEdit.total_bayar;
        getElementById('keterangan').parent.value = setEdit.keterangan;
    }

    domp('app', cx)

}

globalThis.editData = async function(id){
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
                formcreate(id);
            }
};