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

//----------------------------------------------------------------FLUJO COMPLETO REQUISICIONES----------------------------------------------------------------
//FLUJO HIJO Ceco o Insumo
const flowCecos = addKeyword(["4", "Cuatro"])
  .addAnswer(
    "Si no se encuentra el ceco o insumo que necessita, favor de comunicarse con la Gerencia de Procura"
  )
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO Usuario o Contraseña Incorrecta
const flowPassSao = addKeyword(["3", "Tres"])
  .addAnswer([
    "*Comunicate con el equipo de TI para checar su cuenta*",
    "Juan Miguel Aguirre Paredes -- *Coordinador de TI* -- 📞993 190 8780",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO ¿Cual es el Link de la plataforma de Next?
const flowLinkSao = addKeyword(["2", "Dos"])
  .addAnswer(" *PORTAL DE REQUSICIONES* https://sao.grupolamat.com.mx", {
    media:
      "https://www.manageengine.com/products/service-desk/help-desk-software/images/what-is-a-support-ticket-system.png",
  })
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO No tengo cuenta de Sao
const flowNoCuentaSao = addKeyword(["1", "Uno"])
  .addAnswer([
    "*Comunicate con el equipo de TI para la creacion de su cuenta*",
    "Juan Miguel Aguirre Paredes -- *Coordinador de TI* -- 📞993 190 8780",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO PRINCIPAL DE MENU DE CORREO
const flowSao = addKeyword(["6", "Seis"]).addAnswer(
  [
    "¿Que problema tienes?",
    "*1*.-No tengo cuenta del portal de Requisiciones",
    "*2*.-¿Cual es el Link de la plataforma de Requisiciones?",
    "*3*.-Usuario o Contraseña Incorrecta",
    "*4*.-Ceco o insumo faltante",
    "Para regresar al menu principal, escribe *Menu*",
  ],
  null,
  null,
  [flowNoCuentaSao, flowLinkSao, flowPassSao, flowCecos]
);

//----------------------------------------------------------------FLUJO COMPLETO DE NEXTCLOUD----------------------------------------------------------------
//FLUJO HIJO Usuario o Contraseña Incorrecta
const flowPassNext = addKeyword(["3", "Tres"])
  .addAnswer([
    "*Comunicate con el equipo de TI para checar su cuenta*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO ¿Cual es el Link de la plataforma de Next?
const flowLinkNext = addKeyword(["2", "Dos"])
  .addAnswer([
    "*Links de Nextcloud:*",
    "*Area de Procura, Admon Obra y Contabilidad* https://nextcloud0.grupolamat.com.mx/",
    "*Area de Control Integral y Recursos Humanos* https://nextcloud1.grupolamat.com.mx/",
    "*Area Construccion y Tecnica* https://nextcloud2.grupolamat.com.mx/",
    "*Area Admon y Finanzas, Juridico y Maquinaria* https://nextcloud3.grupolamat.com.mx/",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO No tengo cuenta de Next
const flowNoCuentaNext = addKeyword(["1", "Uno"])
  .addAnswer([
    "*Comunicate con el equipo de TI para la creacion de su cuenta*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO PRINCIPAL DE MENU DE CORREO
const flowNext = addKeyword(["5", "Cinco"]).addAnswer(
  [
    "¿Que problema tienes?",
    "*1*.-No tengo cuenta de Nextcloud",
    "*2*.-¿Cual es el Link de la plataforma de Nextcloud?",
    "*3*.-Usuario o Contraseña Incorrecta",
    "Para regresar al menu principal, escribe *Menu*",
  ],
  null,
  null,
  [flowNoCuentaNext, flowLinkNext, flowPassNext]
);

//----------------------------------------------------------------FLUJO COMPLETO TICKETS----------------------------------------------------------------

//FLUJO HIJO Usuario o Contraseña Incorrecta
const flowPassTickets = addKeyword(["3", "Tres"])
  .addAnswer([
    "*Comunicate con el equipo de TI para checar su cuenta*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO ¿Cual es el Link de la plataforma de Tickets?
const flowLinkTickets = addKeyword(["2", "Dos"])
  .addAnswer(" *TICKETS* https://helpdesk.grupolamat.com", {
    media:
      "https://nextcloud3.grupolamat.com.mx/core/preview?fileId=2437405&x=1920&y=1080&a=true&etag=ef7a3bb872dec28854729f3b4c3dc788",
  })
  .addAnswer("Para regresar al menu, escribe Menu");

//FLUJO HIJO No tengo cuenta de Tickets
const flowNoCuentaTickets = addKeyword(["1", "Uno"])
  .addAnswer([
    "*Comunicate con el equipo de TI para la creacion de su cuenta*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO PRINCIPAL DE MENU DE CORREO
const flowTickets = addKeyword(["4", "Cuatro"]).addAnswer(
  [
    "¿Que problema tienes?",
    "*1*.-No tengo cuenta de Tickets",
    "*2*.-¿Cual es el Link de la plataforma de Tickets?",
    "*3*.-Usuario o Contraseña Incorrecta",
    "Para regresar al menu principal, escribe *Menu*",
  ],
  null,
  null,
  [flowNoCuentaTickets, flowLinkTickets, flowPassTickets]
);

// ----------------------------------------------------------------FLUJO COMPLETO CORREO----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FLUJO HIJO Error Your Box is Full
const flowBoxLimitError = addKeyword(["7", "Siete"])
  .addAnswer(
    "El error *Your Box is Full* es esta relacionado con la capacidad de almacenamiento de una cuenta de correo electrónico. Este mensaje indica que la bandeja de entrada del usuario (la *caja* o *mailbox*) ha alcanzado su límite máximo de almacenamiento y no puede recibir nuevos correos"
  )
  .addAnswer([
    "*Comunicate con el equipo de TI para realizar el respaldo de su correo:*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO Error 550 Recipient correo has exceeded mailbox limit
const flowReceiptError = addKeyword(["6", "Seis"])
  .addAnswer(
    "El Error 550 Recipient has exceeded mailbox limit es un mensaje de error de correo electrónico que indica que el destinatario no puede recibir el correo porque ha superado el límite de almacenamiento asignado a su bandeja de entrada. Este límite puede estar definido por el proveedor de correo electrónico o por la configuración del servidor de correo de la organización del destinatario."
  )
  .addAnswer([
    "*Soluciones:*",
    "*1*.-Comunicarse con TI para notificar que correo ya no tiene espacio",
    "*2*.-Al redactar el correo eliminar al destinatario que tiene el error para poder enviar el correo",
  ])
  .addAnswer([
    "*Comunicate con el equipo de TI:*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

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
  .addAnswer([
    "*Comunicate con el equipo de TI:*",
    "Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞 993 190 8780",
    "Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞 993 243 7599",
    "Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223",
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332",
  ])
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO ¿Cual es el Link de la plataforma de correo?
const flowLinkCorreo = addKeyword(["2", "link", "plataforma"])
  .addAnswer(" *CORREO* https://grupolamat.com.mx")
  .addAnswer("Para regresar al menu, escribe Menu");

// FLUJO HIJO No me deja abrir el Outlook'
const flowOutlook = addKeyword("1", "outlook", "uno", "atras")
  .addAnswer(
    "*Primer Paso* Abrir el administrador de tareas con un clic derecho en la barra de tareas"
  )
  .addAnswer(
    "*Segundo paso* En la pestaña de procesos buscar la tarea con nombre Microsoft Outlook"
  )
  .addAnswer(
    "*Tercer paso* Da clic derecho en ese proceso y damos clic en *Finalizar la tarea* "
  )
  .addAnswer("*Cuarto paso* Vuelva a abrir la aplicacion Outlook")
  .addAnswer(
    "Si el error persiste, favor de comunicarte con TI en https://helpdesk.grupolamat.com o en el menu principal en el apartado de *Contactos de TI*"
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
  [
    flowOutlook,
    flowLinkCorreo,
    flowUserPassCorreo,
    flowFirma,
    flowErrorBig,
    flowReceiptError,
    flowBoxLimitError,
  ]
);

// ----------------------------------------------------------------FLUJO ENLANCES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const flowlinks = addKeyword(["2", "dos"])
  .addAnswer(" *TICKETS* https://helpdesk.grupolamat.com")
  .addAnswer(" *CORREO* https://grupolamat.com.mx")
  .addAnswer(" *PORTAL DE REQUSICIONES* https://sao.grupolamat.com.mx")
  .addAnswer("Para regresar al menu, escribe *Menu*");

// ----------------------------------------------------------------FLUJO CONTACTOS----------------------------------------------------------------
const flowcontactos = addKeyword(["1", "uno", "contactos"])
  .addAnswer(
    "Juan Miguel Aguirre Paredes -- *Coordinador de TI* -- 📞993 190 8780"
  )
  .addAnswer("Rafael de la Cruz Ramos -- *Auxiliar de TI* -- 📞993 104 4174")
  .addAnswer("Izamer Sanchez Perez -- *Auxiliar de TI* -- 📞993 243 7599")
  .addAnswer("Edgar Eduardo Jimenez -- *Becario de TI* -- 📞993 277 8223")
  .addAnswer(
    "Cesar Eduardo Zepeda Melendez -- *Becario de TI* -- 📞993 189 4332"
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
    [flowcontactos, flowlinks, flowCorreo, flowTickets, flowNext, flowSao]
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
