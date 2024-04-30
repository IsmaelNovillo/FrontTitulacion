export interface CrearCliente{
    rucCliente: number;
    nomCliente: string;
    apelCliente: string;
    dirCliente: string;
    telCliente: number;
    mailCliente: string;

}

export interface ListarCliente{
    idcliente: number;
    rucCliente: number;
    nomCliente: string;
    apelCliente: string;
    dirCliente: string;
    telCliente: number;
    mailCliente: string;
    iduser: null;
    reservacionid: null;
}

export interface ActualizarCliente{
    rucCliente: number;
    nomCliente: string;
    apelCliente: string;
    dirCliente: string;
    telCliente: number;
    mailCliente: string;
}
