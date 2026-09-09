/* =====================================================================
   FixNear — Panel Admin · Traducción español / inglés
   ---------------------------------------------------------------------
   Cómo funciona:
   El panel se sigue escribiendo en español en index.html. Este archivo
   recorre el DOM, guarda el texto original de cada nodo y lo sustituye
   por su equivalente en inglés cuando el idioma activo es "en".

   Como las tablas, tarjetas y modales se vuelven a dibujar con innerHTML,
   un MutationObserver traduce también todo lo que aparece después.

   Para agregar una traducción nueva basta con añadir una línea al objeto
   DICT: 'Texto en español': 'Text in English'.
   ===================================================================== */
(function () {
  'use strict';

  var LS_KEY = 'fixnear-admin-lang';

  // localStorage puede lanzar excepción (modo privado, cookies bloqueadas).
  // Si falla, el panel simplemente no recuerda el idioma entre recargas.
  function leerLang() {
    try { return localStorage.getItem(LS_KEY) === 'en' ? 'en' : 'es'; }
    catch (e) { return 'es'; }
  }
  function guardarLang(v) {
    try { localStorage.setItem(LS_KEY, v); } catch (e) {}
  }

  var lang = leerLang();

  /* ---------------------------------------------------------------
     1. Diccionario de textos exactos (se compara sin espacios extra)
     --------------------------------------------------------------- */
  var DICT = {
    // ---- Login ----
    'Panel de administración': 'Administration panel',
    'Iniciar sesión': 'Sign in',
    'Solo para administradores autorizados': 'Authorized administrators only',
    'Correo o contraseña incorrectos.': 'Incorrect email or password.',
    'Esta cuenta no tiene permisos de administrador.': 'This account does not have administrator permissions.',
    'Correo electrónico': 'Email address',
    'Contraseña': 'Password',
    'Entrar al panel': 'Enter panel',
    'Verificando…': 'Verifying…',

    // ---- Sidebar / navegación ----
    'Trabajadores': 'Workers',
    'Clientes': 'Clients',
    'Reportes': 'Reports',
    'Reportes de clientes': 'Client reports',
    'Reportes de trabajadores': 'Worker reports',
    'Historial': 'History',
    'Mensajes': 'Messages',
    'Configuración': 'Settings',
    'Cerrar sesión': 'Log out',

    // ---- Subtítulos del topbar ----
    'Resumen general del sistema': 'System overview',
    'Gestiona los perfiles de trabajadores': 'Manage worker profiles',
    'Supervisa los clientes registrados': 'Monitor registered clients',
    'Gestiona reportes y denuncias': 'Manage reports and complaints',
    'Reportes enviados por clientes sobre trabajadores': 'Reports filed by clients about workers',
    'Reportes enviados por trabajadores sobre clientes': 'Reports filed by workers about clients',
    'Registro de cambios y auditoría': 'Change and audit log',
    'Comunicación con usuarios': 'Communication with users',
    'Ajustes generales del sistema': 'General system settings',

    // ---- Tarjetas de estadísticas ----
    'Trabajadores totales': 'Total workers',
    'Pendientes aprobación': 'Pending approval',
    'Aprobados': 'Approved',
    'Rechazados': 'Rejected',
    'Clientes registrados': 'Registered clients',
    'Reportes pendientes': 'Pending reports',
    'Tasa de aprobación': 'Approval rate',
    'Mensajes enviados': 'Messages sent',

    // ---- Gráficas ----
    'Registros por mes': 'Sign-ups per month',
    'Mes anterior': 'Previous month',
    'Mes siguiente': 'Next month',
    'Mes actual': 'Current month',
    'Estado de trabajadores': 'Worker status',
    'Top 5 oficios': 'Top 5 trades',
    'Actividad por día': 'Activity per day',
    'Ningún documento tiene fecha de registro guardada. Agrega un campo creadoEn al crear usuarios y solicitudes para que esta gráfica se llene.':
      'No document has a stored creation date. Add a creadoEn field when creating users and applications so this chart can fill in.',
    'Sin actividad registrada en los últimos 7 días.': 'No activity recorded in the last 7 days.',

    // ---- Filtros ----
    'Todos': 'All',
    'Pendientes': 'Pending',
    'Resueltos': 'Resolved',
    'En revisión': 'Under review',

    // ---- Placeholders ----
    '🔍 Buscar trabajador...': '🔍 Search worker...',
    '🔍 Buscar cliente...': '🔍 Search client...',
    '🔍 Buscar reporte...': '🔍 Search report...',
    'Buscar historial...': 'Search history...',
    'Selecciona destinatario…': 'Select recipient…',
    'Asunto del mensaje…': 'Message subject…',
    'Escribe tu mensaje aquí…': 'Write your message here…',
    'Nuevo servicio…': 'New service…',

    // ---- Estados de carga y vacíos ----
    'Cargando…': 'Loading…',
    'Cargando trabajadores…': 'Loading workers…',
    'Cargando historial…': 'Loading history…',
    'No se encontraron trabajadores.': 'No workers found.',
    'No se encontraron clientes.': 'No clients found.',
    'No hay reportes.': 'No reports.',
    'No hay reportes en esta vista.': 'No reports in this view.',
    'Sin registros de historial.': 'No history records.',
    'Sin mensajes': 'No messages',
    'Sin mensajes enviados.': 'No messages sent.',

    // ---- Encabezados de tablas ----
    'Nombre': 'Name',
    'Apellido': 'Last name',
    'Servicios solicitados': 'Services requested',
    'Estado': 'Status',
    'Acciones': 'Actions',
    'Tipo': 'Type',
    'Reportante': 'Reported by',
    'Contra': 'Against',
    'Fecha': 'Date',
    'Motivo': 'Reason',
    'Cliente que reporta': 'Reporting client',
    'Trabajador reportado': 'Reported worker',
    'Trabajador que reporta': 'Reporting worker',
    'Cliente reportado': 'Reported client',
    'Destinatario': 'Recipient',
    'Asunto': 'Subject',

    // ---- Historial: tipos ----
    'Todos los tipos': 'All types',
    'Aprobación': 'Approval',
    'Rechazo': 'Rejection',
    'Edición': 'Edit',
    'Eliminación': 'Deletion',
    'Suspensión': 'Suspension',
    'Mensaje': 'Message',
    'Moderación': 'Moderation',
    'aprobacion': 'approval',
    'rechazo': 'rejection',
    'edicion': 'edit',
    'eliminacion': 'deletion',
    'suspension': 'suspension',
    'mensaje': 'message',
    'moderacion': 'moderation',
    'Reciente': 'Recent',

    // ---- Mensajes ----
    'Enviar nuevo mensaje': 'Send new message',
    'Anuncio a todos': 'Announcement to everyone',
    'Solo trabajadores': 'Workers only',
    'Solo clientes': 'Clients only',
    'Usuario específico': 'Specific user',
    'Email del usuario': 'User email',
    'Enviar mensaje': 'Send message',
    'Contenido': 'Content',

    // ---- Configuración ----
    '⚙️ Comisiones y precios': '⚙️ Commissions and pricing',
    'Porcentaje de comisión (%)': 'Commission percentage (%)',
    'Precio mínimo por hora ($)': 'Minimum hourly rate ($)',
    'Precio máximo por hora ($)': 'Maximum hourly rate ($)',
    'Guardar configuración': 'Save settings',
    '🔧 Servicios disponibles': '🔧 Available services',
    'Electricidad': 'Electrical',
    'Plomería': 'Plumbing',
    'Carpintería': 'Carpentry',
    'Agregar': 'Add',
    '🔐 Seguridad y exportación': '🔐 Security and export',
    'Habilitar autenticación de 2 factores': 'Enable two-factor authentication',
    '📊 Exportar CSV': '📊 Export CSV',

    // ---- Botones ----
    'Ver': 'View',
    'Ver más': 'View more',
    'Editar': 'Edit',
    'Eliminar': 'Delete',
    'Aprobar': 'Approve',
    'Rechazar': 'Reject',
    'Revisar': 'Review',
    'Resolver': 'Resolve',
    'Responder': 'Reply',
    'Re-sincronizar': 'Re-sync',
    'Suspender': 'Suspend',
    'Activar': 'Activate',
    'Cerrar': 'Close',
    'Cancelar': 'Cancel',
    'Guardar cambios': 'Save changes',

    // ---- Modales ----
    'Detalle': 'Details',
    'Editar trabajador': 'Edit worker',
    'Oficio': 'Trade',
    'Precio por hora ($)': 'Hourly rate ($)',
    'Descripción': 'Description',
    'Experiencia': 'Experience',
    'Teléfono': 'Phone',
    'Precio/hora': 'Rate/hour',
    'Departamento': 'Department',
    'Municipio': 'Municipality',
    'Radio': 'Radius',
    'Correo': 'Email',
    'Servicios': 'Services',
    'Reporte': 'Report',
    'Sin nombre': 'No name',
    'Preferencia de pago': 'Payment preference',
    '💵 Pago en efectivo': '💵 Cash payment',
    '🏦 Transferencia bancaria': '🏦 Bank transfer',
    'Titular:': 'Account holder:',
    'Titularidad:': 'Ownership:',
    'Banco:': 'Bank:',
    'Tipo de cuenta:': 'Account type:',
    'N.º de cuenta:': 'Account no.:',
    'Cuenta de terceros': 'Third-party account',
    'Cuenta propia': 'Own account',
    'Corriente': 'Checking',
    'Ahorro': 'Savings',
    'No registrada': 'Not provided',
    'Verificación de identidad': 'Identity verification',
    'DUI frente': 'ID front',
    'DUI reverso': 'ID back',
    'Rostro': 'Face photo',
    'Sin documentos subidos': 'No documents uploaded',
    'Ver antecedentes penales (PDF)': 'View criminal record certificate (PDF)',
    'Revisado': 'Reviewed',
    'No subió antecedentes penales': 'Did not upload criminal record certificate',
    'Evidencia': 'Evidence',
    'Sin adjunto': 'No attachment',
    'Respuesta enviada': 'Reply sent',

    // ---- Badges de estado ----
    'Pendiente': 'Pending',
    'Aprobado': 'Approved',
    'Rechazado': 'Rejected',
    'Resuelto': 'Resolved',
    'Activo': 'Active',
    'Suspendido': 'Suspended',

    // ---- Toasts ----
    'Trabajador aprobado': 'Worker approved',
    'Antecedentes marcados como revisados': 'Criminal record marked as reviewed',
    'Antecedentes marcados como pendientes de revisión': 'Criminal record marked as pending review',
    'No se puede aprobar: el trabajador no subió antecedentes penales': 'Cannot approve: the worker did not upload a criminal record certificate',
    'No se puede aprobar: marca los antecedentes penales como revisados primero': 'Cannot approve: mark the criminal record certificate as reviewed first',
    'Trabajador actualizado': 'Worker updated',
    'Registro rechazado': 'Application rejected',
    'Estado actualizado': 'Status updated',
    'Reporte resuelto': 'Report resolved',
    'Mensaje enviado': 'Message sent',
    'Mensaje eliminado correctamente': 'Message deleted successfully',
    'Configuración guardada': 'Settings saved',
    'Servicio agregado': 'Service added',
    'Servicio eliminado': 'Service removed',
    'Datos exportados': 'Data exported',
    'Datos re-sincronizados': 'Data re-synced',
    'Cliente suspendido correctamente': 'Client suspended successfully',
    'Cliente activado correctamente': 'Client activated successfully',
    'Cliente eliminado correctamente': 'Client deleted successfully',
    'Solicitud eliminada correctamente': 'Application deleted successfully',
    'Solicitud no encontrada': 'Application not found',
    'Cliente no encontrado': 'Client not found',
    'Esta solicitud ya fue procesada': 'This application was already processed',
    'Completa todos los campos': 'Fill in all the fields',

    // ---- confirm() / prompt() ----
    '¿Eliminar mensaje?': 'Delete message?',
    '¿Suspender este cliente?': 'Suspend this client?',
    '¿Eliminar este cliente? Esta acción no se puede deshacer.': 'Delete this client? This action cannot be undone.',
    '¿Eliminar esta solicitud? Esta acción no se puede deshacer.': 'Delete this application? This action cannot be undone.',
    'Respuesta para el usuario:': 'Reply to the user:'
  };

  /* ---------------------------------------------------------------
     2. Reglas para textos con partes variables (nombres, IDs, etc.)
     --------------------------------------------------------------- */
  var REGLAS = [
    [/^Aprobó a (.+)$/,                       'Approved $1'],
    [/^Rechazó a (.+)$/,                      'Rejected $1'],
    [/^Editó perfil de (.+)$/,                'Edited profile of $1'],
    [/^Re-sincronizó datos de (.+)$/,         'Re-synced data of $1'],
    [/^Eliminó solicitud de (.+)$/,           'Deleted application of $1'],
    [/^Eliminó cliente (.+)$/,                'Deleted client $1'],
    [/^Suspendió cliente (.+)$/,              'Suspended client $1'],
    [/^Envió mensaje: (.+)$/,                 'Sent message: $1'],
    [/^Resolvió reporte (.+)$/,               'Resolved report $1'],
    [/^Respondió un reporte de cliente$/,     'Replied to a client report'],
    [/^Respondió un reporte de trabajador$/,  'Replied to a worker report'],
    [/^Cambió a "(.+)" un reporte de cliente$/,    'Changed a client report to "$1"'],
    [/^Cambió a "(.+)" un reporte de trabajador$/, 'Changed a worker report to "$1"'],
    [/^Reporte: (.+)$/,                       'Report: $1'],
    [/^Error al eliminar: (.+)$/,             'Delete error: $1'],
    [/^Aprobado, pero falló guardar los datos bancarios: (.+)$/,
     'Approved, but saving the bank details failed: $1'],
    [/^(.*?)(\d+|—) años$/,                   '$1$2 years'],
    [/^(\d+|—) km$/,                          '$1 km'],
    [/^¿Re-sincronizar los datos de ([\s\S]+)\?\n\nSe vuelven a copiar los datos de su solicitud a su perfil\. No cambia su estado\.$/,
     'Re-sync the data of $1?\n\nThe application data is copied to their profile again. Their status does not change.'],
    [/^(\d+) registro\(s\) sin fecha no aparecen en la gráfica\.$/,
     '$1 record(s) without a date are not shown in the chart.']
  ];

  /* ---------------------------------------------------------------
     3. Motor de traducción
     --------------------------------------------------------------- */
  function traducirNucleo(txt) {
    if (Object.prototype.hasOwnProperty.call(DICT, txt)) return DICT[txt];
    for (var i = 0; i < REGLAS.length; i++) {
      if (REGLAS[i][0].test(txt)) return txt.replace(REGLAS[i][0], REGLAS[i][1]);
    }
    return txt;
  }

  // Respeta los espacios y saltos de línea alrededor del texto.
  function traducir(txt) {
    if (lang === 'es' || !txt) return txt;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(txt);
    return m[1] + traducirNucleo(m[2]) + m[3];
  }

  var ORIG = new WeakMap();               // nodo de texto -> texto original en español
  var IGNORAR = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CANVAS: 1, TEXTAREA: 1 };
  var aplicando = false;
  var observer = null;

  function nodosDeTexto(raiz) {
    var salida = [];
    var walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || IGNORAR[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.nodeType === 1 && p.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walker.nextNode())) salida.push(n);
    return salida;
  }

  function aplicar() {
    if (!document.body) return;
    aplicando = true;

    // Texto visible
    nodosDeTexto(document.body).forEach(function (n) {
      var orig = ORIG.get(n);
      if (orig === undefined) { orig = n.nodeValue; ORIG.set(n, orig); }
      var nuevo = lang === 'es' ? orig : traducir(orig);
      if (n.nodeValue !== nuevo) n.nodeValue = nuevo;
    });

    // Atributos (placeholder, title, alt)
    ['placeholder', 'title', 'alt'].forEach(function (attr) {
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        if (el.closest('[data-i18n-skip]')) return;
        var clave = 'i18nOrig' + attr;
        if (el.dataset[clave] === undefined) el.dataset[clave] = el.getAttribute(attr);
        var orig = el.dataset[clave];
        var nuevo = lang === 'es' ? orig : traducir(orig);
        if (el.getAttribute(attr) !== nuevo) el.setAttribute(attr, nuevo);
      });
    });

    document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'FixNear — Admin Panel' : 'FixNear — Panel Admin';

    document.querySelectorAll('.fx-lang-opt').forEach(function (b) {
      var activo = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    if (observer) observer.takeRecords();
    aplicando = false;
  }

  var pendiente = false;
  function programar() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { pendiente = false; aplicar(); });
  }

  function setLang(nuevo) {
    lang = nuevo === 'en' ? 'en' : 'es';
    guardarLang(lang);
    window.I18N.lang = lang;
    aplicar();
    // Chart.js dibuja sus etiquetas dentro del canvas, así que el panel
    // avisa por evento para que las gráficas se vuelvan a generar.
    window.dispatchEvent(new CustomEvent('fixnear:lang', { detail: { lang: lang } }));
  }

  /* ---------------------------------------------------------------
     4. API pública
     --------------------------------------------------------------- */
  window.I18N = {
    get lang() { return lang; },
    set lang(v) { lang = v; },
    setLang: setLang,
    toggle: function () { setLang(lang === 'es' ? 'en' : 'es'); },
    t: traducirNucleo,
    dict: DICT,
    refresh: aplicar
  };

  // Helper para el JS del panel: tr('Trabajadores', 'Workers')
  window.tr = function (es, en) { return lang === 'en' ? en : es; };

  /* ---------------------------------------------------------------
     5. Diálogos nativos (confirm / prompt / alert)
     --------------------------------------------------------------- */
  ['confirm', 'prompt', 'alert'].forEach(function (fn) {
    var original = window[fn].bind(window);
    window[fn] = function (msg) {
      var args = Array.prototype.slice.call(arguments);
      if (typeof msg === 'string') args[0] = traducir(msg);
      return original.apply(window, args);
    };
  });

  /* ---------------------------------------------------------------
     6. Arranque
     --------------------------------------------------------------- */
  // Los estilos se inyectan desde aquí y no desde admin.css a propósito:
  // index.html enlaza dos hojas de estilo distintas y así el selector se ve
  // bien sin depender de cuál de las dos termine cargando el navegador.
  var CSS = [
    '.fx-lang{display:inline-flex;align-items:center;gap:2px;background:var(--card,#1c1c1c);',
    'border:1px solid var(--border,#2a2a2a);border-radius:10px;padding:3px;flex:0 0 auto}',

    '.fx-lang-opt{appearance:none;-webkit-appearance:none;background:transparent;border:0;',
    'color:var(--muted,#777);font-family:inherit;font-size:11px;font-weight:700;letter-spacing:.4px;',
    'line-height:1;padding:6px 12px;border-radius:8px;cursor:pointer;transition:color .15s,background .15s}',

    '.fx-lang-opt:hover{color:var(--text,#f0f0f0)}',
    '.fx-lang-opt.is-active{background:var(--accent,#3b82f6);color:#fff}',
    '.fx-lang-opt.is-active:hover{color:#fff}',
    '.fx-lang-opt:focus-visible{outline:2px solid var(--accent,#3b82f6);outline-offset:2px}',

    // Filtro de mes del dashboard
    '.chart-filtro{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap}',

    '.chart-nav,.chart-hoy{appearance:none;-webkit-appearance:none;background:var(--surface,#161616);',
    'border:1px solid var(--border,#2a2a2a);color:var(--muted,#777);font-family:inherit;',
    'border-radius:10px;cursor:pointer;transition:color .15s,border-color .15s,background .15s}',

    '.chart-nav{width:32px;height:32px;font-size:16px;line-height:1;padding:0;display:flex;',
    'align-items:center;justify-content:center}',
    '.chart-hoy{height:32px;padding:0 14px;font-size:12px;font-weight:600}',

    '.chart-nav:hover:not(:disabled),.chart-hoy:hover{color:var(--accent,#3b82f6);',
    'border-color:var(--accent,#3b82f6);background:var(--accent-dim,rgba(59,130,246,.12))}',
    '.chart-nav:disabled{opacity:.35;cursor:not-allowed}',

    '.chart-mes{background:var(--surface,#161616);border:1px solid var(--border,#2a2a2a);',
    'color:var(--text,#f0f0f0);font-family:inherit;font-size:12px;font-weight:600;height:32px;',
    'padding:0 10px;border-radius:10px;color-scheme:dark;cursor:pointer}',
    '.chart-mes:focus{outline:none;border-color:var(--accent,#3b82f6)}',

    // El contenedor de cada gráfica necesita altura fija porque Chart.js
    // corre con maintainAspectRatio:false y hereda la altura del padre.
    '.chart-box{position:relative;width:100%;height:240px}',

    '.chart-nota{display:none;margin-top:12px;font-size:11px;line-height:1.5;',
    'color:var(--muted,#777);border-left:2px solid var(--border,#2a2a2a);padding-left:10px}',

    '@media (max-width:768px){.chart-box{height:210px}',
    '.fx-lang-opt{padding:5px 9px;font-size:10px}}'
  ].join('');

  function inyectarEstilos() {
    if (document.getElementById('fx-i18n-css')) return;
    var st = document.createElement('style');
    st.id = 'fx-i18n-css';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function crearSelector() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || document.querySelector('.fx-lang')) return;

    var caja = document.createElement('div');
    caja.className = 'fx-lang';
    caja.setAttribute('data-i18n-skip', '');
    caja.setAttribute('role', 'group');
    caja.setAttribute('aria-label', 'Idioma / Language');

    [['es', 'ES'], ['en', 'EN']].forEach(function (par) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'fx-lang-opt';
      b.setAttribute('data-lang', par[0]);
      b.textContent = par[1];
      b.title = par[0] === 'es' ? 'Español' : 'English';
      b.addEventListener('click', function () { setLang(par[0]); });
      caja.appendChild(b);
    });

    topbar.appendChild(caja);
  }

  function iniciar() {
    inyectarEstilos();
    crearSelector();
    aplicar();

    observer = new MutationObserver(function () { if (!aplicando) programar(); });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
