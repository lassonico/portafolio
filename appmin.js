function iniciarApp(){scrollNav(),navegacionScroll(),interaccionNav()}function scrollNav(){let e=document.querySelectorAll(".navegacion-principal a");e.forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();let t=e.target.attributes.href.value,a=document.querySelector(t);a.scrollIntoView({behavior:"smooth"})})})}function navegacionScroll(){let e=document.querySelector(".contenedor-nav"),t=document.querySelector(".portada"),a=document.querySelector(".up"),r=document.querySelector(".whatsapp");window.addEventListener("scroll",function o(){let n=t.getBoundingClientRect().bottom;scrollY>=70?e.classList.add("scroll"):e.classList.remove("scroll"),n<=761?a.classList.add("active"):a.classList.remove("active"),n<=-1700?r.classList.add("waths"):r.classList.remove("waths")}),a.addEventListener("click",function e(){window.scrollTo(0,0)})}function interaccionNav(){let e=document.querySelector(".contenedor-ham"),t=document.querySelector(".navegacion-principal"),a=document.querySelector("#ham"),r=document.querySelector("#x"),o=document.querySelectorAll(".navegacion-principal a");o.forEach(n=>{n.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("animationham"),a.classList.toggle("animationx"),r.classList.toggle("animationx"),o.forEach(e=>{e.classList.toggle("entrada_enlace")})})}),e.addEventListener("click",function n(){t.classList.toggle("active"),e.classList.toggle("animationham"),a.classList.toggle("animationx"),r.classList.toggle("animationx"),o.forEach(e=>{e.classList.toggle("entrada_enlace")})})}document.addEventListener("DOMContentLoaded",function(){iniciarApp()});const email={nombre:"",telefono:"",email:"",mensaje:""},formulario=document.querySelector("#formulario"),inputNombre=document.querySelector("#nombre"),inputTelefono=document.querySelector("#telefono"),inputEmail=document.querySelector("#email"),inputMensaje=document.querySelector("#mensaje"),btn=document.querySelector('#formulario button[type="submit"]'),btnReset=document.querySelector('#formulario button[type="reset"]'),modal=document.querySelector(".contenedor__modal"),modalContent=document.querySelector(".modal"),btnModal=document.querySelector(".cerrarModal"),btnAceptar=document.querySelector(".btn__aceptar"),speener=document.querySelector(".modal__speener");function validar(e){if([e.target.value].includes("")){validando(`El ${e.target.id} es obligatorio`,e.target.parentElement),email[e.target.name]="",comprobarEmail();return}if("telefono"===e.target.id&&!validarWpp(e.target.value)||"telefono"===e.target.id&&e.target.value.length>10){validando("El WhatsApp no es v\xe1lido",e.target.parentElement),email[e.target.name]="",inputTelefono.focus(),comprobarEmail();return}if("email"===e.target.id&&!validarEmail(e.target.value)){validando("El correo no es valido",e.target.parentElement),email[e.target.name]="",inputEmail.focus(),comprobarEmail();return}if("mensaje"===e.target.id&&inputMensaje.value.length<10){validando("El mensaje es invalido",e.target.parentElement),email[e.target.name]="",inputMensaje.focus(),comprobarEmail();return}limpiarAlerta(e.target.parentElement),email[e.target.name]=e.target.value.trim("").toLowerCase(),comprobarEmail()}inputNombre.addEventListener("input",validar),inputTelefono.addEventListener("input",validar),inputEmail.addEventListener("input",validar),inputMensaje.addEventListener("input",validar),formulario.addEventListener("submit",enviandoForm),btnModal.addEventListener("click",cerrarModal),btnAceptar.addEventListener("click",cerrarModal);const validando=(e,t)=>{limpiarAlerta(t);let a=document.createElement("P");a.textContent=e,a.classList.add("error"),t.appendChild(a)};function limpiarAlerta(e){let t=e.querySelector(".error");t&&t.remove()}function validarEmail(e){let t=/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(e);return t}function validarWpp(e){let t=/(\(?(\+57)\)?)?(3)(\d{9})/.test(e);return t}function comprobarEmail(){if(Object.values(email).includes("")){btn.classList.add("opacity-50");return}btn.classList.remove("opacity-50"),btn.disabled=!1}function enviandoForm(e){e.preventDefault(),e.stopPropagation(),fetch("https://formspree.io/f/mayzvrjd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:email.nombre,telefono:email.telefono,email:email.email,mensaje:email.mensaje})}).then(e=>e.json()).then(e=>{console.log("Formulario enviado exitosamente:",e),modal.classList.remove("oculto"),speener.classList.remove("oculto"),setTimeout(()=>{speener.classList.add("oculto"),modalContent.classList.remove("oculto")},4e3),resetForm(),btn.disabled=!0,window.scrollTo(0,0)}).catch(e=>{console.error("Error al enviar el formulario:",e)})}function resetForm(){email.nombre="",email.telefono="",email.email="",email.mensaje="",formulario.reset(),comprobarEmail()}function cerrarModal(){modal.classList.add("oculto"),modalContent.classList.add("oculto"),speener.classList.add("oculto"),window.scrollTo(0,0)}btnReset.addEventListener("click",function(e){e.preventDefault(),resetForm(),inputNombre.focus()});