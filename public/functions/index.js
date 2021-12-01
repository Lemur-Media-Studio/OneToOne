const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'mail.one-oneconsulting.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '_mainaccount@one-oneconsulting.com',
        pass: '1g!n9HP]Ur07Hd'
    }
});

exports.newEmail = functions.firestore.document('/users/{documentId}')
    .onCreate((snap, context)=>{
        const doc = snap.data();
        return sendEmail(email = doc.email);

    });


function sendEmail( to, body){
    const mailOptions = {
        from: '_mainaccount@one-oneconsulting.com',
        to: email,
        subject: "bienvenido",
        html: `<div> <table style="max-width: 600px; padding: 10px; margin: 0 auto;">
        <!-- tr para armar una fila -->
        <tr>
            <!-- td define una celda -->
            <td style="text-align: left; padding: 0;">
                <a href="https://one-oneconsulting.com">
                    <img src="https://firebasestorage.googleapis.com/v0/b/inicio-logueo-one.appspot.com/o/logo.png?alt=media&token=b6487431-38fd-4060-98d2-6553019527b7" alt="logo one to one" style="width: 35%;">
                    <!-- https://i.ibb.co/d2s7jZZ/logos-coderhouse-01.png -->
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 0;">

                <img src="https://firebasestorage.googleapis.com/v0/b/inicio-logueo-one.appspot.com/o/banner.newsletter.png?alt=media&token=102bbd55-7e62-4e0c-8d89-9dd671e19fc1" alt="banner one to one" width="100%">
                <!-- https://i.ibb.co/vXJgCcs/default.jpg -->
            </td>
        </tr>
        <tr>
            <td style="background-color: rgb(201, 207, 211); border: solid 2px #3F545B;">
                <div style="color:grey;margin: 4% 10% 2%;font-family: sans-serif;">
                    <h1 style="color: #002A3C;text-align: center; margin: 2px;">¡Ya sos parte de la comunidad de OnetoOne!</h1>
                    <p style="margin: 2px;text-align: justify; font-size: 16px;">
                        Gracias por registrarte en nuestra plataforma. Ahora podrás recibir novedades
                        y descuentos exclusivos, además de la posibilidad de seguir tus compras online,
                        notificaciones de tus envíos y navegar nuestra tienda online.
                    </p>
                    <p style="font-size: 14px;text-align: center;margin: 10px 0;">
                        ¡Gracias por confiar en nuestro equipo!
                    </p>
                </div>
                <!-- redes -->
                <div style="width: 100%; margin: 20px 0;text-align: center;">
                    <a href="https://www.facebook.com/Onetoone.consultingok" style="text-decoration: none;">
                        <img src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-5-1.png" alt="logo de facebook"
                            style="width: 25px;border: solid 3px #002A3C;border-radius: 40px;margin: 15px;">
                    </a>
                    <a href="https://www.twitter.com/onetooneok" style="text-decoration: none;">
                        <img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png" alt="logo de twitter"
                            style="width: 25px;border-radius: 40px;border: solid 3px #002A3C;margin: 15px;">
                    </a>
                    <a href="https://www.linkedin.com/company/onetooneok" style="text-decoration: none;">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="logo de linkedin"
                            style="width: 25px;border-radius: 40px;border: solid 3px #002A3C;margin: 15px;">
                    </a>
                    <a href="https://www.instagram.com/onetooneok" style="text-decoration: none;">
                        <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" alt="logo de instagram"
                            style="width: 25px;border-radius: 40px;border: solid 3px #002A3C;margin: 15px;">
                    </a>
                </div>
                <!-- boton -->
                <div style="text-align: center;width: 100%;">
                    <a href="https://one-oneconsulting.com"
                        style="text-decoration: none;border-radius: 5px; padding: 8px 15px;background-color: #002A3C; color: white;">
                        Ir a la página</a>
                </div>

                <p style="color: grey; font-size: 15px; text-align: center;margin: 20px 0 0;">One to one | trade consulting®</p>
            </td>
        </tr>
    </table></div>`
    };

    return transporter.sendMail( mailOptions , (error,data) => {
        if( error ){
            console.log(error);
            return;
        }

        console.log("sent");
        return;
    });
}


