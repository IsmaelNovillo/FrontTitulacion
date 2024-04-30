
export interface Usuario{
   
    username: string;
    email: string;
    password: string;
    rol: Set<string>;
}
export interface Rol{
id?: number;
rol: string;
}


export interface RespuestaRegistro{
    id: number;
    email: string;
    username: string;
    password: string;
    rol: { id: number; rol: string };
    idplan:  null;
    idproducto: null;
}

export interface RespuestaCorreo{
    mensaje: string;
}