import test from 'node:test';
import assert from 'node:assert/strict';

import {
  procesarPerfilUsuario,
  formatearTarjetaProducto,
  desempaquetarTupla
} from '../retos/reto1-destructuring.js';

import {
  agregarAlCarritoInmutable,
  actualizarPerfilInmutable,
  eliminarItemInmutable,
  actualizarCantidadItem
} from '../retos/reto2-spread-inmutabilidad.js';

import {
  generarTarjetasAprendices,
  filtrarCatalogo,
  obtenerCategoriasUnicas
} from '../retos/reto3-arrays-react.js';

import {
  calcularBalancePedido,
  procesarMovimientosCaja
} from '../retos/reto4-reduce-inventario.js';

import {
  simularLlamadaApi,
  ejecutarPipelineSeguro,
  sincronizarMultiplesFuentes
} from '../retos/reto5-asincronia-pipeline.js';

test('🟢 RETO 1: Desestructuración y Props', async (t) => {
  await t.test('1.1 Normalización de perfil con renombramiento y valores por defecto', () => {
    const usuarioMock = {
      name: 'Carlos Dussán',
      contacto: { email: 'cdussan@sena.edu.co' }
    };
    const res = procesarPerfilUsuario(usuarioMock);
    assert.equal(res.nombreCompleto, 'Carlos Dussán');
    assert.equal(res.cargo, 'Aprendiz ADSO'); // Valor por defecto
    assert.equal(res.correo, 'cdussan@sena.edu.co');
    assert.equal(res.activo, true);
  });

  await t.test('1.2 Formatear props de tarjeta de producto', () => {
    const texto = formatearTarjetaProducto({
      id: 101,
      titulo: 'Mouse Gamer',
      precio: 85000,
      stock: 12,
      categoria: 'Periféricos'
    });
    assert.equal(texto, '[#101] Mouse Gamer - $85000 (Stock: 12 unid.) - Categoria: Periféricos');
  });

  await t.test('1.3 Desempaquetar tupla con rest', () => {
    const tupla = [4.5, 3.8, 5.0, 4.2];
    const { principal, secundario, resto } = desempaquetarTupla(tupla);
    assert.equal(principal, 4.5);
    assert.equal(secundario, 3.8);
    assert.deepEqual(resto, [5.0, 4.2]);
  });
});

test('🟢 RETO 2: Inmutabilidad y Spread Operator', async (t) => {
  await t.test('2.1 Agregar al carrito genera nueva referencia y no muta original', () => {
    const original = [{ id: 1, nombre: 'Teclado' }];
    const nuevo = { id: 2, nombre: 'Monitor' };
    const resultado = agregarAlCarritoInmutable(original, nuevo);

    assert.equal(resultado.length, 2);
    assert.notEqual(resultado, original, 'Debe ser una nueva referencia en memoria');
    assert.equal(original.length, 1, 'El arreglo original no debe ser mutado');
  });

  await t.test('2.2 Actualizar objeto inmutable preserva otras propiedades', () => {
    const estado = {
      id: 77,
      nombre: 'Ana',
      rol: 'Líder',
      configuracion: { tema: 'oscuro', notificaciones: true }
    };
    const nuevo = actualizarPerfilInmutable(estado, {
      rol: 'Coordinador',
      configuracion: { tema: 'claro' }
    });

    assert.equal(nuevo.rol, 'Coordinador');
    assert.equal(nuevo.nombre, 'Ana');
    assert.equal(nuevo.configuracion.tema, 'claro');
    assert.equal(nuevo.configuracion.notificaciones, true);
    assert.notEqual(nuevo, estado);
  });

  await t.test('2.3 Eliminar item inmutablemente', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const res = eliminarItemInmutable(items, 2);
    assert.deepEqual(res, [{ id: 1 }, { id: 3 }]);
    assert.equal(items.length, 3);
  });

  await t.test('2.4 Actualizar cantidad de un item específico en lista', () => {
    const items = [
      { id: 'a1', cantidad: 2 },
      { id: 'b2', cantidad: 5 }
    ];
    const res = actualizarCantidadItem(items, 'a1', 10);
    assert.equal(res[0].cantidad, 10);
    assert.equal(items[0].cantidad, 2);
  });
});

