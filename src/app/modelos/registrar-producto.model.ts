// producto.model.ts
export interface RegistarProducto {
    id?: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    contacto: string;
    imagenUrl?: string;
    
  }