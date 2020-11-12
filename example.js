//a. Importar dependencias
const mongoose = require('mongoose');
const chalk = require('chalk');

//Importar modelos (en este ejemplo solo tenemos un modelo)
const Student = require('./models/Student.js');

//Definir constantes locales
const db = 'exampleApp';

//b. Conectar mongoose con el método connect(). El primer argumento es el enlace a la base de datos que tenemos guardada en mongo (en local) y el segundo argumento son una serie de instrucciones que tenemos que indicarle a mongoose para que funcione.

mongoose
	.connect(`mongodb://localhost/${db}`, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then((result) => {
		console.log(chalk.blue(`Connected to Mongo! Database used: ${result.connections[0].name}`));
	})
	.catch((error) => {
		console.log(chalk.red(`There has been an error: ${error}`));
	});

//c. Configurar CRUD actions

//1. CREATE --> Crear nuevo documento. Hay dos formas de hacerlo:

// 1.1. Creando una instancia del modelo, y aplicando .save() a este objto:

const firstStudent = new Student({
	name: 'Jaime',
	age: 19,
	registered: true,
	grades: [ 4, 4, 5, 5, 7, 7, 8, 8, 8 ]
});

firstStudent
	.save()
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});

// 1.2. Utilizando el Modelo.create()

Student.create({
	name: 'Jaime',
	age: 19,
	registered: true,
	grades: [ 4, 4, 5, 5, 7, 7, 8, 8, 8 ]
})
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});

//2. READ --> Leer los documentos de un Modelo. Mediante el filter, projection, sort, etc. Podemos ser más específicos con la búsqueda. Para ello tenemos diferentes métodos:

// 2.1. Modelo.find()  --> Nos va a dar todos los documentos.

// En este ejemplo, nos dará los nombres de todos los alumnos que se llamen Jaime, ordenador alfabeticamente

Student.find({ name: 'Jaime' }, { name: 1, _id: 0 }, { sort: { name: 1 } })
	.then((students) => {
		console.log(students);
	})
	.catch((error) => {
		console.log(error);
	});

// 2.2. Modelo.findOne() --> Te da solo el primer caso que encuentre

//En este ejemplo, te va a devolver solo el primer alumno que se llame Ana

Student.findOne({ name: 'Ana' })
	.then((student) => {
		console.log(student);
	})
	.catch((error) => {
		console.log(error);
	});

//2.3. Modelo.findById() --> Recibe el _id como argumento, y devuelve el documento que tenga asignado ese identificador

Student.findById('5fac055f621e4a1984680528')
	.then((student) => {
		console.log(student);
	})
	.catch((error) => {
		console.log(error);
	});

//3. UPDATE --> Actualizar uno o varios documentos. Para ello tenemos diferentes metodos

// 3.1. Modelo.updateMany() --> Me permite actualizar todos los documentos que cumplan le condición. Como primer argumento pasaremos el filtrado, y como segudno argumento los nuevos valores que quiero modificar

// En este ejemplo, estamos cambiando el apellido de todos los alumnos que se llaman 'Jaime' a 'Soria'
Student.updateMany({ name: 'Jaime' }, { lastName: 'Soria' })
	.then((students) => {
		console.log(students);
	})
	.catch((error) => {
		console.log(error);
	});

//3.2. Modelo.updateOne() --> Me permite actualizar el primer caso que cumpla la condición del primer argumento. El segundo argumento recibe los nuevos valores que quiero modificar

//En este ejemplo, voy a cambiar la edad del primer 'Pedro' que encuentre a 23
Student.updateOne({ name: 'Pedro' }, { age: 23 })
	.then((student) => {
		console.log(student);
	})
	.catch((error) => {
		console.log(error);
	});

//3.3. Modelo.findByIdAndUpdate() --> Funciona igual que el 3.2. pero el campo de búsqueda es el _id del documento.

//En este ejemplo, estamos buscando un elemento por su _id y le estamos cambiando el campo de 'alive' a 'false'
User.findByIdAndUpdate('5a3a7ecbc6ca8b9ce68bd41b', { alive: false })
	.then((student) => {
		console.log(student);
	})
	.catch((error) => {
		console.log(error);
	});

//4. DELETE --> Borra un docuemnto de la colección. Hay tres formas de hacerlo:

// 4.1. Modelo.deleteMany() --> Borra todos los casos que encuentre dentro de la condición que especificamos

//En este ejemplo, va a borrar a todos los alumnos que se llamen 'Arturo'
Student.deleteMany({ name: 'Arturo' })
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});

// 4.2. Modelo.deleteOne() --> Borra el primer caso que encuentre

//En este ejemplo, va a borrar al primer alumno que encuentre que se llame Andrea
Student.deleteOne({ name: 'Andrea' })
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});

//4.3. Modelo.findByIdAndRemove() --> Busca un documento por su _id, y lo elimina de la colección

//En este ejemplo, buscamos a un estudiante por su _id especīfico, y lo borramos
Student.findByIdAndRemove('5a3a7ecbc6ca8b9ce68bd41b')
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});
