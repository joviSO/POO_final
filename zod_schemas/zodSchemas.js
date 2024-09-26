"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoInteracaoSchema = exports.conteudoSchema = exports.documentoSchema = exports.emailSchema = exports.apelidoSchema = exports.idSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("../utils");
const idSchema = zod_1.z.number().int().positive({ message: "ID deve ser um número" });
exports.idSchema = idSchema;
const apelidoSchema = zod_1.z.string().min(3, { message: "O apelido de ter pelo menos 3 caracteres" });
exports.apelidoSchema = apelidoSchema;
const emailSchema = zod_1.z.string().email({ message: "E-mail inválido" });
exports.emailSchema = emailSchema;
const documentoSchema = zod_1.z.string().length(11, { message: "CPF deve ter 11 dígitos" }).regex(/^\d{11}$/, { message: "Insira apenas os números" });
exports.documentoSchema = documentoSchema;
const conteudoSchema = zod_1.z.string().min(1, { message: "O conteúdo não pode estar vazio" });
exports.conteudoSchema = conteudoSchema;
const tipoInteracaoSchema = zod_1.z.nativeEnum(utils_1.TipoInteracao).refine(value => Object.values(utils_1.TipoInteracao).includes(value), {
    message: "\nInteração inválida. Escolha uma opção disponível",
});
exports.tipoInteracaoSchema = tipoInteracaoSchema;
