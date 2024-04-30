export interface LoginInterface {
    username: string;
    password: string;
     // Nuevo campo para la cantidad a agregar al carrito
  }

export interface RespuestaLogin{
    Message: string;
    Username: string;
    token: string;
} 

export interface ResetModelo{
    email: string;
    password: string;
}
export interface RespuestaReset{
    mensaje: string;
}
