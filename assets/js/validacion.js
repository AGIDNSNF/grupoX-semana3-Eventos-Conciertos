// Demostración local: no envía ni almacena los datos del formulario.
const formulario = document.querySelector('.pulso-form');
const resultado = document.querySelector('#resultadoReserva');
const campos = [...formulario.querySelectorAll('[required]')];

formulario.noValidate = true;
formulario.querySelector('[type="submit"]').disabled = false;

function validarCampo(campo) {
  if (campo.id === 'nombre') {
    campo.setCustomValidity(campo.value.trim().length < 3 ? 'Ingresa tu nombre completo.' : '');
  }
  const valido = campo.checkValidity();
  campo.classList.toggle('is-invalid', !valido);
  campo.classList.toggle('is-valid', valido);
  campo.setAttribute('aria-invalid', String(!valido));
  return valido;
}

campos.forEach((campo) => {
  campo.addEventListener('blur', () => validarCampo(campo));
  for (const evento of ['input', 'change']) {
    campo.addEventListener(evento, () => {
      resultado.textContent = '';
      if (campo.hasAttribute('aria-invalid')) validarCampo(campo);
    });
  }
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const estados = campos.map(validarCampo);
  const primerError = estados.indexOf(false);
  if (primerError !== -1) {
    resultado.textContent = 'Revisa los campos marcados para continuar.';
    campos[primerError].focus();
    return;
  }
  resultado.textContent = '¡Formulario completado correctamente! Tu reserva de prueba es válida. No se han enviado datos ni realizado una compra.';
});
