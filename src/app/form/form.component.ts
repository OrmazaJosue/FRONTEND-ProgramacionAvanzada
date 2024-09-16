import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RecaptchaModule } from 'ng-recaptcha';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { registrar } from '../servicios/registrar';
import { Cargar } from '../servicios/cargar';
import { NavComponent } from '../nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavComponent, HttpClientModule, RecaptchaModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [Cargar, registrar, FormBuilder],
})

export class FormComponent implements OnInit {
  form!: FormGroup;
  captchaResponse: string | null = null;
  siteKey = 'OUR_SITE_KEY_HERE';

  ciudadesPorProvincia: { [key: string]: string[] } = {
    // Definición de provincias y ciudades
    'Azuay': ['Cuenca', 'Gualaceo', 'Paute', 'Sígsig'],
    'Bolívar': ['Guaranda', 'San Miguel', 'Caluma', 'Chimbo'],
    'Cañar': ['Azogues', 'La Troncal', 'Cañar', 'Biblián'],
    'Carchi': ['Tulcán', 'San Gabriel', 'Huaca', 'Mira'],
    'Chimborazo': ['Riobamba', 'Guano', 'Alausí', 'Cumandá'],
    'Cotopaxi': ['Latacunga', 'La Maná', 'Salcedo', 'Pujilí'],
    'El Oro': ['Machala', 'Santa Rosa', 'Pasaje', 'Huaquillas'],
    'Esmeraldas': ['Esmeraldas', 'Quinindé', 'Atacames', 'Río Verde'],
    'Galápagos': ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Puerto Villamil'],
    'Guayas': ['Guayaquil', 'Durán', 'Milagro', 'Daule', 'Samborondón'],
    'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi', 'Atuntaqui'],
    'Loja': ['Loja', 'Catamayo', 'Cariamanga', 'Macará'],
    'Los Ríos': ['Babahoyo', 'Quevedo', 'Ventanas', 'Vinces'],
    'Manabí': ['Portoviejo', 'Manta', 'Chone', 'Jipijapa'],
    'Morona Santiago': ['Macas', 'Sucúa', 'Gualaquiza', 'Limón Indanza'],
    'Napo': ['Tena', 'Archidona', 'El Chaco', 'Baeza'],
    'Orellana': ['Francisco de Orellana', 'La Joya de los Sachas', 'Loreto'],
    'Pastaza': ['Puyo', 'Santa Clara', 'Arajuno', 'Mera'],
    'Pichincha': ['Quito', 'Sangolquí', 'Cayambe', 'Machachi'],
    'Santa Elena': ['Santa Elena', 'La Libertad', 'Salinas'],
    'Santo Domingo de los Tsáchilas': ['Santo Domingo'],
    'Sucumbíos': ['Nueva Loja', 'Shushufindi', 'Cascales', 'Gonzalo Pizarro'],
    'Tungurahua': ['Ambato', 'Baños', 'Pelileo', 'Píllaro'],
    'Zamora Chinchipe': ['Zamora', 'Yantzaza', 'Zumba', 'Guayzimi']
  };

  ciudadesDisponibles: string[] = [];
  estadoProvincias: string[] = Object.keys(this.ciudadesPorProvincia);
  tipoTerreno: string[] = [
    'TR001-Terreno Vista al Mar', 'TR002-Terreno Montañoso', 'TR003-Terreno Urbano', 'TR004-Terreno Rural',
    'TR005-Terreno Residencial', 'TR006-Terreno Comercial', 'TR007-Terreno Ecológico', 'TR008-Terreno Campestre', 'TR009-Terreno Industrial',
    'TR010-Terreno Histórico'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private registrar: registrar, // Servicio para registrar datos
    private cargar: Cargar, // Servicio para cargar datos
    private router: Router // Agrega el Router aquí
  ) {}

  solicitantes: any[] = []; // Declaración de la propiedad solicitantes
  
  ngOnInit(): void {
    this.buildForm();
    this.form?.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      console.log(value);
    });

    // Cargar todos los solicitantes
    this.cargar.getAllSolicitantes().subscribe(data => {
      this.solicitantes = data;
      console.log('Todos los solicitantes cargados:', this.solicitantes);
    });

    // Cargar ciudades basadas en la provincia seleccionada
    this.form.get('estadoProvincia')?.valueChanges.subscribe(provincia => {
      this.ciudadesDisponibles = this.ciudadesPorProvincia[provincia] || [];
      this.form.patchValue({ ciudad: '' });
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZÑñ ]+$'), this.minWordsValidator(2), Validators.maxLength(18)]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÑñ ]+$'), this.minWordsValidator(2), Validators.maxLength(36)]],
      fechaNacimiento: ['', [Validators.required, this.ageValidator]],
      numeroCedula: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$'), this.cedulaValidator()]],
      estadoCivil: ['', Validators.required],
      coloniaBarrio: ['', Validators.required],
      ciudad: ['', Validators.required],
      estadoProvincia: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      tipoTerreno: ['', Validators.required],
      documentosAdjuntos: ['', Validators.required]
    });
  }

  private minWordsValidator(minWords: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const words = control.value.trim().split(/\s+/);
      if (words.length < minWords) {
        return { minWords: { requiredWords: minWords, actualWords: words.length } };
      }
      return null;
    };
  }

  private cedulaValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const cedula = control.value;
      if (!cedula) {
        return null;
      }
      if (cedula.length !== 10) {
        return { cedulaInvalida: true };
      }
      const digits = cedula.split('').map(Number);
      const provinceCode = Number(cedula.substring(0, 2));
      const thirdDigit = Number(cedula[2]);
      if (provinceCode < 1 || provinceCode > 24 || thirdDigit >= 6) {
        return { cedulaInvalida: true };
      }
      const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      const verifierDigit = digits.pop();
      let sum = 0;
      for (let i = 0; i < coefficients.length; i++) {
        let product = digits[i] * coefficients[i];
        if (product >= 10) {
          product -= 9;
        }
        sum += product;
      }
      const computedVerifier = (10 - (sum % 10)) % 10;
      if (computedVerifier !== verifierDigit) {
        return { cedulaInvalida: true };
      }
      return null;
    };
  }

  private ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 ? null : { age: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const maxSizeMB = 10;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        this.form.get('documentosAdjuntos')?.setErrors({ maxSize: true });
        Swal.fire('Error', 'El archivo no debe superar los 10MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = btoa(e.target.result);
        this.form.patchValue({
          documentosAdjuntos: base64String
        });
      };
      reader.readAsBinaryString(file);
    }
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const formData = this.form.value;
      formData.fechaNacimiento = new Date(formData.fechaNacimiento).toISOString();

      Swal.fire({
        title: '¿Estás seguro?',
        text: "Estás a punto de enviar el formulario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, enviar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Enviando...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            }
          });

          axios.post('http://localhost:3001/api/formulario', formData)
            .then(response => {
              console.log('Formulario enviado con éxito', response);
              Swal.fire('Enviado!', 'El formulario ha sido enviado correctamente.', 'success').then(() => {
                // Redirige a la página del comprador después de que el usuario cierre el mensaje de éxito
                this.router.navigate(['/comprador']);
              });
            })
            .catch(error => {
              console.error('Error al enviar el formulario', error);
              console.error('Detalle del error:', error.response || error.message);
              Swal.fire('Error', 'No se pudo enviar el formulario', 'error');
            });
        }
      });
    } else {
      Swal.fire('Formulario inválido', 'Por favor, revisa los campos', 'error');
    }
  }
}
