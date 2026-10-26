# 🚀 Formación Especializada ADSO: JavaScript Moderno (ES6+) hacia React + Vite
## SENA · Regional Huila · Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH Garzón)
**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)  
**Ficha:** 3314621  
**Modalidad:** Presencial en Aula / Validación Automatizada en VS Code  

---

## 🎯 Objetivo Pedagógico
Dominar los patrones fundamentales de **JavaScript Moderno (ES6+)** que constituyen el 90% del código que escribirás en **React con Vite**:
1. **Desestructuración y Props:** Lectura limpia de propiedades complejas y valores por defecto.
2. **Inmutabilidad y Operador Spread (`...`):** Clonado de objetos y arreglos para el manejo del estado (`useState`).
3. **Métodos de Arreglo Puros (`.map`, `.filter`):** Proyección dinámica de datos a componentes visuales.
4. **Acumulación con `.reduce()`:** Modelado de estado avanzado y balances (base de `useReducer`).
5. **Asincronía y Pipelines (`async/await`):** Consumo seguro de APIs con manejo de errores y fallbacks.

---

## 🛠️ Requisitos Previos en tu Estación de Trabajo
- **Node.js** v18.0.0 o superior (Verificar con `node -v` en la terminal).
- **Visual Studio Code** instalado.
- Cuenta de **GitHub** activa.

---

## 🚀 Pasos de Instalación y Trabajo en Aula

### 1. Clonar o Descargar este Repositorio
Abre tu terminal en VS Code y ubícate en tu carpeta de formación:
```bash
git clone <URL_DE_TU_REPOSITORIO_O_PLANTILLA>
cd javascript-adso-3314621
```

### 2. Ejecutar las Pruebas en Vivo (Validador Automatizado)
No necesitas instalar paquetes externos pesados; el validador usa el motor nativo de Node.js:
```bash
npm test
```
O para ver el validador visual interactivo del SENA:
```bash
npm run validate
```
O para mantener el validador escuchando cambios en tiempo real mientras programas:
```bash
npm run test:watch
```

---

## 📂 Estructura del Taller
```text
├── retos/
│   ├── reto1-destructuring.js       # Props y desestructuración limpia
│   ├── reto2-spread-inmutabilidad.js # Inmutabilidad y useState
│   ├── reto3-arrays-react.js        # .map y .filter para JSX
│   ├── reto4-reduce-inventario.js   # Balances y useReducer
│   └── reto5-asincronia-pipeline.js # Async/Await y APIs
├── test/
│   ├── validador.test.js            # 20 pruebas automáticas
│   └── validador-cli.js             # Consola visual SENA
├── package.json
└── README.md
```

---

## 📌 Rúbrica y Protocolo de Entrega de Evidencia en GitHub

Para certificar tu evidencia en la Ficha 3314621:

1. **Crear tu propio repositorio personal en GitHub** con el nombre:
   `adso-3314621-javascript-reto-[tu-nombre-apellido]`
2. **Realizar commits atómicos semánticos** siguiendo el estándar:
   ```bash
   git add retos/reto1-destructuring.js
   git commit -m "feat(reto1): completar desestructuracion y props"
   
   git add retos/reto2-spread-inmutabilidad.js
   git commit -m "feat(reto2): implementar inmutabilidad con spread"
   
   git add retos/reto3-arrays-react.js
   git commit -m "feat(reto3): resolver proyecciones con map y filter"
   
   git add retos/reto4-reduce-inventario.js
   git commit -m "feat(reto4): calcular balance financiero con reduce"
   
   git add retos/reto5-asincronia-pipeline.js
   git commit -m "feat(reto5): pipeline asincrono con control de fallos"
   ```
3. **Subir los cambios**:
   ```bash
   git push -u origin main
   ```
4. **Sustentación en Caliente en el Aula:**
   El instructor pasará a tu puesto de trabajo y te solicitará modificar una función en caliente y explicar el flujo de ejecución en consola.
