document.addEventListener('DOMContentLoaded', function(){
  iniciarApp()
});

function iniciarApp(){
  scrollNav();
  navegacionScroll();
  interaccionNav()
}

//Mejora la navegacion al scrollear y quita el id de la barra de navegacion

function scrollNav() {
  const enlaces = document.querySelectorAll('.hero a');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);

      const isMobile = window.innerWidth <= 768;
      const offsetPixels = isMobile ? 100 : 0;
      const posicion = seccion.offsetTop - offsetPixels;
      
      const options = {
        top: posicion,
        behavior: "smooth"
      }
      window.scrollTo(options);
    });
  });
}

function navegacionScroll() {
  const elementoNavegacion = document.querySelector(".contenedor-nav");
  const elementoReferencia = document.querySelector(".portada");
  const btnUp = document.querySelector('.up')
  const wbtn = document.querySelector('.whatsapp')

  function revisarPosicion() {
    const posicionY = elementoReferencia.getBoundingClientRect().bottom;

    if(scrollY >= 70){
      elementoNavegacion.classList.add("scroll");
    }else{
      elementoNavegacion.classList.remove("scroll");
    }
    
    if (posicionY <= 761) {
      btnUp.classList.add("active");
    }else{
      btnUp.classList.remove("active");
    }

    if (posicionY <= -1700){
      wbtn.classList.add("waths")
    }else{
      wbtn.classList.remove("waths")
    }
  }

  function irArriba(){
    window.scrollTo(0,0);
  }

  window.addEventListener("scroll", revisarPosicion);
  btnUp.addEventListener("click", irArriba);
}
    
  
function interaccionNav(){
  const btnham = document.querySelector('.contenedor-ham');
  const nav = document.querySelector('.navegacion-principal');
  const ham = document.querySelector('#ham');
  const x = document.querySelector('#x');
  const enlace = document.querySelectorAll('.navegacion-principal a');

  function clickNav(){
    nav.classList.toggle('active');
    btnham.classList.toggle('animationham');
    ham.classList.toggle('animationx');
    x.classList.toggle('animationx');
    enlace.forEach( enlace => {
      enlace.classList.toggle('entrada_enlace')
    })
  }
  
  enlace.forEach( child => {
    child.addEventListener('click', () => {
        nav.classList.toggle('active')
        btnham.classList.toggle('animationham');
        ham.classList.toggle('animationx');
        x.classList.toggle('animationx');
        enlace.forEach( enlace => {
          enlace.classList.toggle('entrada_enlace')
        })
    })
  });
  btnham.addEventListener('click', clickNav)
}
    
  // INTERACCION FORM
    
const email = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
}
     
const formulario = document.querySelector('#formulario');
const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const inputEmail = document.querySelector('#email');
const inputMensaje = document.querySelector('#mensaje');
const btn = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const modal = document.querySelector('.contenedor__modal');
const modalContent = document.querySelector('.modal');
const btnModal = document.querySelector('.cerrarModal');
const btnAceptar = document.querySelector('.btn__aceptar');
const speener = document.querySelector('.modal__speener')
    
inputNombre.addEventListener('input', validar)
inputTelefono.addEventListener('input', validar)
inputEmail.addEventListener('input', validar)
inputMensaje.addEventListener('input', validar)
formulario.addEventListener('submit', enviandoForm)
btnModal.addEventListener('click', cerrarModal)
btnAceptar.addEventListener('click', cerrarModal)
    
