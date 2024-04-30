export interface CrearEmpresa {

    nomepresa: string;
    dirempresa: string;
    ciudadempresa: string;
    paisempresa: string;
}
export interface ListarEmpresas{
    idempresa: number;
    nomepresa: string;
    dirempresa: string;
    ciudadempresa: string;
    paisempresa: string;
    proveedor: any[]; 
}

export interface ActualizarEmpresa {

    nomepresa: string;
    dirempresa: string;
    ciudadempresa: string;
    paisempresa: string;
}

export interface MiEmpresa{
    idempresa: number;
    nomepresa: string;
    dirempresa: string;
    ciudadempresa: string;
    paisempresa: string;
    proveedor:{
        id: number;
        idempresa: number;
        nomproveedor: string;
        telefproveedor: number;
        correoproveedor: string;
        direccionproveedor: string;
        ciuproveedor: string;
        paisproveedor: string;
     }[];
}


