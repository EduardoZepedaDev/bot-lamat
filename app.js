const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MongoAdapter = require("@bot-whatsapp/database/mongo");

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = "mongodb://localhost/ti-tools-back";
const MONGO_DB_NAME = "db_bot";

// ----------------------------------------------------------------FLUJO COMPLETO CORREO----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// FLUJO HIJO Error 550 Message Too Big
const flowErrorBig = addKeyword(["5", "cinco"])
  .addAnswer(
    'El error 550 "Message Too Big" generalmente indica que un correo electrónico que estás intentando enviar excede los límites de tamaño establecidos por el servidor de correo electrónico del destinatario. Este límite incluye no solo el texto del correo electrónico, sino también los archivos adjuntos y cualquier contenido incrustado.'
  )
  .addAnswer([
    "*Soluciones:*",
    "*1*.-Comprimir los archivos en .zip o .rar",
    "*2*.-Subir los archivos al Nextcloud y compartir un enlace con los archivos",
    "*3*.-Mandar los archivos por partes",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO Firma del correo
const flowFirma = addKeyword(["4", "cuarto", "firma"])
  .addAnswer(
    "Si no cuentas con tu firma, entra al portal de *Tickets* en el siguiente enlace: https://helpdesk.grupolamat.com, para crear la solicitud guiate de este *Flyer*"
  )
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO Usuario o Contraseña Incorrecta
const flowUserPassCorreo = addKeyword(["3", "tres", "incorrecto"])
  .addAnswer("Comunicate con el equipo de TI:")
  .addAnswer(
    "Juan Miguel Aguirre Paredes -- *Auxiliar de TI* -- 📞993 190 8780",
    {
      media: "https://intn24.lalr.co/old/Up.jpg",
    }
  )
  .addAnswer("Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞993 243 7599", {
    media:
      "https://static.wikia.nocookie.net/disney/images/e/e2/Don_Risitas.png/revision/latest?cb=20130423093527&path-prefix=es",
  })
  .addAnswer("Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223", {
    media:
      "https://www.rollingstone.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-15-at-11.24.37-AM.jpg?w=910&h=511&crop=1",
  })
  .addAnswer(
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
    {
      media:
        "https://img.wattpad.com/85fdf423872032e520fa1319c98c40aab069f8a6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f41616962797a5f553372466272413d3d2d3836342e313761633162366163643335356130313135313134313232353839342e6a7067?s=fit&w=720&h=720",
    }
  )
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO ¿Cual es el Link de la plataforma de correo?
const flowLinkCorreo = addKeyword(["2", "link", "plataforma"])
  .addAnswer(" *CORREO* https://grupolamat.com.mx", {
    media:
      "https://images.vexels.com/media/users/3/136340/isolated/preview/74ac661d8216442ae469efb39c9584dc-icono-de-mensaje-de-correo.png",
  })
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO No me deja abrir el Outlook'
const flowOutlook = addKeyword("1", "outlook", "uno")
  .addAnswer(
    "*Primer Paso* Abrir el administrador de tareas con un clic derecho en la barra de tareas"
  )
  .addAnswer(
    "*Segundo paso* En la pestaña de procesos buscar la tarea con nombre Microsoft Outlook",
    {
      media:
        "https://www.ionos.mx/digitalguide/fileadmin/DigitalGuide/Screenshots_2023/windows-task-manager-end-outlook.png",
    }
  )
  .addAnswer(
    "*Tercer paso* Da clic derecho en ese proceso y damos clic en *Finalizar la tarea* "
  )
  .addAnswer("*Cuarto paso* Vuelva a abrir la aplicacion Outlook")
  .addAnswer(
    "Si el error persiste, favor de comunicarte con TI en https://helpdesk.grupolamat.com o en el menu principal en el apartado de *Contactos de TI*",
    {
      media:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQjDyyRr5xcRxl0TCoFG85hmI2jyIJreTng&s",
    }
  )
  .addAnswer("Para regresar al menu principal, escribe *Menu*");

// FLUJO PRINCIPAL DE MENU DE CORREO
const flowCorreo = addKeyword(["3", "tres", "regresar"]).addAnswer(
  [
    "¿Que problema tienes?",
    "*1*.-No me deja abrir el Outlook",
    "*2*.-¿Cual es el Link de la plataforma de correo?",
    "*3*.-Usuario o Contraseña Incorrecta",
    "*4*.-Firma del correo",
    "*5*.-Error 550 Message Too Big",
    "*6*.-Error 550 Recipient correo has exceeded mailbox limit ",
    "*7*.-Error Your Box is Full",
    "Para regresar al menu principal, escribe *Menu*",
  ],
  null,
  null,
  [flowOutlook, flowLinkCorreo, flowUserPassCorreo, flowFirma, flowErrorBig]
);

// ----------------------------------------------------------------FLUJO ENLANCES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const flowlinks = addKeyword(["2", "dos"])
  .addAnswer(" *TICKETS* https://helpdesk.grupolamat.com", {
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQjDyyRr5xcRxl0TCoFG85hmI2jyIJreTng&s",
  })
  .addAnswer(" *CORREO* https://grupolamat.com.mx", {
    media:
      "https://images.vexels.com/media/users/3/136340/isolated/preview/74ac661d8216442ae469efb39c9584dc-icono-de-mensaje-de-correo.png",
  })
  .addAnswer(" *PORTAL DE REQUSICIONES* https://sao.grupolamat.com.mx", {
    media:
      "https://www.manageengine.com/products/service-desk/help-desk-software/images/what-is-a-support-ticket-system.png",
  })
  .addAnswer("Para regresar al menu, escribe *Menu*");

// ----------------------------------------------------------------FLUJO CONTACTOS----------------------------------------------------------------
const flowcontactos = addKeyword(["1", "uno", "contactos"])
  .addAnswer("Juan Alberto Calderon -- *Gerente de GAF*", {
    media:
      "https://i.ytimg.com/vi/wYJW07pgLN0/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAiudfkwGb2gHz08EG94AKqVndIXw",
  })
  .addAnswer(
    "Juan Miguel Aguirre Paredes -- *Coordinador de TI* -- 📞993 190 8780",
    {
      media: "https://intn24.lalr.co/old/Up.jpg",
    }
  )
  .addAnswer("Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞993 243 7599", {
    media:
      "https://static.wikia.nocookie.net/disney/images/e/e2/Don_Risitas.png/revision/latest?cb=20130423093527&path-prefix=es",
  })
  .addAnswer("Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223", {
    media:
      "https://www.rollingstone.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-15-at-11.24.37-AM.jpg?w=910&h=511&crop=1",
  })
  .addAnswer(
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
    {
      media:
        "https://img.wattpad.com/85fdf423872032e520fa1319c98c40aab069f8a6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f41616962797a5f553372466272413d3d2d3836342e313761633162366163643335356130313135313134313232353839342e6a7067?s=fit&w=720&h=720",
    }
  )
  .addAnswer("Para regresar al menu, escribe *Menu*");

// ----------------------------------------------------------------FLUJO PRINCIPAL----------------------------------------------------------------
const flowPrincipal = addKeyword(["hola", "buenos", "dias", "tardes", "menu"])
  .addAnswer("Bienvenido al ChatBot de TI")
  .addAnswer(
    [
      "En que te puedo ayudar:",
      "*1*.-Contactos de TI",
      "*2*.-Enlaces de TI",
      "*3*.-Correo corporativo",
      "*4*.-Tickets",
      "*5*.-Nextcloud",
      "*6*.-Portal de requisiciones",
    ],
    null,
    null,
    [flowcontactos, flowlinks, flowCorreo]
  );

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
