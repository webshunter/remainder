var mn = div();

globalThis.mn = mn;

mn.css({
    position: 'fixed',
    display: 'flex',
    zIndex: '999',
    width: '0',
    opacity: '0',
    height: '100vh',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: '0.3s'
})
var selectCss = {
    marginTop: '20px',
    width: '80vw',
    padding: '12px 10px',
    backgroundColor: '#E3E3E3',
    borderRadius: '10px',
    outline: 'none',
    border: 'none',
}

mn.child(
    div()
    .css({
        width:'calc(80vw - 40px)',
        minHeight:'auto',
        backgroundColor:'#fff',
        borderRadius :'20px',
        padding :'20px',
        boxShadow :'0 0 20px rgba(125,125,125, 0.3)',
    })
)

async function loadList(a = {}){
    globalThis.loadlist = a;
    var b = a.el;
    var data = await axios.post(globalThis.hostApi + 'fintech');
    data = data.data;

    globalThis.cekFF = data.map(function(el){
        return el.nama_fintech;
    }).join('');

    b.innerHTML = '';

    b.appendChild(
        el('option').val('').text('All Fintech').get()
    )

    for (let x = 0; x < data.length; x++) {
        b.appendChild(
            el('option').val(data[x].nama_fintech).text(data[x].nama_fintech).get()
        );
    }

}

async function loadListC(a = {}){
    var b = this;
    var data = await axios.post(globalThis.hostApi + 'fintech');
    data = data.data;

    var smk = data.map(function(el){
        return el.nama_fintech;
    }).join('');

    if(globalThis.cekFF != smk){
        
        globalThis.cekFF = smk;

        b.innerHTML = '';
    
        b.appendChild(
            el('option').val('').text('All Fintech').get()
        )
        for (let x = 0; x < data.length; x++) {
            b.appendChild(
                el('option').val(data[x].nama_fintech).text(data[x].nama_fintech).get()
            );
        }

    }


}

var listm = el('select')
        .css(selectCss)
        .css('width', '85%')
        .margin('10px 0.5%')
        .id('pencarian')
        .load(loadList)
        .click(loadListC)

childes(mn, [0]).child(
    listm
)

// childes(mn, [0]).child(
//     el('input')
//         .css(selectCss)
//         .css('width', '80%')
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

// childes(mn, [0]).child(
//     el('input')
//         .css(selectCss)
//         .css('width', '80%')
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

var cpx =  el('select')
    .css(selectCss)
    .css('width', '85%')
    .margin('10px 0.5%')
    .type('text')
    .id('date3')
    .hold('Periode Akhir');
    cpx.child(
        el("option").val('').text('Lunas/ Belum Lunas')
    );
    cpx.child(
        el("option").val('selesai').text('Lunas')
    );
    cpx.child(
        el("option").val('belum').text('Belum Lunas')
    );

childes(mn, [0]).child(
    cpx
)

childes(mn, [0]).child(
    btn()
        .css(selectCss)
        .css('width', '85%')
        .type('button')
        .id('date2')
        .margin('10px 0.5%')
        .text('Cari')
        .click(function(){

            var pencarian = document.getElementById('pencarian').value;
            // var date1 = document.getElementById('date1').value;
            // var date2 = document.getElementById('date2').value;
            var date3 = document.getElementById('date3').value;

            // if (date1 == "") {
            //     date1 = null;
            // }
            
            // if (date2 == "") {
            //     date2 = null;
            // }

            mn.css({
                width: '0',
                opacity: '0',
            })
            
            setTimeout(function(){
                history(date3, pencarian);
            }, 300);
        })
)

childes(mn, [0]).child(
    btn()
        .css(selectCss)
        .css('width', '85%')
        .type('button')
        .margin('10px 0.5%')
        .text('Cetak PDF')
        .click(async function(){

            var pencarian = document.getElementById('pencarian').value;
            // var date1 = document.getElementById('date1').value;
            // var date2 = document.getElementById('date2').value;
            var date3 = document.getElementById('date3').value;

            // if (date1 == "") {
            //     date1 = null;
            // }
            
            // if (date2 == "") {
            //     date2 = null;
            // }

            mn.css({
                width: '0',
                opacity: '0',
            })
            
            setTimeout(async function(){

                    var params = new URLSearchParams();
                    params.append('cp3', pencarian);
                    datas = await axios.post(globalThis.hostApi + 'gets/' +  date3 + "/", params);

                    globalThis.temp = '';

                    datas.data.forEach(function (elmp, i) {

                        var jtt = null;
                        if(elmp.top == '0'){
                            jtt = elmp.tgl_tempo;
                        }else{
                            var cair = tanggal(elmp.tgl_cair).milisecond + (tanggal(elmp.tgl_cair).oneDayMilisecond * Number(elmp.top));

                            jtt = tanggal(cair).normal;

                        }

                        if(elmp.status == 'selesai'){
                            globalThis.temp += `
                                <tr style="background-color: #00d4ff;">
                                    <td style="min-width: 80px; text-align: left;">${elmp.nama_fintech}</td>
                                    <td>${elmp.loan_id}</td>
                                    <td style="min-width: 105px; text-align: right;">${elmp.nominal}</td>
                                    <td style="max-width: 50px; text-align: center;">${elmp.tgl_cair}</td>
                                    <td style="min-width: 105px; text-align: right;">${elmp.pencairan}</td>
                                    <td style="max-width: 50px; text-align: center;">${jtt}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.bunga}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.total_bayar}</td>
                                    <td>${elmp.keterangan}</td>
                                    <td style="min-width: 65px; text-align: right;">SELESAI</td>
                                </tr>
                        `;
                    }else{
                            globalThis.temp += `
                                <tr>
                                    <td style="min-width: 80px; text-align: left;">${elmp.nama_fintech}</td>
                                    <td>${elmp.loan_id}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.nominal}</td>
                                    <td style="max-width: 50px; text-align: center;">${elmp.tgl_cair}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.pencairan}</td>
                                    <td style="max-width: 50px; text-align: center;">${jtt}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.bunga}</td>
                                    <td style="min-width: 95px; text-align: right;">${elmp.total_bayar}</td>
                                    <td>${elmp.keterangan}</td>
                                    <td style="min-width: 95px; text-align: right;">BELUM SELESAI</td>
                                </tr>
                        `;
                        }
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
                    <tr style="background-color: #a50af1; color: white;">
                    <th>Fintech</th>
                    <th>Loan Id</th>
                    <th>Nominal</th>
                    <th>Tanggal Pencairan</th>
                    <th>Pencairan</th>
                    <th>Tanggal Jatuh Tempo</th>
                    <th>Bunga</th>
                    <th>Total yang harus dibayar</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${globalThis.temp}
                    </tbody>
                    </table>
                    </html>`, options)
                        .then((stats) => console.log('status', stats))   // ok..., ok if it was able to handle the file to the OS.  
                        .catch((err) => console.err(err))



            }, 300);

            // setTimeout( async function(){
                
            //     var cek1 = document.getElementById('date1');
            //     var cek2 = document.getElementById('date2');
            //     var cek3 = document.getElementById('date3');

            

            // }, 300);
        })
)

childes(mn, [0]).child(
    btn()
        .css(selectCss)
        .css('width', '85%')
        .type('button')
        .margin('10px 0.5%')
        .text('Tutup')
        .click(function(){
            mn.css({
                width: '0',
                opacity: '0',
            })
        })
)