/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: ADSO Ficha 3314621
 * RETO 1: Desestructuración Limpia y Valores por Defecto (Fundamentos de Props)
 * ============================================================================
 */

export function procesarPerfilUsuario(usuario) {
  // TODO: Usa desestructuración limpia para extraer:
  // - name renombrado a 'nombreCompleto'
  // - role renombrado a 'cargo' (si no viene, asignar por defecto "Aprendiz ADSO")
  // - email extraído de contacto.email (si no existe, "sin-correo@sena.edu.co")
  // - active renombrado a 'activo' (por defecto true)
  
  // Tu código aquí:
  const {
    name: nombreCompleto,
    role: cargo = "Aprendiz ADSO",
    contacto: { email: correo = "sin-correo@sena.edu.co" } = {},
    active: activo = true,
  } = usuario || {};

  return { nombreCompleto, cargo, correo, activo };
}

export function formatearTarjetaProducto({ id, titulo, precio = 0, stock = 0, categoria = "General" } = {}) {
  // TODO: Retorna un string con formato exacto:
  // "[#ID] TITULO - $PRECIO (Stock: STOCK unid.) - Categoria: CATEGORIA"
  return `[#${id}] ${titulo} - $${precio} (Stock: ${stock} unid.) - Categoria: ${categoria}`;
}

export function desempaquetarTupla(tuplaEstado) {
  // TODO: Usa desestructuración de arreglos y operador rest (...)
  // para obtener el primer elemento como 'principal', el segundo como 'secundario'
  // y todos los demás en un arreglo llamado 'resto'.
  const [principal, secundario, ...resto] = tuplaEstado || [];
  return { principal, secundario, resto };
}
