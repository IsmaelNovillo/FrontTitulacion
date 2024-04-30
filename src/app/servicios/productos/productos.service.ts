// producto.service.ts
import {  Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, shareReplay, switchMap, throwError } from 'rxjs';
import { ActualizarDetalleProducto, AgregarProducto, CrearDetalleProdcuto, ListarDetalleProducto, Producto, TodosLosProductos } from '../../modelos/productos.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private urlAgregar = 'http://localhost:8080/api/v1/producto/crear';
  private urlListar = 'http://localhost:8080/api/v1/producto/listar';
  private urlActualizar = 'http://localhost:8080/api/v1/producto/';
  private urlMisProductos= 'http://localhost:8080/api/v1/producto/';
  private urlBorrar= 'http://localhost:8080/api/v1/producto/';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,

    
    ){}

  private productos: Producto[] = [
    { id: 1, nombre: 'Play Station 5', precio: 1500, descripcion:'esta consola de juego es una de las mejores', contacto: '0995877471', imagenUrl: 'https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-O.webp'  },
      { id: 2, nombre: 'Iphone 15 pro max', precio: 2080, descripcion:'este celular es poderoso y costoso', contacto:'0995877417', imagenUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-offers-more-ways-to-order-the-new-lineups/geo/Apple-iPhone-15-lineup-pink-geo_inline.jpg.large.jpg' },
      { id: 3, nombre: 'Laptop HP', precio: 670, descripcion: 'Intel core 5 procesador de utilma generacion', contacto: '0995877417', imagenUrl: 'https://unitystores.vtexassets.com/arquivos/ids/168300-800-800?v=637485902487430000&width=800&height=800&aspect=true'},
      { id: 4, nombre: 'Tv Samsung 84`', precio: 1500, descripcion:'Imagen 4k y efectos nanoimagen', contacto: '0995877471', imagenUrl: 'https://www.computron.com.ec/wp-content/uploads/2023/01/UN55AU7000PCZE-768x768.jpg' },
      { id: 5, nombre: 'Lavadora Lg Smart Invert', precio: 780, descripcion:'18 kilogramos de resistencia', contacto:'0995877417', imagenUrl:'https://electromegaecuador.com/4026-large_default/combo-lavadora-secadora-electrica-lg-18-kgs-inverter-color-gris.jpg'},
      { id: 6, nombre: 'Barra de Sonido Sony', precio: 670, descripcion: 'Sonido 360 perfect', contacto: '0995877417', imagenUrl: 'https://www.sony.com.ec/image/7fc14e756300807519fde2f4c9996b9f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'},
      { id: 7, nombre: 'Play Station 5', precio: 1500, descripcion:'esta consola de juego es una de las mejores', contacto: '0995877471', imagenUrl: 'https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-O.webp'  },
      { id: 8, nombre: 'Iphone 15 pro max', precio: 2080, descripcion:'este celular es poderoso y costoso', contacto:'0995877417', imagenUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-offers-more-ways-to-order-the-new-lineups/geo/Apple-iPhone-15-lineup-pink-geo_inline.jpg.large.jpg' },
      { id: 9, nombre: 'Laptop HP', precio: 670, descripcion: 'Intel core 5 procesador de utilma generacion', contacto: '0995877417', imagenUrl: 'https://unitystores.vtexassets.com/arquivos/ids/168300-800-800?v=637485902487430000&width=800&height=800&aspect=true'},
      { id: 10, nombre: 'Tv Samsung 84`', precio: 1500, descripcion:'Imagen 4k y efectos nanoimagen', contacto: '0995877471', imagenUrl: 'https://www.computron.com.ec/wp-content/uploads/2023/01/UN55AU7000PCZE-768x768.jpg' },
      { id: 11, nombre: 'Lavadora Lg Smart Invert', precio: 780, descripcion:'18 kilogramos de resistencia', contacto:'0995877417', imagenUrl:'https://electromegaecuador.com/4026-large_default/combo-lavadora-secadora-electrica-lg-18-kgs-inverter-color-gris.jpg'},
      { id: 12, nombre: 'Barra de Sonido Sony', precio: 670, descripcion: 'Sonido 360 perfect', contacto: '0995877417', imagenUrl: 'https://www.sony.com.ec/image/7fc14e756300807519fde2f4c9996b9f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'},
      { id: 13, nombre: 'Play Station 5', precio: 1500, descripcion:'esta consola de juego es una de las mejores', contacto: '0995877471', imagenUrl: 'https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-O.webp'  },
      { id: 14, nombre: 'Iphone 15 pro max', precio: 2080, descripcion:'este celular es poderoso y costoso', contacto:'0995877417', imagenUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-offers-more-ways-to-order-the-new-lineups/geo/Apple-iPhone-15-lineup-pink-geo_inline.jpg.large.jpg' },
      { id: 15, nombre: 'Laptop HP', precio: 670, descripcion: 'Intel core 5 procesador de utilma generacion', contacto: '0995877417', imagenUrl: 'https://unitystores.vtexassets.com/arquivos/ids/168300-800-800?v=637485902487430000&width=800&height=800&aspect=true'},
      { id: 16, nombre: 'Tv Samsung 84`', precio: 1500, descripcion:'Imagen 4k y efectos nanoimagen', contacto: '0995877471', imagenUrl: 'https://www.computron.com.ec/wp-content/uploads/2023/01/UN55AU7000PCZE-768x768.jpg' },
      { id: 16, nombre: 'Lavadora Lg Smart Invert', precio: 780, descripcion:'18 kilogramos de resistencia', contacto:'0995877417', imagenUrl:'https://electromegaecuador.com/4026-large_default/combo-lavadora-secadora-electrica-lg-18-kgs-inverter-color-gris.jpg'},
      { id: 17, nombre: 'Barra de Sonido Sony', precio: 670, descripcion: 'Sonido 360 perfect', contacto: '0995877417', imagenUrl: 'https://www.sony.com.ec/image/7fc14e756300807519fde2f4c9996b9f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'},
      { id: 18, nombre: 'Play Station 5', precio: 1500, descripcion:'esta consola de juego es una de las mejores', contacto: '0995877471', imagenUrl: 'https://http2.mlstatic.com/D_NQ_NP_841787-MLA44484414455_012021-O.webp'  },
      { id: 19, nombre: 'Iphone 15 pro max', precio: 2080, descripcion:'este celular es poderoso y costoso', contacto:'0995877417', imagenUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-offers-more-ways-to-order-the-new-lineups/geo/Apple-iPhone-15-lineup-pink-geo_inline.jpg.large.jpg' },
      { id: 20, nombre: 'Laptop HP', precio: 670, descripcion: 'Intel core 5 procesador de utilma generacion', contacto: '0995877417', imagenUrl: 'https://unitystores.vtexassets.com/arquivos/ids/168300-800-800?v=637485902487430000&width=800&height=800&aspect=true'},
      { id: 21, nombre: 'Tv Samsung 84`', precio: 1500, descripcion:'Imagen 4k y efectos nanoimagen', contacto: '0995877471', imagenUrl: 'https://www.computron.com.ec/wp-content/uploads/2023/01/UN55AU7000PCZE-768x768.jpg' },
      { id: 22, nombre: 'Lavadora Lg Smart Invert', precio: 780, descripcion:'18 kilogramos de resistencia', contacto:'0995877417', imagenUrl:'https://electromegaecuador.com/4026-large_default/combo-lavadora-secadora-electrica-lg-18-kgs-inverter-color-gris.jpg'},
      { id: 23, nombre: 'Barra de Sonido Sony', precio: 670, descripcion: 'Sonido 360 perfect', contacto: '0995877417', imagenUrl: 'https://www.sony.com.ec/image/7fc14e756300807519fde2f4c9996b9f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'},
  
  ];

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }

  //Nuevos Metodos para Agregar Productos consumiendo el servicio del backend
  creadorProducto(producto: AgregarProducto): Observable<AgregarProducto> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<AgregarProducto>(`${this.urlAgregar}`, producto, { headers });
  }

  listandoProductos(): Observable <TodosLosProductos[]> {

    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
     return this.http.get<TodosLosProductos[]>(this.urlListar,  { headers });
  } 

  identificador:number;

  misProductos(): Observable <TodosLosProductos> {
    
    return this.loginService.obtenerIdentificador().pipe(
      catchError(error => {
        console.error('Error al obtener el identificador de la empresa:', error);
        return throwError(error);
      }),
      switchMap(identidad => {
        this.identificador = identidad;
        return this.obteniendoMisProductos();
      })
    );
  }
  obteniendoMisProductos(): Observable<TodosLosProductos> {
     // Obtenemos el token de autenticación
     const token = this.obtenerToken();

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     });
    return this.http.get<TodosLosProductos>(`${this.urlListar}/${this.identificador,  { headers }}`).pipe(
      catchError(error => {
        console.error('Error al obtener la empresa:', error);
        return throwError(error);
      })
    );
  }
  

  //Metodos para actualizar productos
 private idProductoActualizando = new
 BehaviorSubject<number>(0);
