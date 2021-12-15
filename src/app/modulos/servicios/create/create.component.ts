import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import Swal from 'sweetalert2';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private router: Router
   
  ) { }

  fgValidacion = this.fb.group({
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    encomienda: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
  });
  listadoClientes: ClienteModelo[] = []
  listadoEncomiendas: EncomiendaModelo[] = []
 
  store() {
    let servicios = new ServicioModelo();
    servicios.fecha = new Date(this.fgValidacion.controls["fecha"].value).toISOString();
    servicios.hora = this.fgValidacion.controls["hora"].value;
    servicios.valor = this.fgValidacion.controls["valor"].value;
    servicios.encomienda = this.fgValidacion.controls["encomienda"].value;
    servicios.origen = this.fgValidacion.controls["origen"].value;
    servicios.destino = this.fgValidacion.controls["destino"].value;
    
    this.servicioService.store(servicios).subscribe((data: ServicioModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  getAllClientes(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => {
      this.listadoClientes = data
      console.log(data)
    })
  }
  getAllEncomiendas(){
    this.encomiendaService.getAll().subscribe((data: EncomiendaModelo[]) => {
      this.listadoEncomiendas = data
      console.log(data)
    })
  }
  ngOnInit(): void {
    this.getAllClientes();
    this.getAllEncomiendas();
  }
}
