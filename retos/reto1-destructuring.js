/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: Tecnólogo en Análisis y Desarrollo de Software (ADSO) - Ficha 3314621
 * RETO 1: Desestructuración Limpia y Valores por Defecto (Fundamentos de Props)
 * ============================================================================
 * 
 * 💡 CONEXIÓN CON REACT:
 * En React, los componentes reciben "props" en un solo objeto. La forma estándar
 * de consumirlas es desestructurando en el encabezado de la función:
 * function PerfilUsuario({ nombre, rol = "Invitado", contacto: { email } }) { ... }
 */

/**
 * 1.1 Extraer datos de perfil de usuario con renombrado y valores por defecto.
 * @param {Object} usuario - Objeto con datos del aprendiz
 * @returns {Object} Objeto normalizado con { nombreCompleto, cargo, correo, activo }
 */
export function procesarPerfilUsuario(usuario) {
  // TODO: Usa desestructuración para extraer:
  // - name renombrado a 'nombreCompleto'
  // - role renombrado a 'cargo' (si no viene, asignar por defecto "Aprendiz ADSO")
  // - email extraído de la propiedad anidada contacto.email (si no existe, "sin-correo@sena.edu.co")
  // - active renombrado a 'activo' (por defecto true)
  
  const {
    name: nombreCompleto,
    role: cargo = "Aprendiz ADSO",
    contacto: { email: correo = "sin-correo@sena.edu.co" } = {},
    active: activo = true,
  } = usuario || {};

  return { nombreCompleto, cargo, correo, activo };
}

/**
 * 1.2 Simular extracción de props en un componente de producto.
 * @param {Object} props - Props estilo React
 * @returns {String} Frase formateada
 */
export function formatearTarjetaProducto({ id, titulo, precio = 0, stock = 0, categoria = "General" } = {}) {
  // TODO: Retorna un string con formato exacto:
  // "[#ID] TITULO - $PRECIO (Stock: STOCK unid.) - Categoria: CATEGORIA"
  return `[#${id}] ${titulo} - $${precio} (Stock: ${stock} unid.) - Categoria: ${categoria}`;
}

/**
 * 1.3 Desestructurar el primer y segundo elemento de un arreglo de coordenadas/estados
 * @param {Array} tuplaEstado - Arreglo estilo [valor, setValor] o [latitud, longitud, ciudad]
 * @returns {Object} { principal, secundario, resto }
 */
export function desempaquetarTupla(tuplaEstado) {
  // TODO: Usa desestructuración de arreglos y operador rest (...)
  // para obtener el primer elemento como 'principal', el segundo como 'secundario'
  // y todos los demás en un arreglo llamado 'resto'.
  const [principal, secundario, ...resto] = tuplaEstado || [];
  return { principal, secundario, resto };
}