// se  enviara el Identificador adquirido al registro del usuario 
 enviarIdentificador(dato: number): void{
   this.idProductoActualizando.next(dato);
 }
//recibe el Identificador adquierido en Registro 
 obtenerIdentificador(): Observable<number>{
   return this.idProductoActualizando.asObservable();  
 }

  actualizarProductos(actualProduc: AgregarProducto): Observable <AgregarProducto>{
     // Obtenemos el token de autenticación
     const token = this.obtenerToken();

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     });
    
    const idProducto = this.idProductoActualizando.value;
    return this.http.put<AgregarProducto>(`${this.urlActualizar}${idProducto}`, actualProduc, {headers} );
  }

  
    borrarProducto(id: number): Observable<string> {

      // Obtenemos el token de autenticación
     const token = this.obtenerToken();

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     });
    
      const url = `${this.urlBorrar}${id}`;
      return this.http.delete(url, {headers, observe: 'response' }).pipe(
        map((response: HttpResponse <any>) => {
          // Aquí puedes manejar la respuesta como desees
          if (response.status === 200) {
            // El producto se eliminó exitosamente
            return 'Producto eliminado exitosamente';
      
          } else {
            // Manejar otros casos según sea necesario
            return 'Error al eliminar el producto';
          }
        }),
        catchError((error: any) => {
          // Manejo de errores
          console.error('Error al eliminar el producto:', error);
          return throwError('Error al eliminar el producto');
        })
      );
    }

  
  //Fin de Nuevos metodos, los demas metodos toca actualizar parra que se adapten al consumo de servicios

  //Los productos y servicios de muestras permanecen al momento por temas de presentacion de diseno

 

  private productosSubject = new BehaviorSubject<Producto[]>(this.productos);
  productos$ = this.productosSubject.asObservable().pipe(shareReplay(1));
  

  registrarProducto(producto: Producto): void {
    const productos = this.productosSubject.value;
    this.productosSubject.next([...productos, producto]);
  }
  
  buscarProductos(terminoBusqueda: string): Producto[] {
    if (!terminoBusqueda.trim()) {
      // si no hay término de búsqueda, devuelve la lista completa de productos.
      return this.productos;
    }
    // Convierte el término de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas.
    const terminoBusquedaEnMinusculas = terminoBusqueda.toLowerCase();
    // Filtra la lista de productos basándose en el término de búsqueda.
    return this.productos.filter(producto => producto.nombre.toLowerCase().includes(terminoBusquedaEnMinusculas));
  } 
  

  private _refreshNeeded = new Subject<void>();
  refreshNeeded$ = this._refreshNeeded.asObservable();

  cargarProductos(): void {
    setTimeout(() => {
      const productos: Producto[] = [
        // ... tus productos
     
      ];//por modificarse es temporal
      this.productosSubject.next(productos); //por modificarse es temporal
      this._refreshNeeded.next();
    }, 1000);
  }
  
  private resultadosBusqueda = new BehaviorSubject<Producto[]>([]);

  almacenarResultadosBusqueda(resultados: Producto[]): void {
    this.resultadosBusqueda.next(resultados);
  }
  
  obtenerResultadosBusqueda(): Observable<Producto[]> {
    return this.resultadosBusqueda.asObservable();

  }
}