test('🟢 RETO 3: Métodos de Arreglo Puros (.map, .filter)', async (t) => {
  await t.test('3.1 Proyección a tarjetas de aprendices', () => {
    const aprendices = [
      { id: 'A1', nombre: 'Juan', apellido: 'Pérez', promedio: 4.2, estrato: 1 },
      { id: 'A2', nombre: 'Laura', apellido: 'Gómez', promedio: 3.1, estrato: 2 }
    ];
    const tarjetas = generarTarjetasAprendices(aprendices);
    assert.equal(tarjetas[0].titulo, 'PÉREZ, JUAN');
    assert.equal(tarjetas[0].badgeEstado, 'Aprobado');
    assert.equal(tarjetas[0].tieneSubsidio, true);

    assert.equal(tarjetas[1].badgeEstado, 'En Plan de Mejoramiento');
    assert.equal(tarjetas[1].tieneSubsidio, false);
  });

  await t.test('3.2 Filtro multi-criterio de catálogo', () => {
    const catalogo = [
      { id: 1, nombre: 'Laptop HP', categoria: 'Computo', stock: 5 },
      { id: 2, nombre: 'Laptop Lenovo', categoria: 'Computo', stock: 0 },
      { id: 3, nombre: 'Cable HDMI', categoria: 'Accesorios', stock: 15 }
    ];

    const filtrados = filtrarCatalogo(catalogo, {
      busqueda: 'laptop',
      categoria: 'Computo',
      soloDisponibles: true
    });

    assert.equal(filtrados.length, 1);
    assert.equal(filtrados[0].id, 1);
  });

  await t.test('3.3 Extracción de categorías únicas ordenadas', () => {
    const prods = [
      { categoria: 'Periféricos' },
      { categoria: 'Audio' },
      { categoria: 'Periféricos' },
      { categoria: 'Computo' }
    ];
    const cats = obtenerCategoriasUnicas(prods);
    assert.deepEqual(cats, ['Audio', 'Computo', 'Periféricos']);
  });
});

test('🟢 RETO 4: Dominio de .reduce()', async (t) => {
  await t.test('4.1 Balance de pedidos con IVA y descuentos', () => {
    const items = [
      { id: 1, precio: 100000, cantidad: 2, descuentoPorcentaje: 10 }, // bruto: 200.000, desc: 20.000
      { id: 2, precio: 50000, cantidad: 1, descuentoPorcentaje: 0 }     // bruto: 50.000, desc: 0
    ];
    // Subtotal bruto: 250.000
    // Descuentos: 20.000
    // Base gravable: 230.000
    // IVA 19%: 43.700
    // Neto: 273.700
    // Artículos: 3
    const balance = calcularBalancePedido(items, 0.19);
    assert.equal(balance.subtotalBruto, 250000);
    assert.equal(balance.totalDescuentos, 20000);
    assert.equal(balance.baseGravable, 230000);
    assert.equal(balance.ivaTotal, 43700);
    assert.equal(balance.netoPagar, 273700);
    assert.equal(balance.totalArticulos, 3);
  });

  await t.test('4.2 Agrupación de caja ingresos y egresos', () => {
    const movs = [
      { id: 1, tipo: 'ingreso', monto: 500000 },
      { id: 2, tipo: 'egreso', monto: 120000 },
      { id: 3, tipo: 'ingreso', monto: 300000 }
    ];
    const reporte = procesarMovimientosCaja(movs);
    assert.equal(reporte.totalIngresos, 800000);
    assert.equal(reporte.totalEgresos, 120000);
    assert.equal(reporte.saldoNeto, 680000);
    assert.equal(reporte.ingresos.length, 2);
    assert.equal(reporte.egresos.length, 1);
  });
});

test('🟢 RETO 5: Pipeline Asíncrono y Fallbacks', async (t) => {
  await t.test('5.1 Pipeline exitoso retorna datos limpios', async () => {
    const fetcher = () => simularLlamadaApi({ usuario: 'adso_dev' }, { latenciaMs: 10 });
    const res = await ejecutarPipelineSeguro(fetcher, null);
    assert.equal(res.exito, true);
    assert.equal(res.datos.usuario, 'adso_dev');
    assert.equal(res.error, null);
  });

  await t.test('5.2 Pipeline fallido activa fallback seguro sin lanzar error no controlado', async () => {
    const fetcherFalla = () => simularLlamadaApi(null, { latenciaMs: 10, forzarError: true });
    const fallback = { offline: true, cache: [] };
    const res = await ejecutarPipelineSeguro(fetcherFalla, fallback);
    assert.equal(res.exito, false);
    assert.deepEqual(res.datos, fallback);
    assert.match(res.error, /500: Error interno/);
  });

  await t.test('5.3 Sincronización concurrente de múltiples fuentes', async () => {
    const p1 = Promise.resolve('Datos Usuarios');
    const p2 = Promise.reject(new Error('Servidor inventario caído'));
    const p3 = Promise.resolve('Configuración Global');

    const res = await sincronizarMultiplesFuentes([p1, p2, p3]);
    assert.equal(res.exitosos.length, 2);
    assert.equal(res.fallidos.length, 1);
    assert.equal(res.tasaExito, 0.67);
  });
});
