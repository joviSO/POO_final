import {z} from "zod";
import { TipoInteracao } from "../utils";



const idSchema = z.number().int().positive({message: "ID deve ser um número"});

const apelidoSchema = z.string().min(3, {message: "O apelido de ter pelo menos 3 caracteres"});

const emailSchema = z.string().email({message: "E-mail inválido"});

const documentoSchema = z.string().length(11, {message: "CPF deve ter 11 dígitos"}).regex(/^\d{11}$/, {message: "Insira apenas os números"});

const conteudoSchema = z. string().min(1, {message: "O conteúdo não pode estar vazio"});

const tipoInteracaoSchema = z.nativeEnum(TipoInteracao).refine(value => Object.values(TipoInteracao).includes(value), {
    message: "\nInteração inválida. Escolha uma opção disponível",
});



export {idSchema, apelidoSchema, emailSchema, documentoSchema, conteudoSchema, tipoInteracaoSchema};