//Esta parte contiene un servicio por separado el cual es para detalles del producto

@Injectable({
  providedIn: 'root',
})
export class DetalleProducto {

  private urlCrear='http://localhost:8080/api/v1/reproductively/crear';
  private urlListar= 'http://localhost:8080/api/v1/reproductively/listar';
  private urlID='http://localhost:8080/api/v1/reproductively/'
  private urlActualizar= 'http://localhost:8080/api/v1/reproductively/';


  constructor(
    private http: HttpClient,

  ) { }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }


  // Método para obtener todos los datos
  obtenerDetalleProductos(): Observable<ListarDetalleProducto[]> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListarDetalleProducto[]>(this.urlListar, {headers});
  }

  // Método para obtener un solo dato por ID
  obteniendoDetalleProducto(id: number): Observable<Object> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.urlID}${id}`, {headers});
  }

  // Método para crear un nuevo dato
  crearDetalleProducto(nuevoDetalleP: CrearDetalleProdcuto): Observable<CrearDetalleProdcuto> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<CrearDetalleProdcuto>(this.urlCrear, nuevoDetalleP, {headers});
  }

  // Método para actualizar un dato existente
  actualizarDetalleProducto(id: number, detalleProducto: ActualizarDetalleProducto): Observable<ActualizarDetalleProducto> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ActualizarDetalleProducto>(`${this.urlActualizar}${id}`, detalleProducto, {headers});
  }

  // Método para eliminar un dato
  borrarDetalleProducto(id: number): Observable<Object> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.urlID}${id}`, {headers});
  } 



}