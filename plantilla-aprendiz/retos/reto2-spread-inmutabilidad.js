/**
 * RETO 2: Inmutabilidad con Spread Operator (...)
 * ADSO Ficha 3314621 - CADPH Garzón
 */

export function agregarAlCarritoInmutable(carritoOriginal, nuevoProducto) {
  // TODO: Retorna un NUEVO arreglo con nuevoProducto agregado al final sin usar .push()
  return [...carritoOriginal, nuevoProducto];
}

export function actualizarPerfilInmutable(estadoActual, cambios) {
  // TODO: Retorna un nuevo objeto combinando estadoActual y cambios sin mutar
  return {
    ...estadoActual,
    ...cambios,
    configuracion: {
      ...(estadoActual?.configuracion || {}),
      ...(cambios?.configuracion || {})
    }
  };
}

export function eliminarItemInmutable(items, idEliminar) {
  // TODO: Retorna un nuevo arreglo sin el item con ese id
  return items.filter(item => item.id !== idEliminar);
}

export function actualizarCantidadItem(items, id, nuevaCantidad) {
  // TODO: Retorna un nuevo arreglo actualizando únicamente la cantidad del item con ese id
  return items.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item);
}
