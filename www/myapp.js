import { menu } from './menu.js';

export function login() {

    var lg = div();

    var styleInput = {
        display: 'block',
        borderRadius: '20px',
        padding: '12px 16px',
        fontSize: '20px',
        marginBottom: '18px',
        width: 'calc(100% - 26px)',
        outline: 'none',
        border: "none",
        backgroundColor: "#E3E3E3",
        color: "#6B6B6B",
        textAlign: "center",
    }

    var styleContainer = {
        width: 'calc(100vw - 50px)',
        textAlign: 'center',
        padding: '0 25px',
        backgroundImage: "url(bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "0 -100px",
    }

    var styleCard = {
        marginTop: '120px',
        marginBottom: '80px',
        boxShadow: "0.5px 1px 20px rgba(123,123,123, 0.2)",
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: 'white',
    }

    var styleBtnSubmit = {
        padding: '12px 16px',
        width: '100%',
        borderRadius: '20px',
        backgroundColor: '#001C52',
        marginBottom: '18px',
        outline: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
    }

    lg.child(
        h2().css('text-allign', 'center').text('Login Account').css({
            fontSize: '20px'
        })
    )

    lg.child(
        input().id('username').type('username').hold('Username').css(styleInput)
    )

    lg.child(
        input().id('password').type('password').hold('Password').css(styleInput)
    )

    // login app
    function prossesLogin() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username == 'administrator' && password == 'password') {
            localStorage.setItem('login', 1);
            menu();
        }
    }

    lg.child(
        btn().text('Submit').css(styleBtnSubmit).click(prossesLogin)
    )

    // click app

    function closeApp() {
        var a = document.getElementById('modalclose');
        a.style.width = '100vw';
        a.style.height = '100vh';
        a.style.opacity = '1';
        a.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }

    function closeModal() {
        var a = document.getElementById('modalclose');
        a.style.width = '0';
        a.style.height = '0';
        a.style.opacity = '0';
        a.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    lg.child(
        btn().text('Cancel').css(styleBtnSubmit).click(closeApp)
    )

    var dx = div()
        .css(styleContainer)
        .child(
            div()
                .css({
                    width: 'auto',
                    padding: '20px'
                })
                .child(
                    h1()
                        .css('margin', '60px 0')
                        .css('text-align', 'center')
                        .css('margin-bottom', '50px').css({
                            fontSize: '30px'
                        }).color('white').html('<span>Account<br>App.</span>')
                )
                .child(
                    div().css(styleCard).child(lg)
                )
        )

    var cx = div().id('app').class('app')

    cx.child(dx)

    cx.child(
        div()
            .class('modal').id('modalclose')
            .child(
                div()
                    .class('modal-content')
                    .child(
                        p().text('apakah anda yakin ingin keluar dari aplikasi ?')
                    )
                    .child(
                        btn().class('btn-ya').text('Ya')
                    )
                    .child(
                        btn().class('btn-tidak').text('Tidak').click(closeModal)
                    )
            )
    )

    cx.child(
        div().css({
            marginTop: '200px'
        })
    )

    domp('app', cx);
}


