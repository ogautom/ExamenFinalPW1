# Examen Final - Programación Web 1

Este es un proyecto completo para el examen final de la materia **Programación Web 1**, desarrollado con **React.js (frontend)** y **Node.js + Express (backend)**, usando **MySQL** como base de datos. Permite la gestión de cursos y estudiantes, con autenticación de usuarios y generación de reportes.

---

## Tecnologías Utilizadas

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **HTTP requests**: Axios
- **Autenticación**: bcrypt (contraseñas cifradas)

---

## Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/ogautom/ExamenFinal.git
cd ExamenFinal
```

### 2. Instalar y ejecutar el backend

```bash
cd backend
npm install
node server.js
```

Asegurarse de tener un archivo `.env` en la carpeta `/backend` con esta información:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TUCONTRASENA
DB_NAME=examenfinal
```

También necesitamos tener creada la base de datos `examenfinal` en MySQL. Se puede usar el siguiente script:

```sql
CREATE DATABASE IF NOT EXISTS examen_final;
USE examen_final;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

CREATE TABLE IF NOT EXISTS estudiantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  curso_id INT,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);
```

---

### 3. Instalar y ejecutar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

La aplicación se abrirá en: [http://localhost:5173](http://localhost:5173)

---

## Funcionalidades Principales

- Login y validación de usuarios con contraseñas cifradas.
- Módulo CRUD para cursos.
- Módulo CRUD para estudiantes.
- Relación entre estudiantes y cursos (un estudiante pertenece a un curso).
- Reporte de cantidad de estudiantes por curso.
- Protección de rutas para evitar acceso sin iniciar sesión.

---

## CRUDs implementados y relación entre datos

### Cursos
- Crear, editar, eliminar, listar cursos.

### Estudiantes
- Crear, editar, eliminar, listar estudiantes.
- Cada estudiante se vincula con un curso mediante `curso_id`.

---

## Reporte

La vista de **Reporte** muestra una tabla con la cantidad de estudiantes registrados por curso.

- Se accede a la ruta `/reporte` (solo si el usuario inició sesión).
- Agrupa automáticamente los estudiantes por curso.
- Muestra los datos ordenados de mayor a menor cantidad.

---

## Autor
- Nombre: Osmar Gauto
