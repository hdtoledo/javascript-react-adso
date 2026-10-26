/**
 * ============================================================================
 * SENA CADPH Garzón - Centro Agroempresarial y Desarrollo Pecuario del Huila
 * Programa: ADSO Ficha 3314621
 * RETO 5: Pipeline Asíncrono, Promesas y Async/Await con Manejo de Errores
 * ============================================================================
 * 
 * 💡 CONEXIÓN CON REACT:
 * En React el 100% de la carga de datos (APIs REST/GraphQL) es asíncrona dentro de
 * useEffect() o hooks como useQuery(). Si no manejas try/catch y estados de error,
 * la aplicación se "rompe" en blanco para el usuario final.
 */

/**
 * Simulación de servicio backend con latencia y probabilidad controlada de fallo.
 * @param {Object} payload 
 * @param {Boolean} forzarError 
 * @returns {Promise<Object>}
 */
export function simularLlamadaApi(payload, { latenciaMs = 50, forzarError = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forzarError) {
        reject(new Error("500: Error interno en el microservicio SENA-Cloud"));
      } else {
        resolve({
          status: 200,
          timestamp: new Date().toISOString(),
          data: payload
        });
      }
    }, latenciaMs);
  });
}

/**
 * 5.1 Pipeline asíncrono con control de fallos y fallback seguro.
 * @param {Function} fetcherFn - Función que retorna una promesa
 * @param {Object} datosDefecto - Valor devuelto si la promesa falla
 * @returns {Promise<Object>} { exito: boolean, datos: any, error: string|null }
 */
export async function ejecutarPipelineSeguro(fetcherFn, datosDefecto = null) {
  try {
    const respuesta = await fetcherFn();
    return {
      exito: true,
      datos: respuesta?.data ?? respuesta,
      error: null
    };
  } catch (err) {
    return {
      exito: false,
      datos: datosDefecto,
      error: err.message || "Error desconocido en el pipeline"
    };
  }
}

/**
 * 5.2 Cargar múltiples fuentes de datos en paralelo usando Promise.allSettled()
 * @param {Array<Promise>} promesas - Arreglo de promesas
 * @returns {Promise<Object>} { exitosos: Array, fallidos: Array, tasaExito: Number }
 */
export async function sincronizarMultiplesFuentes(promesas) {
  const resultados = await Promise.allSettled(promesas);

  const exitosos = [];
  const fallidos = [];

  for (const res of resultados) {
    if (res.status === 'fulfilled') {
      exitosos.push(res.value);
    } else {
      fallidos.push(res.reason?.message || "Promesa rechazada");
    }
  }

  const total = resultados.length;
  const tasaExito = total > 0 ? +(exitosos.length / total).toFixed(2) : 0;

  return { exitosos, fallidos, tasaExito };
}
