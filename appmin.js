document.addEventListener("DOMContentLoaded",function(){!function e(){let t=document.querySelector(".contenedor-nav"),o=document.querySelector(".portada"),r=document.querySelector(".up"),a=document.querySelector(".whatsapp");window.addEventListener("scroll",function e(){let n=o.getBoundingClientRect().bottom;n<651&&(t.classList.add("scroll"),r.classList.add("active")),n>=651&&(t.classList.remove("scroll"),r.classList.remove("active")),n<=-1700?a.classList.add("waths"):a.classList.remove("waths")}),r.addEventListener("click",function e(){window.scrollTo(0,0)})}(),!function e(){let t=document.querySelector(".contenedor-nav"),o=document.querySelector(".contenedor-ham"),r=document.querySelector(".navegacion-principal"),a=document.querySelector("#ham"),n=document.querySelector("#x"),l=document.querySelectorAll(".navegacion-principal a");l.forEach(e=>{e.addEventListener("click",()=>{r.classList.toggle("active"),o.classList.toggle("animationham"),a.classList.toggle("animationx"),n.classList.toggle("animationx"),t.classList.remove("scroll")})}),o.addEventListener("click",function e(){r.classList.toggle("active"),t.classList.remove("scroll"),o.classList.toggle("animationham"),a.classList.toggle("animationx"),n.classList.toggle("animationx")})}();let e={nombre:"",telefono:"",email:"",mensaje:""},t=document.querySelector("#formulario"),o=document.querySelector("#nombre"),r=document.querySelector("#telefono"),a=document.querySelector("#email"),n=document.querySelector("#mensaje"),l=document.querySelector('#formulario button[type="submit"]'),s=document.querySelector('#formulario button[type="reset"]'),i=document.querySelector(".contenedor__modal"),c=document.querySelector(".modal"),u=document.querySelector(".cerrarModal"),d=document.querySelector(".btn__aceptar"),m=document.querySelector(".modal__speener");function g(t){if([t.target.value].includes("")){v(`El ${t.target.id} es obligatorio`,t.target.parentElement),e[t.target.name]="",L();return}if("telefono"===t.target.id&&!function e(t){let o=/(\(?(\+57)\)?)?(3)(\d{9})/.test(t);return o}(t.target.value)||"telefono"===t.target.id&&t.target.value.length>10){v("El WhatsApp no es v\xe1lido",t.target.parentElement),e[t.target.name]="",r.focus(),L();return}if("email"===t.target.id&&!function e(t){let o=/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(t);return o}(t.target.value)){v("El correo no es valido",t.target.parentElement),e[t.target.name]="",a.focus(),L();return}if("mensaje"===t.target.id&&n.value.length<10){v("El mensaje es invalido",t.target.parentElement),e[t.target.name]="",n.focus(),L();return}f(t.target.parentElement),e[t.target.name]=t.target.value.trim("").toLowerCase(),L()}o.addEventListener("input",g),r.addEventListener("input",g),a.addEventListener("input",g),n.addEventListener("input",g),t.addEventListener("submit",function t(o){o.preventDefault(),o.stopPropagation(),fetch("https://formspree.io/f/mayzvrjd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:e.nombre,telefono:e.telefono,email:e.email,mensaje:e.mensaje})}).then(e=>e.json()).then(e=>{console.log("Formulario enviado exitosamente:",e),i.classList.remove("oculto"),m.classList.remove("oculto"),setTimeout(()=>{m.classList.add("oculto"),c.classList.remove("oculto")},4e3),p(),l.disabled=!0,window.scrollTo(0,0)}).catch(e=>{console.error("Error al enviar el formulario:",e)})}),u.addEventListener("click",y),d.addEventListener("click",y);let v=(e,t)=>{f(t);let o=document.createElement("P");o.textContent=e,o.classList.add("error"),t.appendChild(o)};function f(e){let t=e.querySelector(".error");t&&t.remove()}function L(){if(Object.values(e).includes("")){l.classList.add("opacity-50");return}l.classList.remove("opacity-50"),l.disabled=!1}function p(){e.nombre="",e.telefono="",e.email="",e.mensaje="",t.reset(),L()}function y(){i.classList.add("oculto"),c.classList.add("oculto"),m.classList.add("oculto"),window.scrollTo(0,0)}s.addEventListener("click",function(e){e.preventDefault(),p(),o.focus()})});