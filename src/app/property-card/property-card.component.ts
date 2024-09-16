import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent implements AfterViewInit {

  ngAfterViewInit() {
    let mostrador = document.getElementById("mostrador") as HTMLElement;
    let seleccion = document.getElementById("seleccion") as HTMLElement;
    let imgSeleccionada = document.getElementById("img") as HTMLImageElement;
    let modeloSeleccionado = document.getElementById("modelo") as HTMLElement;
    let descripSeleccionada = document.getElementById("descripcion") as HTMLElement;
    let metrosCuadradosSeleccionado = document.getElementById("metros_cuadrados") as HTMLElement;
    let ubicacionSeleccionada = document.getElementById("ubicacion") as HTMLElement;
    let precioSeleccionado = document.getElementById("precio") as HTMLElement;

    const cargar = (item: HTMLElement) => {
      quitarBordes();
      mostrador.classList.add("reducido");
      seleccion.classList.add("visible");
      item.style.border = "2px solid red";

      // Obtener información del item desde atributos data-*
      const imgSrc = item.getAttribute('data-img-src') || '';
      const modelo = item.getAttribute('data-modelo') || '';
      const descripcion = item.getAttribute('data-descripcion') || '';
      const metrosCuadrados = item.getAttribute('data-metros') || '';
      const ubicacion = item.getAttribute('data-ubicacion') || '';
      const precio = item.getAttribute('precio') || '';

      imgSeleccionada.src = imgSrc;
      modeloSeleccionado.innerHTML = modelo;
      descripSeleccionada.innerHTML = descripcion;
      metrosCuadradosSeleccionado.innerHTML = `Metros cuadrados: ${metrosCuadrados}`;
      ubicacionSeleccionada.innerHTML = `Ubicación: ${ubicacion}`;
      precioSeleccionado.innerHTML = precio;
    };

    const cerrar = () => {
      mostrador.classList.remove("reducido");
      seleccion.classList.remove("visible");
      quitarBordes();
    };

    const quitarBordes = () => {
      const items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("style", "border: none;");
      }
    };

    const items = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', () => cargar(items[i] as HTMLElement));
    }

    const closeBtn = document.querySelector('.cerrar');
    if (closeBtn) {
      closeBtn.addEventListener('click', cerrar);
    }
  }

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/nav']); // Navega a la página principal
  }
  }