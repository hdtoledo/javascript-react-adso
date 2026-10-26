/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: ADSO Ficha 3314621
 * RETO 2: Inmutabilidad con Spread Operator (...) (El Corazón de useState)
 * ============================================================================
 * 
 * 💡 CONEXIÓN CON REACT:
 * En React NUNCA debes mutar el estado directamente:
 * ❌ state.push(nuevoItem) // REACT NO RE-RENDERIZARÁ
 * ❌ state.usuario.nombre = "Pedro" // REACT NO DETECTA EL CAMBIO
 * ✔️ setState([...state, nuevoItem]) // NUEVA REFERENCIA EN MEMORIA
 * ✔️ setState({ ...state, usuario: { ...state.usuario, nombre: "Pedro" } })
 */

/**
 * 2.1 Agregar un nuevo producto al carrito de compras sin mutar el arreglo original.
 * @param {Array} carritoOriginal - Arreglo original de items
 * @param {Object} nuevoProducto - Producto a agregar
 * @returns {Array} Nuevo arreglo con el producto al final
 */
export function agregarAlCarritoInmutable(carritoOriginal, nuevoProducto) {
  // REGLA: No uses .push() ni alteres carritoOriginal. Retorna una nueva referencia.
  return [...carritoOriginal, nuevoProducto];
}

/**
 * 2.2 Actualizar el perfil del usuario modificando solo los campos requeridos
 * y manteniendo el resto intacto (incluyendo anidados si corresponde).
 * @param {Object} estadoActual - Objeto de estado actual del usuario
 * @param {Object} cambios - Nuevos valores
 * @returns {Object} Nuevo objeto actualizado inmutablemente
 */
export function actualizarPerfilInmutable(estadoActual, cambios) {
  // REGLA: Retorna un nuevo objeto con las propiedades previas + cambios aplicados.
  return {
    ...estadoActual,
    ...cambios,
    configuracion: {
      ...(estadoActual?.configuracion || {}),
      ...(cambios?.configuracion || {})
    }
  };
}

/**
 * 2.3 Eliminar un producto del carrito por su ID sin usar splice ni mutar el arreglo.
 * @param {Array} items - Arreglo de items
 * @param {Number|String} idEliminar - ID del elemento a remover
 * @returns {Array} Nuevo arreglo filtrado
 */
export function eliminarItemInmutable(items, idEliminar) {
  // Retorna un nuevo arreglo sin el item con ese id
  return items.filter(item => item.id !== idEliminar);
}

/**
 * 2.4 Actualizar la cantidad de un producto específico dentro del arreglo de forma inmutable.
 * @param {Array} items - Arreglo de productos [{ id, nombre, cantidad }]
 * @param {Number|String} id - ID del item a modificar
 * @param {Number} nuevaCantidad - Nuevo valor de cantidad
 * @returns {Array} Arreglo con la referencia cambiada
 */
export function actualizarCantidadItem(items, id, nuevaCantidad) {
  // Retorna un nuevo arreglo mapeando los items y clonando el que coincide con el id
  return items.map(item => {
    if (item.id === id) {
      return { ...item, cantidad: nuevaCantidad };
    }
    return item;
  });
}
