const fs = require('fs');

function newID(products) {
    if (products[products.length-1]?.id && products[products.length-1].id !== '') {
        return products[products.length-1].id+1
    } else {
        return 1
    }
}

class Contenedor {
    constructor(file) {
        this.file = file
        this.data = fs.readFileSync(file)
        this.products = JSON.parse(this.data)
    }

    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    // Incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    save(object) {
        const newProduct = new Product (this.products, object)
        this.products.push(newProduct)
        const jsonProducts = JSON.stringify(this.products)
        fs.writeFileSync(this.file, jsonProducts, 'utf-8')
        return newProduct.id
    }
    
    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id) {
        const product = this.products.filter(product => product.id == id)
        return product != '' ? product : "Product doesn't found"
    }
    
    // Devuelve un array con los objetos presentes en el archivo.
    getAll() {
        return this.products
    }

    // Elimina del archivo el objeto con el id buscado.
    deleteById(id) {
        const idProduct = this.products.filter(product => product.id !== id)

        if (idProduct != '') {
            const jsonProducts = JSON.stringify(idProduct)
            fs.writeFileSync(this.file, jsonProducts, 'utf-8')     
        } else {
            return "error: deleteById(id)"
        }
    }

    // Elimina todos los objetos presentes en el archivo.
    deleteAll() {
        this.products = []
        const jsonProducts = JSON.stringify(this.products)
        fs.writeFileSync(this.file, jsonProducts, 'utf-8')     
    }
}

class Product {
    constructor(products, object) {
        this.id = newID(products)
        this.title = object.title
        this.price = object.price
        this.thumbnail = object.thumbnail
    }
}

const contenedorTest = new Contenedor('./productos.txt')
console.log('>>> INICIANDO MUESTRA DE MÓDULO <<<', '\n', '\n', ">>> Creación de nuevo contenedor <<<", '\n', " >> const contenedorTest = new Contenedor('./productos.txt')", '\n', '\n', '\n')

console.log(" >>> Llamados de prueba <<<", '\n', '\n', '\n', " >> Método 'save(Object)'")
const saveTest = contenedorTest.save({title: 'Escuadra copia',price: 103.55,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})
console.log("   > Llamado de función:  contenedorTest.save({title: 'Escuadra copia',price: 103.55,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'})")
console.log("   > Resultado (ID):  ", saveTest, '\n', '\n', '\n')

console.log("  >> Método 'getById(id)'")
console.log("   > Llamado de función:  contenedorTest.getByIdTest(4)")
console.log("   > Resultado (Object):  ", '\n', contenedorTest.getById(4), '\n', '\n', '\n')

console.log("  >> Método 'getAll()'")
console.log("   > Llamado de función:  contenedorTest.getAll()")
console.log("   > Resultado (Todos los objetos):  ", '\n', contenedorTest.getAll(), '\n', '\n', '\n')

contenedorTest.deleteById(2)
console.log("  >> Método 'deleteById()'")
console.log("   > Llamado de función:  contenedorTest.deleteById(2)")
console.log("   > Resultado (contenedorTest.getAll()):  ", '\n')
console.log(contenedorTest.getAll(), '\n', '\n', '\n')

console.log("  >> Método 'deleteAll()'")
console.log("   > Llamado de función:  contenedorTest.deleteAll()")
contenedorTest.deleteAll()
console.log("   > Resultado (contenedorTest.getAll()):  ", '\n', contenedorTest.getAll(), '\n')

