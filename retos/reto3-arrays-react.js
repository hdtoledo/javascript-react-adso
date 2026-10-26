/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: ADSO Ficha 3314621
 * RETO 3: Métodos de Arreglo Puros (.map, .filter) y Proyección a UI
 * ============================================================================
 * 
 * 💡 CONEXIÓN CON REACT:
 * En React no usamos ciclos "for" tradicionales en el template JSX.
 * Usamos .map() para iterar listas y renderizar componentes:
 * {productos.map(prod => <Card key={prod.id} {...prod} />)}
 * Y .filter() para búsqueda y filtrado dinámico en tiempo real.
 */

/**
 * 3.1 Transformar una lista de aprendices en formato de tarjeta lista para UI.
 * @param {Array} aprendices - Lista de objetos de aprendices
 * @returns {Array} Lista con { key, titulo, badgeEstado, tieneSubsidio }
 */
export function generarTarjetasAprendices(aprendices) {
  // TODO: Con .map() proyecta cada aprendiz a la estructura requerida:
  // - key: id
  // - titulo: "APELLIDO, NOMBRE" (en mayúsculas)
  // - badgeEstado: promedio >= 3.5 ? "Aprobado" : "En Plan de Mejoramiento"
  // - tieneSubsidio: booleano (true si estrato <= 2 y promedio >= 3.8)
  return aprendices.map(ap => ({
    key: ap.id,
    titulo: `${ap.apellido?.toUpperCase() || ''}, ${ap.nombre?.toUpperCase() || ''}`,
    badgeEstado: ap.promedio >= 3.5 ? "Aprobado" : "En Plan de Mejoramiento",
    tieneSubsidio: Boolean(ap.estrato <= 2 && ap.promedio >= 3.8)
  }));
}

/**
 * 3.2 Filtrar productos de acuerdo a término de búsqueda, categoría y disponibilidad.
 * @param {Array} inventario - Arreglo de productos [{ id, nombre, categoria, stock, precio }]
 * @param {Object} filtros - { busqueda: string, categoria: string, soloDisponibles: boolean }
 * @returns {Array} Arreglo filtrado
 */
export function filtrarCatalogo(inventario, { busqueda = "", categoria = "todas", soloDisponibles = false } = {}) {
  const query = busqueda.trim().toLowerCase();
  
  return inventario.filter(prod => {
    // Coincidencia con nombre (ignora mayúsculas/minúsculas)
    const coincideTexto = !query || prod.nombre.toLowerCase().includes(query);
    
    // Coincidencia con categoría (si es "todas", pasa cualquiera)
    const coincideCat = categoria === "todas" || prod.categoria.toLowerCase() === categoria.toLowerCase();
    
    // Coincidencia con disponibilidad (stock > 0 si soloDisponibles es true)
    const coincideStock = !soloDisponibles || prod.stock > 0;

    return coincideTexto && coincideCat && coincideStock;
  });
}

/**
 * 3.3 Extraer una lista única de categorías disponibles para alimentar un <select> de React.
 * @param {Array} productos - Lista de productos
 * @returns {Array} Lista de strings ordenados alfabéticamente sin duplicados
 */
export function obtenerCategoriasUnicas(productos) {
  const categorias = productos.map(p => p.categoria);
  // Usa Set para remover duplicados y sort() para ordenar
  return [...new Set(categorias)].sort((a, b) => a.localeCompare(b));
}
