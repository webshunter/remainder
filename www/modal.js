var mm = div();

globalThis.mm = mm;

mm.css({
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

mm.child(
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

childes(mm, [0]).child(
    el('input')
        .css(selectCss)
        .css('width', '80%')
        .type('text')
        .id('pencarian')
        .margin('10px 0.5%')
        .hold('Cari')
        .focusout(function () {
            this.type = 'text';
        })
)

childes(mm, [0]).child(
    el('input')
        .css(selectCss)
        .css('width', '80%')
        .type('text')
        .id('date1')
        .margin('10px 0.5%')
        .hold('Periode Awal')
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

childes(mm, [0]).child(
    el('input')
        .css(selectCss)
        .css('width', '80%')
        .type('text')
        .id('date2')
        .margin('10px 0.5%')
        .hold('Periode Akhir')
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

var cpx =  el('select')
    .css(selectCss)
    .css('width', '85%')
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

childes(mm, [0]).child(
    cpx
)

childes(mm, [0]).child(
    btn()
        .css(selectCss)
        .css('width', '85%')
        .type('button')
        .id('date2')
        .margin('10px 0.5%')
        .text('Cari')
        .click(function(){

            var pencarian = document.getElementById('pencarian').value;
            var date1 = document.getElementById('date1').value;
            var date2 = document.getElementById('date2').value;
            var date3 = document.getElementById('date3').value;

            if (date1 == "") {
                date1 = null;
            }
            
            if (date2 == "") {
                date2 = null;
            }

            mm.css({
                width: '0',
                opacity: '0',
            })
            
            setTimeout(function(){
                menu(date1,date2,date3, pencarian);
            }, 300);
        })
)

childes(mm, [0]).child(
    btn()
        .css(selectCss)
        .css('width', '85%')
        .type('button')
        .margin('10px 0.5%')
        .text('Tutup')
        .click(function(){
            mm.css({
                width: '0',
                opacity: '0',
            })
        })
)