function validar(e){
    
  if([e.target.value].includes('')){
    validando(`El ${e.target.id} es obligatorio`, e.target.parentElement);
    email[e.target.name] = '';
    comprobarEmail()
    return
  }

  if( e.target.id === 'telefono' && !validarWpp(e.target.value)){
    validando('El WhatsApp no es válido', e.target.parentElement);
    email[e.target.name] = '';
    inputTelefono.focus()
    comprobarEmail()
    return
  }

  if( e.target.id === 'telefono' && e.target.value.length > 10){
    validando('El WhatsApp no es válido', e.target.parentElement);
    email[e.target.name] = '';
    inputTelefono.focus()
    comprobarEmail()
    return
  }

  if(e.target.id === 'email' && !validarEmail(e.target.value)){
    validando('El correo no es valido', e.target.parentElement);
    email[e.target.name] = '';
    inputEmail.focus()
    comprobarEmail()
    return
  }

  if(e.target.id === 'mensaje' && inputMensaje.value.length < 10 ){
    validando('El mensaje es invalido', e.target.parentElement);
    email[e.target.name] = '';
    inputMensaje.focus()
    comprobarEmail()
    return
  }

  limpiarAlerta(e.target.parentElement)
  email[e.target.name] = e.target.value.trim('').toLowerCase();
  comprobarEmail()
}
    
const validando = (mensaje, campo) => {
  limpiarAlerta(campo)
  const error = document.createElement('P')
  error.textContent = mensaje;
  error.classList.add('error')
  campo.appendChild(error)
}

function limpiarAlerta(referencia){
  const alerta = referencia.querySelector('.error');
  if(alerta){alerta.remove()}
}

function validarEmail(email){
  const expex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = expex.test(email);
  return resultado
}

function validarWpp(tele){
  const expex = /(\(?(\+57)\)?)?(3)(\d{9})/;
  const resultado = expex.test(tele);
  return resultado
}

function comprobarEmail(){
  if(Object.values(email).includes('')){
    btn.classList.add('opacity-50');
    return
  }
  btn.classList.remove('opacity-50');
  btn.disabled = false;
}
  
// Validacion desde php
    
function enviandoForm(e){
  
  e.preventDefault();
  e.stopPropagation();

  // const data = new FormData(formulario);

  // fetch('formulario.php', {
  //     method: 'POST',
  //     body: data
  // })
  
  // .then(res => res.json())
  // .then(datos => {
  
  // if(datos.error && datos.campo === 'nombre'){
  //   validando('El nombre completo es obligatorio', inputNombre.parentElement);
  //   inputNombre.focus()
  //   comprobarEmail()
  //   return
  // }

  // if(datos.error && datos.campo === 'telefono'){
  //   validando('El WhatsApp tiene algún valor errado', inputTelefono.parentElement);
  //   inputTelefono.focus()
  //   comprobarEmail()
  //   return
  // }
  // if(datos.error && datos.campo === 'email'){
  //   validando('El correo electrónico tiene algún caracter errado', inputEmail.parentElement);
  //   inputEmail.focus()
  //   comprobarEmail()
  //   return
  // }
  // if(datos.error && datos.campo === 'mensaje'){
  //   validando('El mensaje tiene algún valor errado', inputMensaje.parentElement);
  //   inputMensaje.focus()
  //   comprobarEmail()
  //   return
  // }
  // })

  // .catch( e => console.log(e))
  // mayzvrjd
  fetch("https://formspree.io/f/mayzvrjd", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre: email.nombre, telefono: email.telefono, email: email.email, mensaje: email.mensaje })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Formulario enviado exitosamente:", data);
      modal.classList.remove('oculto')
      speener.classList.remove('oculto')
      setTimeout(() =>{
        speener.classList.add('oculto');
        modalContent.classList.remove('oculto');
      }, 4000)

resetForm();
btn.disabled = true;
window.scrollTo(0,0);
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

btnReset.addEventListener('click', function(e){
  e.preventDefault();
  resetForm();
  inputNombre.focus();
})

function resetForm(){

  email.nombre = '';
  email.telefono = '';
  email.email = '';
  email.mensaje = '';

  formulario.reset();
  comprobarEmail();
}

function cerrarModal(){
  modal.classList.add('oculto');
  modalContent.classList.add('oculto');
  speener.classList.add('oculto');
  window.scrollTo(0,0);
};