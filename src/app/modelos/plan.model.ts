export interface CrearPlanRegistro{

    descripccion: string;
    nomplan: string;
    costo: number;
    requisitosplan: string;

}
export interface ListarPlanRegistro{
    idplan: number;
    descripccion: string;
    nomplan: string;
    costo: number;
    requisitosplan: string;

}

export interface ActualizarPlanRegistro{
    idplan: number;
    descripccion: string;
    nomplan: string;
    costo: number;
    requisitosplan: string;

}