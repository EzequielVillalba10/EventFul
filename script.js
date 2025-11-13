// ======== Botones y contenedor principal ========
const contenido = document.getElementById("contenido");
const resumenBtn = document.getElementById("resumenBtn");
const salonesBtn = document.getElementById("salonesBtn");
const ingresosBtn = document.getElementById("ingresosBtn");
const configBtn = document.getElementById("configBtn");

// ======== Eventos ========
resumenBtn.addEventListener("click", mostrarResumen);
salonesBtn.addEventListener("click", mostrarSalones);
ingresosBtn.addEventListener("click", mostrarIngresos);
configBtn.addEventListener("click", mostrarConfig);

// ======== Menú activo ========
document.querySelectorAll(".sidebar li").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach((li) => li.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ======== SECCIÓN RESUMEN ========
function mostrarResumen() {
  contenido.innerHTML = `
    <h2>Resumen General</h2>
    <p class="intro">Mirá de un vistazo tus métricas principales del mes.</p>
    <div class="cards">
      <div class="card">
        <h3>Reservas Totales</h3>
        <p class="number">45</p>
        <span>+8% respecto al mes pasado</span>
      </div>
      <div class="card">
        <h3>Ingresos</h3>
        <p class="number">$12.450</p>
        <span>Últimos 30 días</span>
      </div>
      <div class="card">
        <h3>Salones Activos</h3>
        <p class="number">5</p>
        <span>Todos en buen estado</span>
      </div>
      <div class="card">
        <h3>Valoración Promedio</h3>
        <p class="number">4.8 ⭐</p>
        <span>Basado en 230 reseñas</span>
      </div>
    </div>
  `;
}

// ======== SECCIÓN MIS SALONES ========
function mostrarSalones() {
  contenido.innerHTML = `
    <h2>Mis Salones</h2>
    <div class="salones-grid">
      <div class="salon-card">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="salon">
        <div class="info">
          <h4>Salón Luminoso</h4>
          <p>Buenos Aires</p>
          <p class="estado">Disponible</p>
          <button class="btn">Editar</button>
        </div>
      </div>
      <div class="salon-card">
        <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c" alt="terraza">
        <div class="info">
          <h4>Terraza Urbana</h4>
          <p>Córdoba</p>
          <p class="estado">Reservado</p>
          <button class="btn">Editar</button>
        </div>
      </div>
      <div class="salon-card">
        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" alt="campo">
        <div class="info">
          <h4>Espacio Natural</h4>
          <p>Rosario</p>
          <p class="estado">Disponible</p>
          <button class="btn">Editar</button>
        </div>
      </div>
    </div>
  `;
}

// ======== SECCIÓN INGRESOS ========
function mostrarIngresos() {
  contenido.innerHTML = `
    <div class="ingresos">
      <h2>Mis Ingresos</h2>
      <div class="resumen">
        <div>
          <h4>Este Mes</h4>
          <p>$3,250</p>
        </div>
        <div>
          <h4>Reservas</h4>
          <p>12</p>
        </div>
        <div>
          <h4>Promedio</h4>
          <p>$270</p>
        </div>
      </div>
      <canvas id="grafico"></canvas>
    </div>
  `;
  setTimeout(animarGrafico, 200);
}

// ======== SECCIÓN CONFIGURACIÓN ========
function mostrarConfig() {
  contenido.innerHTML = `
    <h2>Configuración de Cuenta</h2>
    <p class="intro">Actualizá tus datos y preferencias del perfil.</p>
    <form class="config-form">
      <label>Nombre de Usuario</label>
      <input type="text" placeholder="Ej: Javier R.">

      <label>Correo Electrónico</label>
      <input type="email" placeholder="correo@ejemplo.com">

      <label>Ubicación</label>
      <input type="text" placeholder="Ciudad, País">

      <label>Notificaciones</label>
      <select>
        <option>Activadas</option>
        <option>Solo importantes</option>
        <option>Desactivadas</option>
      </select>

      <label>Modo de Interfaz</label>
      <select id="modoSelect" onchange="cambiarModo()">
        <option value="claro">Claro</option>
        <option value="oscuro">Oscuro</option>
      </select>

      <button type="button" onclick="guardarConfig()">Guardar Cambios</button>
    </form>
  `;
}

// ======== FUNCIÓN: GUARDAR CONFIGURACIÓN ========
function guardarConfig() {
  alert("Cambios guardados correctamente ✅");
}

// ======== FUNCIÓN: CAMBIAR MODO OSCURO / CLARO ========
function cambiarModo() {
  const select = document.getElementById("modoSelect");
  if (select.value === "oscuro") {
    document.body.classList.add("modo-oscuro");
  } else {
    document.body.classList.remove("modo-oscuro");
  }
}

// ======== GRÁFICO ANIMADO ========
function animarGrafico() {
  const canvas = document.getElementById("grafico");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = 300;

  const datos = [150, 180, 210, 260, 290, 320, 370];
  const maxValor = Math.max(...datos);
  const margen = 40;
  const anchoPaso = (canvas.width - margen * 2) / (datos.length - 1);

  let progreso = 0;

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ejes
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margen, canvas.height - margen);
    ctx.lineTo(canvas.width - margen, canvas.height - margen);
    ctx.lineTo(canvas.width - margen, margen);
    ctx.stroke();

    // Línea de ingresos
    ctx.beginPath();
    ctx.moveTo(margen, escalarY(datos[0], progreso));
    for (let i = 1; i < datos.length; i++) {
      const x = margen + i * anchoPaso;
      const y = escalarY(datos[i], progreso);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#00bfa6";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // Círculos en los puntos
    ctx.fillStyle = "#00bfa6";
    datos.forEach((valor, i) => {
      const x = margen + i * anchoPaso;
      const y = escalarY(valor, progreso);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    if (progreso < 1) {
      progreso += 0.02;
      requestAnimationFrame(dibujar);
    }
  }

  function escalarY(valor, prog) {
    const alturaMax = canvas.height - margen * 2;
    const proporcion = (valor / maxValor) * prog;
    return canvas.height - margen - alturaMax * proporcion;
  }

  dibujar();
}

// ======== Mostrar por defecto “Resumen” ========
mostrarResumen();
