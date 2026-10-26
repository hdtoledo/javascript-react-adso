/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: ADSO Ficha 3314621
 * RETO 4: Dominio de .reduce() (Cálculo Financiero y Manejo de Estado Complejo)
 * ============================================================================
 * 
 * 💡 CONEXIÓN CON REACT:
 * El método .reduce() es la base conceptual directa de:
 * 1. useReducer(reducer, initialState): (state, action) => newState
 * 2. Cálculo de resúmenes de checkout: subtotal, descuentos, impuestos, total
 * 3. Agrupaciones para gráficos y dashboards administrativos
 */

/**
 * 4.1 Calcular el balance total de un carrito de compras con IVA y descuentos.
 * @param {Array} items - [{ id, nombre, precio, cantidad, descuentoPorcentaje }]
 * @param {Number} tasaIva - Porcentaje de IVA (ej: 0.19 para 19%)
 * @returns {Object} { subtotalBruto, totalDescuentos, baseGravable, ivaTotal, netoPagar, totalArticulos }
 */
export function calcularBalancePedido(items, tasaIva = 0.19) {
  // Inicializador del acumulador
  const inicial = {
    subtotalBruto: 0,
    totalDescuentos: 0,
    baseGravable: 0,
    ivaTotal: 0,
    netoPagar: 0,
    totalArticulos: 0
  };

  const acumulado = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio) || 0;
    const descPct = (Number(item.descuentoPorcentaje) || 0) / 100;

    const importeItem = precio * cantidad;
    const descuentoItem = importeItem * descPct;

    acc.subtotalBruto += importeItem;
    acc.totalDescuentos += descuentoItem;
    acc.totalArticulos += cantidad;

    return acc;
  }, inicial);

  acumulado.baseGravable = acumulado.subtotalBruto - acumulado.totalDescuentos;
  acumulado.ivaTotal = +(acumulado.baseGravable * tasaIva).toFixed(2);
  acumulado.netoPagar = +(acumulado.baseGravable + acumulado.ivaTotal).toFixed(2);
  acumulado.subtotalBruto = +(acumulado.subtotalBruto).toFixed(2);
  acumulado.totalDescuentos = +(acumulado.totalDescuentos).toFixed(2);
  acumulado.baseGravable = +(acumulado.baseGravable).toFixed(2);

  return acumulado;
}

/**
 * 4.2 Agrupar una lista plana de movimientos por tipo ("ingreso" | "egreso")
 * y calcular el saldo final neto.
 * @param {Array} movimientos - [{ id, descripcion, tipo, monto }]
 * @returns {Object} { ingresos: [], egresos: [], totalIngresos, totalEgresos, saldoNeto }
 */
export function procesarMovimientosCaja(movimientos) {
  return movimientos.reduce((acc, mov) => {
    const monto = Number(mov.monto) || 0;
    
    if (mov.tipo === "ingreso") {
      acc.ingresos.push(mov);
      acc.totalIngresos += monto;
      acc.saldoNeto += monto;
    } else if (mov.tipo === "egreso") {
      acc.egresos.push(mov);
      acc.totalEgresos += monto;
      acc.saldoNeto -= monto;
    }
    return acc;
  }, {
    ingresos: [],
    egresos: [],
    totalIngresos: 0,
    totalEgresos: 0,
    saldoNeto: 0
  });
}
