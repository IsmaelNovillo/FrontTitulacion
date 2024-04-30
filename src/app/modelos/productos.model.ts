export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    contacto: string;
    imagenUrl?: string;
    
    cantidadAgregar?: number; // Nuevo campo para la cantidad a agregar al carrito
  }
  export interface AgregarProducto{
    nomproducto: string;
    precioproducto: number;
    stockproducto: number;

  }
  export interface TodosLosProductos{
    id: number;
    nomproducto: string;
    precioproducto: number;
    stockproducto: number;
    cantidadAgregar?: number; 

  }
  export interface CrearDetalleProdcuto{
    descripcion: string;
    disponibilidad: number;

  }
  export interface ListarDetalleProducto{
    id: number;
    descripcion: string;
    disponibilidad: number;
    idproducto: string;

  }

  export interface ActualizarDetalleProducto{
    descripcion: string;
    disponibilidad: number;
  }


    
    //
    //categoria: string;
    //contacto: string;
    //imagenUrl?: string;
  